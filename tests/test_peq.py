"""Verify PEQ lifecycle, optimistic concurrency, preservation, and validation."""
import asyncio
from copy import deepcopy
import json
from pathlib import Path
from unittest.mock import AsyncMock
from urllib.parse import parse_qs, urlsplit

import pytest
from homeassistant.exceptions import HomeAssistantError

from custom_components.eversolo.api import EversoloApiClient, EversoloApiClientError
from custom_components.eversolo.peq import async_profile_command, editable, merge_settings, revision
from test_eq import make_coordinator


def make_editor():
    """Add a mutable full-profile device double to the existing coordinator."""
    _, _, coordinator, client, outputs = make_coordinator()
    baseline = json.loads((Path(__file__).parent / "fixtures/peq-profile.json").read_text())
    baseline.update(id=5, name="Desk", unknown={"firmware": [1, 2, 3]})
    profiles = {5: baseline}

    async def read(key):
        return deepcopy(profiles[key])

    async def create(name):
        profiles[9] = {**deepcopy(baseline), "id": 9, "name": name}
        return deepcopy(profiles[9])

    async def save(value):
        profiles[value["id"]] = deepcopy(value)

    async def rename(key, name):
        profiles[key]["name"] = name

    async def delete(key):
        del profiles[key]

    client.async_get_eq_profile = AsyncMock(side_effect=read)
    client.async_get_eq_profiles = AsyncMock(side_effect=lambda: {key: item["name"] for key, item in profiles.items()})
    client.async_create_eq_profile = AsyncMock(side_effect=create)
    client.async_save_eq_profile = AsyncMock(side_effect=save)
    client.async_rename_eq_profile = AsyncMock(side_effect=rename)
    client.async_delete_eq_profile = AsyncMock(side_effect=delete)
    return coordinator, client, profiles, outputs


def test_full_lifecycle_and_preserving_unrelated_dsp():
    """Create, read, save both banks, rename, delete, and leave the original intact."""
    async def scenario():
        coordinator, client, profiles, outputs = make_editor()
        original = deepcopy(profiles[5])
        created = await async_profile_command(coordinator, "create", {"name": "New & custom"})
        assert created["id"] == 9
        settings = deepcopy(created["settings"])
        settings["balance"] = -2
        for key in ("audioTunningEQList", "audioTunningEQListRight"):
            for band in settings[key]:
                band["volume"] = -60
            settings[key][0].update(fc=100, gain=3, q=1.2, type=6)
        saved = await async_profile_command(coordinator, "save", {
            "profile_id": 9, "revision": created["revision"], "settings": settings})
        assert saved["settings"] == settings
        assert profiles[9]["unknown"] == original["unknown"]
        assert profiles[9]["peqFirList"] == original["peqFirList"]
        assert profiles[5] == original
        assert outputs[1]["eqId"] == 1
        renamed = await async_profile_command(coordinator, "rename", {
            "profile_id": 9, "revision": saved["revision"], "name": "Renamed"})
        assert renamed["name"] == "Renamed"
        assert renamed["settings"] == settings
        await async_profile_command(coordinator, "delete", {
            "profile_id": 9, "revision": renamed["revision"], "expected_name": "Renamed"})
        assert set(profiles) == {5}
        client.async_set_eq_output.assert_not_awaited()
    asyncio.run(scenario())


def test_external_edit_conflict_and_concurrent_editors():
    """Two editors cannot silently overwrite one another or app edits."""
    async def scenario():
        coordinator, client, profiles, _ = make_editor()
        token = revision(profiles[5])
        draft = editable(profiles[5])
        draft["balance"] = -2
        results = await asyncio.gather(*[
            async_profile_command(coordinator, "save", {"profile_id": 5, "revision": token, "settings": draft})
            for _ in range(2)], return_exceptions=True)
        assert sum(isinstance(item, HomeAssistantError) for item in results) == 1
        assert client.async_save_eq_profile.await_count == 1
        profiles[5]["unknown"]["firmware"].append(4)
        with pytest.raises(HomeAssistantError, match="changed"):
            await async_profile_command(coordinator, "delete", {
                "profile_id": 5, "revision": results[0]["revision"], "expected_name": "Desk"})
        client.async_delete_eq_profile.assert_not_awaited()
    asyncio.run(scenario())


def test_identity_assignment_and_duplicate_names():
    """Deletion checks exact identity and all assignments, even bypassed outputs."""
    async def scenario():
        coordinator, client, profiles, outputs = make_editor()
        payload = {"profile_id": 5, "revision": revision(profiles[5]), "expected_name": "Other"}
        with pytest.raises(HomeAssistantError, match="identity"):
            await async_profile_command(coordinator, "delete", payload)
        outputs[1]["eqId"] = 5
        payload["expected_name"] = "Desk"
        with pytest.raises(HomeAssistantError, match="every output"):
            await async_profile_command(coordinator, "delete", payload)
        client.async_delete_eq_profile.assert_not_awaited()
        created = await async_profile_command(coordinator, "create", {"name": "Desk"})
        assert created["id"] != 5
        assert created["name"] == "Desk"
    asyncio.run(scenario())


