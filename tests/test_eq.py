"""Exercise EQ discovery, polling, and output commands without a live device."""
import asyncio
from copy import deepcopy
import json
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock

import pytest

from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from custom_components.eversolo.api import EversoloApiClient, EversoloApiClientError
from custom_components.eversolo.eq import EversoloEQCoordinator, async_discover_outputs, profile_labels
from custom_components.eversolo.select import EversoloEQSelect
from custom_components.eversolo.switch import EversoloEQSwitch


FIXTURES = Path(__file__).parent / "fixtures"


def fixture_payload(key):
    """Find a captured device response by its payload key."""
    for path in FIXTURES.glob("*.json"):
        data = json.loads(path.read_text())
        if key in data:
            return data
    raise AssertionError(f"Missing fixture {key}")


def make_coordinator():
    """Create real HA coordinator and a memory-only device double."""
    hass = HomeAssistant("/private/tmp/eversolo-eq-test")
    entry = SimpleNamespace(entry_id="test", title="Eversolo", data={},
                            async_on_unload=Mock(), pref_disable_polling=False)
    output = {1: {"name": "XLR/RCA", "sourceType": "XLRRCAOUT", "eqId": 1, "enable": False}}
    client = SimpleNamespace(
        async_get_eq_outputs=AsyncMock(side_effect=lambda: deepcopy(output)),
        async_get_eq_profiles=AsyncMock(return_value={1: "Couch ", 5: "Desk"}),
    )

    async def write(output_id, source_type, profile_id, enabled):
        assert source_type == output[output_id]["sourceType"]
        output[output_id].update(eqId=profile_id, enable=enabled)

    client.async_set_eq_output = AsyncMock(side_effect=write)
    main = SimpleNamespace(config_entry=entry, client=client)
    coordinator = EversoloEQCoordinator(hass, main)
    hass.data["eversolo"] = {"test": SimpleNamespace(eq_coordinator=coordinator)}
    return hass, entry, coordinator, client, output


def test_duplicate_names_and_generated_label_collision():
    """Keep repeated names and literal generated-looking names distinguishable."""
    labels = profile_labels({1: "Couch ", 5: "Couch", 6: "Couch (ID 1)"})
    assert len(set(labels.values())) == 3
    assert labels[5] == "Couch (ID 5)"
    assert profile_labels({1: "Couch "}) == {1: "Couch"}


def test_captured_api_and_configured_address():
    """Read the actual captures and use the configured device address for writes."""
    async def scenario():
        client = EversoloApiClient("192.0.2.10", 1234, None)
        client._api_wrapper = AsyncMock(return_value=fixture_payload("dspConfig"))
        assert await client.async_get_eq_profiles() == {1: "V5 Couch Calibration ", 5: "V1 Desk Calibration "}
        client._api_wrapper.return_value = fixture_payload("eqSourceList")
        outputs = await client.async_get_eq_outputs()
        assert len(outputs) == 4
        assert outputs[1]["eqId"] == 5
        client._api_wrapper.return_value = {"status": "200"}
        await client.async_set_eq_output(1, "XLRRCAOUT", 5, False)
        url = client._api_wrapper.call_args.kwargs["url"]
        assert url == "http://192.0.2.10:1234/ZidooMusicControl/v2/setDSPSource?id=1&sourceType=XLRRCAOUT&enable=0&eqId=5&isDSP=0"
        client._api_wrapper.return_value = {"status": 805}
        with pytest.raises(EversoloApiClientError):
            await client.async_get_eq_outputs()
    asyncio.run(scenario())


def test_pagination():
    """Retrieve every page and reject servers that repeat pages forever."""
    async def scenario():
        client = EversoloApiClient("device", 9529, None)
        page = [{"id": i, "name": f"Profile {i}"} for i in range(60)]
        client._api_wrapper = AsyncMock(side_effect=[
            {"status": 200, "dspConfig": page},
            {"status": 200, "dspConfig": [{"id": 60, "name": "Last"}]},
        ])
        assert len(await client.async_get_eq_profiles()) == 61
        assert "offset=60" in client._api_wrapper.call_args.kwargs["url"]
        client._api_wrapper = AsyncMock(return_value={"status": 200, "dspConfig": page})
        with pytest.raises(EversoloApiClientError, match="did not advance"):
            await client.async_get_eq_profiles()
    asyncio.run(scenario())


