"""Bundle one authenticated PEQ panel per configured Eversolo device."""
from pathlib import Path
import asyncio

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.http import StaticPathConfig
from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN, panel_path
from .peq import async_profile_command

PANEL_DATA = f"{DOMAIN}_panel"
STATIC_URL = "/eversolo_peq"


async def async_setup_panel(hass, entry):
    """Register shared assets once and a sidebar route for this config entry."""
    from homeassistant.components import frontend, panel_custom  # pylint: disable=import-outside-toplevel

    state = hass.data.setdefault(PANEL_DATA, {"lock": asyncio.Lock(), "registered": False})
    async with state["lock"]:
        if not state["registered"]:
            await hass.http.async_register_static_paths([
                StaticPathConfig(STATIC_URL, str(Path(__file__).parent / "frontend"), False)
            ])
            websocket_api.async_register_command(hass, websocket_eq)
            state["registered"] = True
    path = panel_path(entry.entry_id)
    await panel_custom.async_register_panel(
        hass, frontend_url_path=path, webcomponent_name="eversolo-peq-panel",
        sidebar_title=f"{entry.title} PEQ", sidebar_icon="mdi:tune-vertical",
        module_url=f"{STATIC_URL}/eversolo-peq.js?v=1.0.3",
        config={"entry_id": entry.entry_id, "title": entry.title},
        require_admin=True,
    )
    entry.async_on_unload(lambda: frontend.async_remove_panel(hass, path))


@websocket_api.websocket_command({
    vol.Required("type"): "eversolo/eq",
    vol.Required("entry_id"): str,
    vol.Required("operation"): vol.In(("snapshot", "read", "curves", "create", "save", "save_as", "rename", "delete", "output", "files", "import_fir")),
    vol.Optional("payload", default=dict): dict,
})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_eq(hass, connection, msg):
    """Route authenticated editor commands to the explicitly selected device."""
    main = hass.data.get(DOMAIN, {}).get(msg["entry_id"])
    if main is None:
        connection.send_error(msg["id"], "not_found", "This Eversolo device is no longer loaded")
        return
    coordinator = main.eq_coordinator
    try:
        payload = msg["payload"]
        if msg["operation"] == "output":
            if (type(payload.get("output_id")) is not int
                    or ("profile_id" in payload and type(payload["profile_id"]) is not int)
                    or ("enabled" in payload and type(payload["enabled"]) is not bool)):
                raise HomeAssistantError("Invalid output assignment")
            await coordinator.async_set_output(
                payload["output_id"], profile_id=payload.get("profile_id"), enabled=payload.get("enabled"))
            result = {}
        else:
            result = await async_profile_command(coordinator, msg["operation"], payload)
        connection.send_result(msg["id"], result)
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "eq_error", str(err))
