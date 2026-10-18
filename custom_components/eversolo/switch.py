"""Per-output EQ enable switches."""
from homeassistant.components.switch import SwitchEntity

from .eq import EversoloEQEntity, async_discover_outputs


async def async_setup_entry(hass, entry, async_add_entities):
    """Create one enable switch per discovered EQ output."""
    async_discover_outputs(hass, entry, async_add_entities, EversoloEQSwitch)


class EversoloEQSwitch(EversoloEQEntity, SwitchEntity):
    """Enable or bypass output EQ without changing its assigned profile."""

    _attr_icon = "mdi:equalizer"

    def __init__(self, coordinator, output_id):
        """Initialize the output switch."""
        super().__init__(coordinator, output_id, "enabled")

    @property
    def is_on(self):
        """Return the output enable flag, distinct from profile enableEQ."""
        return self.output.get("enable")

    def _state_snapshot(self):
        """Ignore unrelated output and catalog changes."""
        return (self.available, self.is_on)

    async def async_turn_on(self, **kwargs):
        """Enable the currently assigned profile."""
        await self.coordinator.async_set_output(self.output_id, enabled=True)

    async def async_turn_off(self, **kwargs):
        """Bypass EQ while preserving its assigned profile."""
        await self.coordinator.async_set_output(self.output_id, enabled=False)
