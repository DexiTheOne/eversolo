"""Verify PEQ websocket authorization, device routing, and panel lifecycle."""
import asyncio
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

import pytest
from homeassistant import components
from homeassistant.exceptions import Unauthorized

from custom_components.eversolo.panel import async_setup_panel, websocket_eq
from test_eq import make_coordinator


def test_editor_requires_an_administrator():
    """Reject ordinary users before reading or mutating a device."""
    for user in (None, SimpleNamespace(is_admin=False)):
        hass = SimpleNamespace(async_create_background_task=Mock())
        connection = SimpleNamespace(user=user)
        with pytest.raises(Unauthorized):
            websocket_eq(hass, connection, {"id": 1, "type": "eversolo/eq",
                                          "entry_id": "test", "operation": "snapshot"})
        hass.async_create_background_task.assert_not_called()


def test_websocket_routes_to_selected_device_and_validates_output_values():
    """Keep devices isolated and reject malformed mutations through the real handler."""
    async def scenario():
        hass, _, coordinator, client, output = make_coordinator()
        finished = asyncio.Event()
        connection = SimpleNamespace(user=SimpleNamespace(is_admin=True),
                                     send_result=Mock(side_effect=lambda *_: finished.set()),
                                     send_error=Mock(side_effect=lambda *_: finished.set()),
                                     async_handle_exception=Mock(side_effect=lambda *_: finished.set()))

        async def command(entry_id, operation, **payload):
            finished.clear()
            connection.send_result.reset_mock()
            connection.send_error.reset_mock()
            msg = websocket_eq._ws_schema({"id": 1, "type": "eversolo/eq",
                "entry_id": entry_id, "operation": operation, "payload": payload})
            websocket_eq(hass, connection, msg)
            await asyncio.wait_for(finished.wait(), timeout=2)
            connection.async_handle_exception.assert_not_called()

        await command("test", "snapshot")
        assert connection.send_result.call_args.args[1]["outputs"][0]["id"] == 1
        await command("other-device", "output", output_id=1, enabled=True)
        assert connection.send_error.call_args.args[1] == "not_found"
        client.async_set_eq_output.assert_not_awaited()
        await command("test", "output", output_id=1, enabled="true")
        assert connection.send_error.call_args.args[1] == "eq_error"
        client.async_set_eq_output.assert_not_awaited()
        await command("test", "output", output_id=1, enabled=True)
        assert output[1]["enable"] is True
        await coordinator.async_shutdown()
    asyncio.run(scenario())


def test_each_device_gets_a_panel_and_shared_assets_register_once():
    """Concurrent setup shares assets, and unloading removes just that device's route."""
    async def scenario():
        hass = SimpleNamespace(data={}, http=SimpleNamespace(async_register_static_paths=AsyncMock()))
        entry_a = SimpleNamespace(entry_id="AAA", title="Living room", async_on_unload=Mock())
        entry_b = SimpleNamespace(entry_id="BBB", title="Office", async_on_unload=Mock())
        frontend = SimpleNamespace(async_remove_panel=Mock())
        custom = SimpleNamespace(async_register_panel=AsyncMock())
        # Replace only the heavyweight frontend integration for local registration tests.
        # The production schema, command handler, and authorization decorators are real.
        with (patch.object(components, "frontend", frontend, create=True),
              patch.object(components, "panel_custom", custom, create=True),
              patch("custom_components.eversolo.panel.websocket_api.async_register_command") as register):
            await asyncio.gather(async_setup_panel(hass, entry_a), async_setup_panel(hass, entry_b))
            assert hass.http.async_register_static_paths.await_count == 1
            register.assert_called_once_with(hass, websocket_eq)
            calls = custom.async_register_panel.call_args_list
            assert {call.kwargs["frontend_url_path"] for call in calls} == {"eversolo-peq-aaa", "eversolo-peq-bbb"}
            assert all(call.kwargs["require_admin"] for call in calls)
            assert {call.kwargs["config"]["entry_id"] for call in calls} == {"AAA", "BBB"}
            entry_a.async_on_unload.call_args.args[0]()
            frontend.async_remove_panel.assert_called_once_with(hass, "eversolo-peq-aaa")
            await async_setup_panel(hass, entry_a)
            assert hass.http.async_register_static_paths.await_count == 1
    asyncio.run(scenario())


def test_device_configuration_link_opens_its_own_panel():
    """Keep the native device link aligned with its per-entry panel route."""
    from custom_components.eversolo.entity import EversoloEntity
    from custom_components.eversolo.const import panel_path

    coordinator = SimpleNamespace(
        config_entry=SimpleNamespace(entry_id="DeviceABC", title="DMP-A6", data={}))
    entity = EversoloEntity(coordinator)
    assert entity.device_info["configuration_url"] == "homeassistant://eversolo-peq-deviceabc"
    assert entity.device_info["identifiers"] == {("eversolo", "DeviceABC")}
    assert panel_path("DeviceABC") == "eversolo-peq-deviceabc"
