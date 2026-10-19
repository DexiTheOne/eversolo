"""Eversolo integration."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_HOST, CONF_PORT, Platform
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import EversoloApiClient
from .const import DOMAIN, LOGGER, NAME
from .coordinator import EversoloDataUpdateCoordinator
from .eq import EversoloEQCoordinator

PLATFORMS: list[Platform] = [
    Platform.BUTTON,
    Platform.LIGHT,
    Platform.MEDIA_PLAYER,
    Platform.SELECT,
    Platform.SWITCH,
]


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Migrate config entry to a new version."""
    LOGGER.debug("Migrating from version %s", entry.version)

    if entry.version == 1:
        # Version 2: Update title from host IP to "Eversolo {model}" for proper
        # device naming with _attr_has_entity_name = True.
        title = NAME
        try:
            client = EversoloApiClient(
                host=entry.data[CONF_HOST],
                port=entry.data[CONF_PORT],
                session=async_get_clientsession(hass),
            )
            device_info = await client.async_get_device_model()
            model = device_info.get("model")
            if model:
                title = f"{NAME} {model}"
        except Exception as exception:
            LOGGER.warning(
                "Could not fetch device model during migration, "
                "using default title: %s",
                exception,
            )

        hass.config_entries.async_update_entry(entry, title=title, version=2)
        LOGGER.info("Migration to version 2 successful, title set to '%s'", title)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up this integration using UI."""
    from .panel import async_setup_panel  # pylint: disable=import-outside-toplevel

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = coordinator = EversoloDataUpdateCoordinator(
        hass=hass,
        client=EversoloApiClient(
            host=entry.data[CONF_HOST],
            port=entry.data[CONF_PORT],
            session=async_get_clientsession(hass),
        ),
    )

    # Accept offline device to expose WoL functionality
    try:
        await coordinator.async_config_entry_first_refresh()
    except ConfigEntryNotReady:
        LOGGER.info(
            "Eversolo device is offline, integration set up will continue")

    coordinator.eq_coordinator = EversoloEQCoordinator(hass, coordinator)
    # EQ failure must not prevent playback controls from loading. Platform
    # discovery listeners keep polling alive even when startup is offline.
    await coordinator.eq_coordinator.async_refresh()

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await async_setup_panel(hass, entry)
    entry.async_on_unload(entry.add_update_listener(async_reload_entry))

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Handle removal of an entry."""
    if unloaded := await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        hass.data[DOMAIN].pop(entry.entry_id)
    return unloaded


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload config entry."""
    await hass.config_entries.async_reload(entry.entry_id)
