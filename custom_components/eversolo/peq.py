"""Validated PEQ drafts and optimistic, serialized profile lifecycle operations."""
from copy import deepcopy
from hashlib import sha256
import json
import math

from homeassistant.exceptions import HomeAssistantError

from .api import EversoloApiClientError

BAND_LISTS = ("audioTunningEQList", "audioTunningEQListRight", "peqFirList", "peqFirListRight", "eqGeqGainBeans", "eqGeqGainBeansRight")
SCALARS = ("balance", "settingType", "enableEQ", "enableEQRight", "loudness", "enableGeq", "enableGeqRight", "enablePeqLeftFir", "enablePeqRightFir", "enableLeftFir", "enableRightFir")
BAND_FIELDS = ("fc", "gain", "q", "type", "volume", "bypass", "freq")
# Editor bounds, not a claim about every firmware's supported limits.
RANGES = {"fc": (20, 20000), "gain": (-15, 15), "q": (0.1, 100),
          "volume": (-300, 120), "balance": (-6, 6)}


def revision(profile):
    """Detect external writes without storing profile objects in HA state."""
    return sha256(json.dumps(profile, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def editable(profile):
    """Expose only supported editor fields; omit missing firmware capabilities."""
    result = {key: profile[key] for key in SCALARS if key in profile}
    for key in BAND_LISTS:
        if isinstance(profile.get(key), list):
            result[key] = [{field: band[field] for field in BAND_FIELDS if field in band}
                           for band in profile[key]]
    return deepcopy(result)


def merge_settings(profile, settings):
    """Validate changed values and preserve all unrelated and unknown JSON fields."""
    current = editable(profile)
    if set(settings) != set(current):
        raise HomeAssistantError("Profile capabilities changed; reload the profile")
    merged = deepcopy(profile)
    for key, value in settings.items():
        if key in BAND_LISTS:
            if not isinstance(value, list) or len(value) != len(current[key]):
                raise HomeAssistantError("PEQ band count cannot be changed")
            for index, band in enumerate(value):
                if not isinstance(band, dict) or set(band) != set(current[key][index]):
                    raise HomeAssistantError("Invalid PEQ band fields")
                for field, field_value in band.items():
                    if field_value != current[key][index][field]:
                        if field == "freq":
                            raise HomeAssistantError("Graphic EQ frequencies are fixed")
                        if field == "type" and key.startswith("peqFir") and field_value != 6:
                            raise HomeAssistantError("Correction filter type is unverified")
                        validate_value(field, field_value)
                        merged[key][index][field] = field_value
        elif value != current[key]:
            validate_value(key, value)
            merged[key] = value
    return merged


def validate_value(key, value):
    """Reject nonfinite, out of range, or unverified new filter codes."""
    if key == "bypass" or key.startswith("enable"):
        valid = isinstance(value, bool)
    elif key in ("type", "settingType", "loudness"):
        valid = type(value) is int and value in (tuple(range(2, 10)) if key == "type" else (0, 1))
    else:
        low, high = RANGES[key]
        valid = type(value) in (int, float) and math.isfinite(value) and low <= value <= high
        if key == "volume" and valid:
            valid = value == round(value)
    if not valid:
        raise HomeAssistantError(f"Unsupported value for {key}")


def profile_result(profile):
    """Return a small editor payload, separate from entity states."""
    return {"id": profile["id"], "name": profile["name"],
            "revision": revision(profile), "settings": editable(profile),
            "processing": {
                "firEnabled": {"left": bool(profile.get("enableLeftFir", False)),
                               "right": bool(profile.get("enableRightFir", False))},
                "hasFir": bool(profile.get("isHasFir", "enableLeftFir" in profile)),
                "hasLoudness": bool(profile.get("isHasLoudness", "loudness" in profile)),
            }}


async def async_profile_command(coordinator, operation, payload):
    """Run a profile command under the same lock as output assignments."""
    async with coordinator._lock:  # pylint: disable=protected-access
        client = coordinator.client
        try:
            return await _async_command(coordinator, client, operation, payload)
        except EversoloApiClientError as err:
            if operation == "files":
                raise HomeAssistantError("Could not browse device files. Try opening the folder again.") from err
            # Never replay a mutation: a transport timeout may follow a successful write.
            raise HomeAssistantError(
                "Device request failed or its outcome is uncertain. Reload to reconcile before retrying."
            ) from err


async def _async_command(coordinator, client, operation, payload):
    if operation == "files":
        return await client.async_get_fir_files(payload.get("url", "/"), payload.get("sort", 0), payload.get("start", 0))
    if operation == "snapshot":
        data = await coordinator._read(force_catalog=True)  # pylint: disable=protected-access
        coordinator.async_set_updated_data(data)
        return {"profiles": [{"id": key, "name": name} for key, name in data["profiles"].items()],
                "outputs": [{"id": key, **value} for key, value in data["outputs"].items()]}
    if operation == "create":
        name = _profile_name(payload)
        profile = await client.async_create_eq_profile(name)
        if profile["name"] != name:
            raise HomeAssistantError("Device did not confirm the created profile name; reload")
        return profile_result(profile)
    profile_id = payload.get("profile_id")
    if type(profile_id) is not int:
        raise HomeAssistantError("A numeric profile ID is required")
    profile = await client.async_get_eq_profile(profile_id)
    if operation == "read":
        return profile_result(profile)
    if operation == "curves":
        curves = {}
        for channel, name in enumerate(("left", "right")):
            try:
                curves[name] = await client.async_get_eq_fir_curve(profile_id, channel)
            except EversoloApiClientError:
                curves[name] = {"points": [], "loaded": False, "error": "FIR curve unavailable"}
        return {"profile_id": profile_id, "revision": revision(profile), **curves}
    if payload.get("revision") != revision(profile):
        raise HomeAssistantError("Profile changed on the device. Discard/reload before saving or deleting.")
    if operation == "import_fir":
        channel, path = payload.get("channel"), payload.get("path")
        if type(channel) is not int or channel not in (0, 1):
            raise HomeAssistantError("Invalid FIR channel")
        await client.async_import_eq_fir(profile_id, channel, path)
        return profile_result(await client.async_get_eq_profile(profile_id))
    if operation == "save_as":
        return await _async_save_as(client, profile, payload)
    if operation == "save":
        settings = payload.get("settings")
        if not isinstance(settings, dict):
            raise HomeAssistantError("PEQ settings are required")
        merged = merge_settings(profile, settings)
        await client.async_save_eq_profile(merged)
        after = await client.async_get_eq_profile(profile_id)
        if editable(after) != editable(merged):
            raise HomeAssistantError("Device readback differs from the requested settings; reload")
        return profile_result(after)
    if operation == "rename":
        name = _profile_name(payload)
        await client.async_rename_eq_profile(profile_id, name)
        after = await client.async_get_eq_profile(profile_id)
        if after["name"] != name:
            raise HomeAssistantError("Device did not confirm the new name; reload")
        return profile_result(after)
    if operation == "delete":
        if payload.get("expected_name") != profile["name"]:
            raise HomeAssistantError("Profile identity changed; reload before deleting")
        outputs = await client.async_get_eq_outputs()
        if any(output["eqId"] == profile_id for output in outputs.values()):
            raise HomeAssistantError("Assign a different profile to every output before deleting this profile")
        await client.async_delete_eq_profile(profile_id)
        if profile_id in await client.async_get_eq_profiles():
            raise HomeAssistantError("Device did not confirm deletion; reload")
        return {"deleted": profile_id}
    raise HomeAssistantError("Unknown profile operation")


def _profile_name(payload):
    name = payload.get("name")
    if not isinstance(name, str) or not name.strip() or len(name) > 100:
        raise HomeAssistantError("Use a profile name between 1 and 100 characters")
    return name



async def _async_save_as(client, profile, payload):
    """Copy a validated draft into a new device profile and verify it."""
    profile_id = profile["id"]
    name = _profile_name(payload)
    settings = payload.get("settings")
    if not isinstance(settings, dict):
        raise HomeAssistantError("Profile settings are required")
    merged = merge_settings(profile, settings)
    existing = await client.async_get_eq_profiles()
    created = await client.async_create_eq_profile(name)
    new_id = created["id"]
    if new_id == profile_id or new_id in existing:
        raise HomeAssistantError("Device did not return a new profile ID; reload")
    merged.update(id=new_id, name=name)
    try:
        await client.async_save_eq_profile(merged)
        after = await client.async_get_eq_profile(new_id)
    except EversoloApiClientError as err:
        raise HomeAssistantError(
            f"Profile #{new_id} was created, but copying was not confirmed. Reload before retrying."
        ) from err
    if any(after.get(key) != value for key, value in merged.items()):
        raise HomeAssistantError(f"Profile #{new_id} was created, but readback differs; reload")
    return profile_result(after)
