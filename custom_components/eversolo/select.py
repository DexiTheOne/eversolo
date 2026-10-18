"""Select platform for eversolo."""
from __future__ import annotations

from collections.abc import Callable, Coroutine
from dataclasses import dataclass
from typing import Any, Generic, TypeVar

from homeassistant.components.select import SelectEntity, SelectEntityDescription
from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN, LOGGER
from .coordinator import EversoloDataUpdateCoordinator
from .entity import EversoloEntity
from .eq import EversoloEQEntity, async_discover_outputs, profile_labels

_EversoloDataUpdateCoordinatorT = TypeVar(
    "_EversoloDataUpdateCoordinatorT", bound=EversoloDataUpdateCoordinator
)


@dataclass
class EversoloSelectDescriptionMixin(Generic[_EversoloDataUpdateCoordinatorT]):
    """Mixin to describe a Select entity."""

    get_selected_option: Callable[[_EversoloDataUpdateCoordinatorT], int]
    get_available_options: Callable[[
        _EversoloDataUpdateCoordinatorT], list[dict]]
    select_option: Callable[
        [_EversoloDataUpdateCoordinatorT, int, str], Coroutine[Any, Any, None]
    ]


@dataclass
class EversoloSelectDescription(
    SelectEntityDescription,
    EversoloSelectDescriptionMixin[_EversoloDataUpdateCoordinatorT],
):
    """Class to describe a Select entity."""


ENTITY_DESCRIPTIONS = [
    EversoloSelectDescription[EversoloDataUpdateCoordinator](
        key="vu_style",
        name="VU Style",
        icon="mdi:gauge-low",
        get_selected_option=lambda coordinator: coordinator.data.get(
            "vu_mode_state", {}
        ).get("currentIndex", -1),
        get_available_options=lambda coordinator: coordinator.data.get(
            "vu_mode_state", {}
        ).get("data", None),
        select_option=lambda coordinator, index, tag: coordinator.client.async_select_vu_mode_option(
            index, tag
        ),
    ),
    EversoloSelectDescription[EversoloDataUpdateCoordinator](
        key="spectrum_style",
        name="Spectrum Style",
        icon="mdi:chart-histogram",
        get_selected_option=lambda coordinator: coordinator.data.get(
            "spectrum_mode_state", {}
        ).get("currentIndex", -1),
        get_available_options=lambda coordinator: coordinator.data.get(
            "spectrum_mode_state", {}
        ).get("data", None),
        select_option=lambda coordinator, index, tag: coordinator.client.async_select_spectrum_mode_option(
            index, tag
        ),
    ),
    EversoloSelectDescription[EversoloDataUpdateCoordinator](
        key="output_mode",
        name="Output Mode",
        icon="mdi:export",
        get_selected_option=lambda coordinator: coordinator.data.get(
            "input_output_state", {}
        ).get("outputIndex", -1),
        get_available_options=lambda coordinator: coordinator.data.get(
            "input_output_state", {}
        ).get("transformed_outputs", None),
        select_option=lambda coordinator, index, tag: coordinator.client.async_set_output(
            index, tag
        ),
    ),
]

KNOB_COLOR_DESCRIPTION = EversoloSelectDescription[EversoloDataUpdateCoordinator](
    key="knob_color",
    name="Knob Color",
    icon="mdi:palette",
    get_selected_option=lambda coordinator: coordinator.data.get(
        "knob_color_state", {}
    ).get("currentIndex", -1),
    get_available_options=lambda coordinator: coordinator.data.get(
        "knob_color_state", {}
    ).get("data", None),
    select_option=lambda coordinator, index, tag: coordinator.client.async_select_knob_color_option(
        index, tag
    ),
)


async def async_setup_entry(hass, entry, async_add_devices):
    """Set up the Select platform."""
    coordinator = hass.data[DOMAIN][entry.entry_id]

    async_discover_outputs(hass, entry, async_add_devices, EversoloEQSelect)

    descriptions = list(ENTITY_DESCRIPTIONS)
    if "knob_color_state" in coordinator.data:
        descriptions.append(KNOB_COLOR_DESCRIPTION)

    async_add_devices(
        EversoloSelect(
            coordinator=coordinator,
            entity_description=entity_description,
        )
        for entity_description in descriptions
    )


class EversoloSelect(EversoloEntity, SelectEntity):
    """Select to control Eversolo Selects."""

    def __init__(
        self,
        coordinator: EversoloDataUpdateCoordinator,
        entity_description: SelectEntityDescription,
    ) -> None:
        """Initialize the Select class."""
        super().__init__(coordinator)
        self.entity_description = entity_description
        self._attr_unique_id = (
            f"{coordinator.config_entry.entry_id}_{entity_description.key}"
        )

    @property
    def options(self) -> list[str]:
        """Return the list of available options."""
        options = self.entity_description.get_available_options(
            self.coordinator)

        if options is None:
            LOGGER.debug("No options found")
            return []

        return [options[i].get("title", "") for i in range(len(options))]

    @property
    def current_option(self) -> str:
        """Return current state."""
        current_index = self.entity_description.get_selected_option(
            self.coordinator)

        if current_index < 0 or current_index >= len(self.options):
            LOGGER.debug("Current index %s is out of range", current_index)
            return None

        return list(self.options)[current_index]

    async def async_select_option(self, option: str) -> None:
        """Change to selected option."""

        options = self.entity_description.get_available_options(
            self.coordinator)

        if options is None:
            LOGGER.error("No options found")
            return

        index, tag = None, None
        for i, value in enumerate(options):
            if option == value.get("title", None):
                index, tag = i, value.get("tag", "")
                break

        if index is None or tag is None:
            LOGGER.debug("Option %s not found", option)
            return

        await self.entity_description.select_option(self.coordinator, index, tag)
        self._attr_current_option = option


class EversoloEQSelect(EversoloEQEntity, SelectEntity):
    """Select a stored EQ profile for one output without changing bypass."""

    _attr_icon = "mdi:equalizer"

    def __init__(self, coordinator, output_id):
        """Initialize the output profile selector."""
        super().__init__(coordinator, output_id, "profile")

    @property
    def labels(self):
        """Map immutable profile IDs to unique user-facing labels."""
        return profile_labels(self.coordinator.data["profiles"])

    @property
    def options(self):
        """Return the shared catalog's names."""
        return list(self.labels.values())

    @property
    def current_option(self):
        """Resolve the device assignment by ID, never list position."""
        return self.labels.get(self.output.get("eqId"))

    def _state_snapshot(self):
        """Include only this entity's exposed state and attributes."""
        return (self.available, self.current_option, tuple(self.options))

    async def async_select_option(self, option):
        """Apply the ID represented by this option and retain enable state."""
        profile_id = next((key for key, label in self.labels.items() if label == option), None)
        if profile_id is None:
            raise HomeAssistantError("EQ profile selection is no longer available")
        await self.coordinator.async_set_output(self.output_id, profile_id=profile_id)