def test_output_commands_preserve_fresh_companion_state():
    """Select while bypassed; toggle without changing the assignment."""
    async def scenario():
        _, _, coordinator, client, output = make_coordinator()
        await coordinator.async_refresh()
        select = EversoloEQSelect(coordinator, 1)
        switch = EversoloEQSwitch(coordinator, 1)
        assert select.entity_category == switch.entity_category == EntityCategory.CONFIG
        await select.async_select_option("Desk")
        assert output[1]["eqId"] == 5 and output[1]["enable"] is False
        await switch.async_turn_on()
        assert output[1]["eqId"] == 5 and output[1]["enable"] is True
        # Simulate an external app changing the assignment between polls.
        output[1]["eqId"] = 1
        await switch.async_turn_off()
        assert output[1]["eqId"] == 1 and output[1]["enable"] is False
        client.async_set_eq_output.assert_awaited()
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_unchanged_polls_and_catalog_refresh():
    """No notifications or config writes occur on unchanged polls."""
    async def scenario():
        _, entry, coordinator, client, output = make_coordinator()
        notify = Mock()
        unsubscribe = coordinator.async_add_listener(notify)
        await coordinator.async_refresh()
        notify.reset_mock()
        await coordinator.async_refresh()
        assert notify.call_count == 0
        assert client.async_get_eq_profiles.await_count == 1
        coordinator._catalog_at -= 61
        await coordinator.async_refresh()
        assert client.async_get_eq_profiles.await_count == 2
        assert notify.call_count == 0
        output[1]["eqId"] = 9
        await coordinator.async_refresh()
        assert client.async_get_eq_profiles.await_count == 3
        await coordinator.async_refresh()
        assert client.async_get_eq_profiles.await_count == 3
        # Config entry data was never changed to store poll state.
        assert entry.data == {}
        unsubscribe()
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_unrelated_changes_do_not_publish_switch_state():
    """The switch ignores catalog/assignment changes that leave enable unchanged."""
    async def scenario():
        _, _, coordinator, _, _ = make_coordinator()
        await coordinator.async_refresh()
        entity = EversoloEQSwitch(coordinator, 1)
        entity.async_write_ha_state = Mock()
        entity._handle_coordinator_update()
        entity.async_write_ha_state.reset_mock()
        coordinator.data["profiles"][5] = "Renamed"
        coordinator.data["outputs"][1]["eqId"] = 5
        entity._handle_coordinator_update()
        entity.async_write_ha_state.assert_not_called()
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_offline_discovery_and_failed_write_verification():
    """Discover after startup failure and do not claim an unconfirmed write succeeded."""
    async def scenario():
        hass, entry, coordinator, client, _ = make_coordinator()
        client.async_get_eq_outputs.side_effect = EversoloApiClientError("offline")
        await coordinator.async_refresh()
        added = []
        async_discover_outputs(hass, entry, lambda entities: added.extend(entities), EversoloEQSwitch)
        assert not added
        client.async_get_eq_outputs.side_effect = None
        client.async_get_eq_outputs.return_value = {1: {"name": "Analog", "sourceType": "XLRRCAOUT", "eqId": 1, "enable": False}}
        await coordinator.async_refresh()
        assert len(added) == 1
        client.async_set_eq_output.side_effect = None
        with pytest.raises(HomeAssistantError, match="did not confirm"):
            await coordinator.async_set_output(1, enabled=True)
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_serialized_writes_preserve_both_changes():
    """Concurrent select and toggle calls cannot overwrite each other's fields."""
    async def scenario():
        _, _, coordinator, _, output = make_coordinator()
        await coordinator.async_refresh()
        await asyncio.gather(
            coordinator.async_set_output(1, profile_id=5),
            coordinator.async_set_output(1, enabled=True),
        )
        assert output[1]["eqId"] == 5
        assert output[1]["enable"] is True
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_missing_profile_and_ambiguous_write_are_not_retried():
    """Reject deleted IDs and leave ambiguous command outcomes for reconciliation."""
    async def scenario():
        _, _, coordinator, client, _ = make_coordinator()
        await coordinator.async_refresh()
        with pytest.raises(HomeAssistantError, match="no longer exists"):
            await coordinator.async_set_output(1, profile_id=99)
        client.async_set_eq_output.assert_not_awaited()
        client.async_set_eq_output.side_effect = EversoloApiClientError("timeout")
        with pytest.raises(HomeAssistantError, match="timeout"):
            await coordinator.async_set_output(1, enabled=True)
        assert client.async_set_eq_output.await_count == 1
        assert not coordinator.last_update_success
        await coordinator.async_shutdown()
    asyncio.run(scenario())
