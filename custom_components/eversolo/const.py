"""Constants for eversolo."""

from logging import Logger, getLogger

LOGGER: Logger = getLogger(__package__)

NAME = "Eversolo"
DOMAIN = "eversolo"
ATTRIBUTION = ""

DEFAULT_PORT = 9529
DEFAULT_UPDATE_INTERVAL = 2

CONF_NET_MAC = "net_mac"
CONF_MODEL = "model"
CONF_FIRMWARE = "firmware"
CONF_ABLE_REMOTE_BOOT = "able_remote_boot"


def panel_path(entry_id: str) -> str:
    """Return the device's Home Assistant panel route."""
    return f"eversolo-peq-{entry_id.lower()}"