@pytest.mark.parametrize(("field", "value"), [("fc", float("nan")), ("gain", float("inf")),
    ("q", 0), ("type", 10), ("volume", -60.5), ("bypass", "false"), ("fc", 25000)])
def test_invalid_band_changes_are_rejected(field, value):
    """Do not write nonfinite, malformed, or unverified band values."""
    profile = json.loads((Path(__file__).parent / "fixtures/peq-profile.json").read_text())
    settings = editable(profile)
    settings["audioTunningEQList"][0][field] = value
    with pytest.raises(HomeAssistantError):
        merge_settings(profile, settings)


def test_unknown_existing_types_and_values_survive_other_edits():
    """Preserve unmapped filters and firmware values outside editor bounds."""
    profile = json.loads((Path(__file__).parent / "fixtures/peq-profile.json").read_text())
    profile["audioTunningEQList"][0].update(type=42, q=100)
    settings = editable(profile)
    settings["balance"] = -3
    merged = merge_settings(profile, settings)
    assert merged["audioTunningEQList"][0]["type"] == 42
    assert merged["audioTunningEQList"][0]["q"] == 100
    settings["audioTunningEQList"][0]["unexpected"] = 1
    with pytest.raises(HomeAssistantError, match="fields"):
        merge_settings(profile, settings)


def test_save_readback_mismatch_and_uncertain_mutation_are_not_retried():
    """An ACK alone is insufficient; ambiguous writes are never replayed."""
    async def scenario():
        coordinator, client, profiles, _ = make_editor()
        settings = editable(profiles[5])
        settings["balance"] = -2
        payload = {"profile_id": 5, "revision": revision(profiles[5]), "settings": settings}
        client.async_save_eq_profile.side_effect = None
        with pytest.raises(HomeAssistantError, match="readback"):
            await async_profile_command(coordinator, "save", payload)
        client.async_create_eq_profile.side_effect = EversoloApiClientError("timeout")
        with pytest.raises(HomeAssistantError, match="uncertain"):
            await async_profile_command(coordinator, "create", {"name": "Unique"})
        assert client.async_create_eq_profile.await_count == 1
    asyncio.run(scenario())


def test_api_uses_assigned_id_and_encodes_full_json_exactly_once():
    """Ampersands, percent signs, Unicode, and nested arrays round-trip in a GET."""
    async def scenario():
        client = EversoloApiClient("device", 9529, None)
        profile = {"id": 19, "name": "A & B % + café", "nested": [{"unknown": True}]}
        client._async_eq_request = AsyncMock(side_effect=[{"dspConfig": {"id": 19}}, {"dspConfig": profile}])
        assert await client.async_create_eq_profile(profile["name"]) == profile
        assert client._async_eq_request.call_args.kwargs == {"id": 19}
        del client._async_eq_request
        client._api_wrapper = AsyncMock(return_value={"status": "200"})
        await client.async_save_eq_profile(profile)
        query = parse_qs(urlsplit(client._api_wrapper.call_args.kwargs["url"]).query)
        assert json.loads(query["dspConfig"][0]) == profile
    asyncio.run(scenario())


def test_save_as_copies_full_profile_and_draft_without_changing_source_or_outputs():
    """Save as copies full profile and draft without changing source or outputs."""
    async def scenario():
        coordinator, client, profiles, outputs = make_editor()
        source = deepcopy(profiles[5])
        assignments = deepcopy(outputs)
        settings = editable(source)
        settings['balance'] = 3
        result = await async_profile_command(coordinator,'save_as',{
            "profile_id": 5,"revision": revision(source),"name": source['name'],"settings": settings})
        assert result['id'] == 9 and result['name'] == source['name']
        assert profiles[5] == source
        assert profiles[9] == {**source,'id':9,'balance':3}
        assert outputs == assignments
        client.async_set_eq_output.assert_not_awaited()
    asyncio.run(scenario())


def test_save_as_validates_before_creation_and_reports_partial_failure_without_retry():
    """Save as validates before creation and reports partial failure without retry."""
    async def scenario():
        coordinator, client, profiles, _ = make_editor()
        payload = {"profile_id": 5,"revision": 'stale',"name": 'Desk',"settings": editable(profiles[5])}
        with pytest.raises(HomeAssistantError,match='changed'):
            await async_profile_command(coordinator,'save_as',payload)
        client.async_create_eq_profile.assert_not_awaited()
        payload['revision'] = revision(profiles[5])
        client.async_save_eq_profile.side_effect = EversoloApiClientError('timeout')
        with pytest.raises(HomeAssistantError,match='#9 was created'):
            await async_profile_command(coordinator,'save_as',payload)
        assert client.async_create_eq_profile.await_count == 1
        assert client.async_save_eq_profile.await_count == 1
        assert set(profiles) == {5,9}
    asyncio.run(scenario())
