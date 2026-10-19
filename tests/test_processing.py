"""Verify loudness edits and read-only FIR response retrieval."""
import asyncio
from copy import deepcopy
import json
from pathlib import Path
from unittest.mock import AsyncMock
from urllib.parse import parse_qs, urlsplit

import pytest
from homeassistant.exceptions import HomeAssistantError

from custom_components.eversolo.api import EversoloApiClient, EversoloApiClientError
from custom_components.eversolo.peq import async_profile_command, editable, merge_settings, profile_result, revision
from test_peq import make_editor

FIXTURES = Path(__file__).parent / "fixtures"


def test_loudness_uses_observed_integer_fields_without_enabling_other_dsp():
    """Round-trip both banks while preserving the unrelated enableLoudness flags."""
    async def scenario():
        coordinator, _, profiles, _ = make_editor()
        before = deepcopy(profiles[5])
        settings = editable(before)
        settings.update(loudness=1)
        result = await async_profile_command(coordinator, "save", {
            "profile_id": 5, "revision": revision(before), "settings": settings})
        assert result["settings"]["loudness"] == 1
        assert profiles[5]["loudnessRight"] == before["loudnessRight"]
        assert profiles[5]["enableLoudness"] == before["enableLoudness"]
        assert profiles[5]["enableLoudnessRight"] == before["enableLoudnessRight"]
        assert profiles[5]["enableLeftFir"] == before["enableLeftFir"]
        assert profiles[5]["peqFirList"] == before["peqFirList"]
    asyncio.run(scenario())


@pytest.mark.parametrize("value", [2, -1, True, 0.5, "1"])
def test_loudness_rejects_unobserved_modes(value):
    """Only the captured off/on integer values may be newly written."""
    profile = json.loads((FIXTURES / "peq-profile.json").read_text())
    settings = editable(profile)
    settings["loudness"] = value
    with pytest.raises(HomeAssistantError):
        merge_settings(profile, settings)


def test_fir_metadata_is_not_an_editable_field():
    """Allow independent channel enables while preserving the unrelated global flag."""
    profile = json.loads((FIXTURES / "peq-profile.json").read_text())
    profile.update(enableFir=False, enableLeftFir=True, enableRightFir=False)
    result = profile_result(profile)
    assert result["processing"]["firEnabled"] == {"left": True, "right": False}
    assert result["settings"]["enableLeftFir"] is True
    settings = editable(profile)
    settings["enableLeftFir"] = False
    merged = merge_settings(profile, settings)
    assert merged["enableLeftFir"] is False
    assert merged["enableFir"] is False


def test_fir_curve_request_uses_profile_and_channel_and_preserves_device_points():
    """Read captured left/right points without touching the file system or DSP config."""
    async def scenario():
        client = EversoloApiClient("player", 9529, None)
        fixture = json.loads((FIXTURES / "fir-curves.json").read_text())
        for channel, name in enumerate(("left", "right")):
            client._api_wrapper = AsyncMock(return_value=fixture[name])
            result = await client.async_get_eq_fir_curve(5, channel)
            assert result["loaded"] and len(result["points"]) == 211
            assert result["points"] == fixture[name]["fir"]
            assert result["coordinate"] == "log10_hz"
            query = parse_qs(urlsplit(client._api_wrapper.call_args.kwargs["url"]).query)
            assert query == {"id": ["5"], "type": [str(channel)]}
        client._api_wrapper.return_value = {"status": 200, "type": 0, "fir": [{"x": 0, "y": 0}, {"x": 5, "y": 0}]}
        assert not (await client.async_get_eq_fir_curve(5, 0))["loaded"]
        client._api_wrapper.return_value = {"status": 200, "type": 0, "fir": [{"x": 1.5, "y": float("nan")}]}
        with pytest.raises(EversoloApiClientError, match="Invalid FIR"):
            await client.async_get_eq_fir_curve(5, 0)
        client._api_wrapper.return_value = {"status": 200, "type": 1, "fir": []}
        with pytest.raises(EversoloApiClientError, match="Invalid FIR"):
            await client.async_get_eq_fir_curve(5, 0)
    asyncio.run(scenario())


def test_curve_failure_is_isolated_per_channel_and_never_writes():
    """An unsupported or offline FIR endpoint does not prevent profile editing."""
    async def scenario():
        coordinator, client, profiles, _ = make_editor()
        curve = {"loaded": True, "points": [{"x": 1.3, "y": -1}, {"x": 4.3, "y": 1}], "coordinate": "log10_hz"}
        client.async_get_eq_fir_curve = AsyncMock(side_effect=[EversoloApiClientError("unsupported"), curve])
        before = deepcopy(profiles)
        result = await async_profile_command(coordinator, "curves", {"profile_id": 5})
        assert result["profile_id"] == 5 and result["revision"] == revision(profiles[5])
        assert result["left"]["error"] == "FIR curve unavailable"
        assert result["right"] == curve
        assert profiles == before
        client.async_save_eq_profile.assert_not_awaited()
        client.async_set_eq_output.assert_not_awaited()
    asyncio.run(scenario())
