"""In-memory polling and serialized output EQ control."""
from __future__ import annotations

import asyncio
from collections import Counter
from datetime import timedelta
from time import monotonic

from homeassistant.exceptions import HomeAssistantError
from homeassistant.const import EntityCategory
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import EversoloApiClientError
from .const import DOMAIN, LOGGER
from .entity import EversoloEntity


def profile_labels(profiles):
    """Build unambiguous presentation labels without changing device names."""
    names = {key: value.strip() or "Unnamed profile" for key, value in profiles.items()}
    counts = Counter(names.values())
    labels = {key: f"{name} (ID {key})" if counts[name] > 1 else name
              for key, name in names.items()}
    # A literal profile name can itself match a generated duplicate label.
    while len(set(labels.values())) != len(labels):
        duplicates = Counter(labels.values())
        labels = {key: f"{label} (ID {key})" if duplicates[label] > 1 else label
                  for key, label in labels.items()}
    return labels


class EversoloEQCoordinator(DataUpdateCoordinator):
    """Share EQ reads without persisting catalogs or poll timestamps."""

    def __init__(self, hass, main):
        """Initialize independent EQ polling."""
        super().__init__(hass, LOGGER, config_entry=main.config_entry, name="Eversolo EQ",
                         update_interval=timedelta(seconds=5), always_update=False)
        self.config_entry = main.config_entry
        self.client = main.client
        self.data = {"profiles": {}, "outputs": {}}
        self._catalog_at = None
        self._lock = asyncio.Lock()
        self._unknown_ids = set()

    async def _read(self, force_catalog=False):
        outputs = await self.client.async_get_eq_outputs()
        profiles = self.data["profiles"]
        unknown_ids = {item["eqId"] for item in outputs.values()} - profiles.keys()
        if (force_catalog or not self.last_update_success or self._catalog_at is None
                or monotonic() - self._catalog_at >= 60
                or bool(unknown_ids - self._unknown_ids)):
            profiles = await self.client.async_get_eq_profiles()
            self._catalog_at = monotonic()
        self._unknown_ids = {item["eqId"] for item in outputs.values()} - profiles.keys()
        return {"profiles": profiles, "outputs": outputs}

    async def _async_update_data(self):
        """Return only meaningful state; identical polls do not notify listeners."""
        try:
            async with self._lock:
                return await self._read()
        except EversoloApiClientError as err:
            raise UpdateFailed(str(err)) from err

    async def async_set_output(self, output_id, *, profile_id=None, enabled=None):
        """Preserve fresh companion state and verify the resulting assignment."""
        async with self._lock:
            try:
                before = await self._read(force_catalog=profile_id is not None)
                output = before["outputs"].get(output_id)
                if output is None:
                    raise HomeAssistantError("EQ output is no longer available")
                if profile_id is not None and profile_id not in before["profiles"]:
                    raise HomeAssistantError("EQ profile no longer exists; refresh the selection")
                target_profile = output["eqId"] if profile_id is None else profile_id
                target_enable = output["enable"] if enabled is None else enabled
                await self.client.async_set_eq_output(
                    output_id, output["sourceType"], target_profile, target_enable)
                after = await self._read()
                self.async_set_updated_data(after)
                result = after["outputs"].get(output_id)
                if (result is None or result["eqId"] != target_profile
                        or result["enable"] != target_enable):
                    raise HomeAssistantError("Device did not confirm the requested EQ state")
            except EversoloApiClientError as err:
                self.async_set_update_error(UpdateFailed(str(err)))
                raise HomeAssistantError(f"Could not update output EQ: {err}") from err


class EversoloEQEntity(EversoloEntity):
    """Common output identity and change-only entity publication."""

    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, coordinator, output_id, suffix):
        """Associate this entity with a discovered output."""
        super().__init__(coordinator)
        self.output_id = output_id
        self._attr_unique_id = f"{coordinator.config_entry.entry_id}_eq_{output_id}_{suffix}"
        self._attr_name = f"{self.output['name']} EQ {suffix.title()}"
        self._published = None

    @property
    def output(self):
        """Return the latest output assignment."""
        return self.coordinator.data["outputs"].get(self.output_id, {})

    @property
    def available(self):
        """Do not expose stale assignments as available controls."""
        return super().available and bool(self.output)

    def _handle_coordinator_update(self):
        """Avoid writes even when a different output or catalog changed."""
        snapshot = self._state_snapshot()
        if snapshot != self._published:
            self._published = snapshot
            self.async_write_ha_state()


def async_discover_outputs(hass, entry, async_add_entities, entity_class):
    """Discover outputs at startup and after offline recovery."""
    coordinator = hass.data[DOMAIN][entry.entry_id].eq_coordinator
    known = set()

    def discover():
        new = set(coordinator.data["outputs"]) - known
        known.update(new)
        async_add_entities(entity_class(coordinator, key) for key in sorted(new))

    entry.async_on_unload(coordinator.async_add_listener(discover))
    discover()
