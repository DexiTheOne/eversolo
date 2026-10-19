"""Eversolo API Client."""
from __future__ import annotations

import aiohttp
import async_timeout
import socket
import json
import math
from urllib.parse import urlencode

from .const import LOGGER


class EversoloApiClientError(Exception):
    """Exception to indicate a general API error."""


class EversoloApiClientCommunicationError(EversoloApiClientError):
    """Exception to indicate a communication error."""


class EversoloApiClientAuthenticationError(EversoloApiClientError):
    """Exception to indicate an authentication error."""


def _eq_id(value):
    """Reject malformed device IDs as ordinary API failures."""
    try:
        return int(value)
    except (TypeError, ValueError) as err:
        raise EversoloApiClientError("Invalid EQ identifier") from err


class EversoloApiClient:
    """Eversolo API Client."""

    def __init__(
        self,
        host: str,
        port: int,
        session: aiohttp.ClientSession,
    ) -> None:
        """Eversolo API Client."""
        self._host = host
        self._port = port
        self._session = session
        self._has_knob_color: bool | None = None

    async def _async_eq_request(self, endpoint, **params):
        """Validate both HTTP and device status for EQ operations."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/{endpoint}?{urlencode(params)}",
        )
        if not isinstance(result, dict) or str(result.get("status")) != "200":
            raise EversoloApiClientError(f"EQ request {endpoint} was rejected")
        return result

    async def async_get_eq_profiles(self):
        """Enumerate profile IDs and exact names, discarding full EQ settings."""
        profiles = {}
        offset = 0
        while True:
            result = await self._async_eq_request(
                "getDSPConfigList", offset=offset, limit=60, isDSP=0)
            page = result.get("dspConfig")
            if not isinstance(page, list):
                raise EversoloApiClientError("Invalid EQ profile list")
            if not page:
                return profiles
            added = 0
            for item in page:
                if not isinstance(item, dict) or "id" not in item or not isinstance(item.get("name"), str):
                    raise EversoloApiClientError("Invalid EQ profile")
                key = _eq_id(item["id"])
                if key not in profiles:
                    added += 1
                profiles[key] = item["name"]
            if not added:
                raise EversoloApiClientError("EQ profile pagination did not advance")
            if len(page) < 60:
                return profiles
            offset += len(page)

    async def async_get_eq_outputs(self):
        """Discover output identity, selected profile, and enable state."""
        result = await self._async_eq_request("getDSPSourceInList", isDSP=0)
        entries = result.get("eqSourceList")
        if not isinstance(entries, list):
            raise EversoloApiClientError("Invalid EQ output list")
        outputs = {}
        for item in entries:
            if not isinstance(item, dict) or not all(
                key in item for key in ("id", "name", "sourceType", "eqId", "enable")
            ) or item["enable"] not in (True, False, 0, 1) or not all(
                isinstance(item[key], str) for key in ("name", "sourceType")
            ):
                raise EversoloApiClientError("Invalid EQ output")
            outputs[_eq_id(item["id"])] = {
                "name": item["name"], "sourceType": item["sourceType"],
                "eqId": _eq_id(item["eqId"]), "enable": bool(item["enable"]),
            }
        return outputs

    async def async_set_eq_output(self, output_id, source_type, profile_id, enabled):
        """Set assignment and output bypass together; never edit the profile."""
        await self._async_eq_request(
            "setDSPSource", id=output_id, sourceType=source_type,
            enable=int(enabled), eqId=profile_id, isDSP=0)

    async def async_get_eq_profile(self, profile_id):
        """Read a complete profile, including fields this integration cannot edit."""
        result = await self._async_eq_request("getDSPConfig", id=profile_id)
        profile = result.get("dspConfig")
        if (not isinstance(profile, dict) or _eq_id(profile.get("id")) != profile_id
                or not isinstance(profile.get("name"), str)):
            raise EversoloApiClientError("Invalid EQ profile response")
        return profile

    async def async_get_eq_fir_curve(self, profile_id, channel):
        """Read device-rendered FIR magnitude points without fetching or importing files."""
        result = await self._async_eq_request("getDSPFirXY", id=profile_id, type=channel)
        points = result.get("fir")
        if result.get("type") != channel or not isinstance(points, list) or any(
            not isinstance(point, dict) or any(
                type(point.get(key)) not in (int, float) or not math.isfinite(point[key])
                for key in ("x", "y")) for point in points
        ):
            raise EversoloApiClientError("Invalid FIR curve response")
        # The app receives this sentinel before any FIR file has been imported.
        empty = not points or points == [{"x": 0, "y": 0}, {"x": 5, "y": 0}]
        return {"points": [] if empty else [{"x": item["x"], "y": item["y"]} for item in points],
                "loaded": not empty, "coordinate": "log10_hz"}

    async def async_get_fir_files(self, url="/", sort=0, start=0):
        """Browse returned internal-storage URLs, encoding each value once."""
        if (not isinstance(url, str) or (url != "/" and not url.startswith("flash://"))
                or type(sort) is not int or sort not in range(8)
                or type(start) is not int or start < 0):
            raise EversoloApiClientError("Invalid internal file location")
        result = await self._api_wrapper(method="get", url=(
            f"http://{self._host}:{self._port}/ZidooFileControl/v2/getFiles?"
            + urlencode({"url": url, "sort": sort, "startIndex": start, "requestCount": 1000})))
        data = result.get("data") if isinstance(result, dict) else None
        if (not isinstance(result, dict) or str(result.get("code")) != "0" or not isinstance(data, dict)
                or not isinstance(data.get("list"), list)):
            raise EversoloApiClientError("Internal file listing failed")
        return data

    async def async_import_eq_fir(self, profile_id, channel, path):
        """Import an existing internal WAV; the ACK does not confirm filename readback."""
        if (not isinstance(path, str) or not path.startswith("flash://")
                or not path.lower().endswith(".wav")):
            raise EversoloApiClientError("Select an internal WAV file")
        await self._async_eq_request("importDSPFir", id=profile_id, type=channel, path=path)

    async def async_create_eq_profile(self, name):
        """Create once and consume the device-assigned identifier."""
        result = await self._async_eq_request("addDSPConfig", name=name, isDSP=0)
        profile = result.get("dspConfig")
        if not isinstance(profile, dict) or "id" not in profile:
            raise EversoloApiClientError("Creation outcome uncertain; refresh before trying again")
        return await self.async_get_eq_profile(_eq_id(profile["id"]))

    async def async_save_eq_profile(self, profile):
        """Send the entire fresh, merged object with a single URL encoding."""
        await self._async_eq_request(
            "saveDSPConfig", dspConfig=json.dumps(profile, separators=(",", ":"), allow_nan=False))

    async def async_rename_eq_profile(self, profile_id, name):
        """Rename a profile without editing its DSP configuration."""
        await self._async_eq_request("renameDSPConfig", id=profile_id, name=name, isDSP=0)

    async def async_delete_eq_profile(self, profile_id):
        """Delete once; callers must guard identity and verify absence."""
        await self._async_eq_request("deleteDSPConfig", id=profile_id, isDSP=0)

    async def async_get_data(self, previous_data: dict | None = None):
        """Get data from the API."""
        if previous_data is None:
            previous_data = {}

        fetchers = {
            "display_brightness": self.async_get_display_brightness,
            "input_output_state": self.async_get_input_output_state,
            "knob_brightness": self.async_get_knob_brightness,
            "music_control_state": self.async_get_music_control_state,
            "vu_mode_state": self.async_get_vu_mode_state,
            "spectrum_mode_state": self.async_get_spectrum_state,
            "is_display_on": self.async_get_display_state,
        }

        if self._has_knob_color is None:
            self._has_knob_color = await self.async_has_knob_color()

        if self._has_knob_color:
            fetchers["knob_color_state"] = self.async_get_knob_color_state

        result = {}
        failed_keys = []
        for key, fetcher in fetchers.items():
            try:
                result[key] = await fetcher()
            except EversoloApiClientCommunicationError:
                result[key] = previous_data.get(key)
                failed_keys.append(key)

        if len(failed_keys) == len(fetchers):
            raise EversoloApiClientCommunicationError(
                "All API requests failed, device appears to be offline"
            )

        for key in failed_keys:
            LOGGER.warning("Timeout fetching %s, using previous value", key)

        LOGGER.debug("Fetched data from API: %s", result)
        return result

    async def async_get_music_control_state(self):
        """Return music control state."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/getState",
        )
        return result

    def transform_sources(self, input_output_state: dict) -> dict:
        """Return available input sources."""
        sources = input_output_state.get("inputData", None)

        if sources is None:
            return None

        transformed_sources = {}

        for source in list(sources):
            transformed_sources[source["tag"].replace(
                "/", "")] = source["name"]

        return transformed_sources

    def transform_outputs(self, input_output_state: dict) -> list:
        """Return available input sources."""
        outputs = input_output_state.get("outputData", None)

        if outputs is None:
            return None

        # Write data property to transformed_sources with an entry with index and title each
        transformed_sources = []

        enabled_outputs = list(
            filter(lambda output: output["enable"] == 1, outputs))

        for source, index in zip(enabled_outputs, range(len(enabled_outputs))):
            transformed_sources.append({
                "index": index,
                "title": source["name"],
                "tag": source["tag"].replace("/", "")
            })

        return transformed_sources

    async def async_get_input_output_state(self):
        """Return input/output state."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/getInputAndOutputList",
        )

        result["transformed_sources"] = self.transform_sources(result)
        result["transformed_outputs"] = self.transform_outputs(result)

        return result

    async def async_get_vu_mode_state(self):
        """Return VU mode state."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/SystemSettings/displaySettings/getVUModeList",
        )
        return result

    async def async_get_spectrum_state(self):
        """Return spectrum state."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/getSpPlayModeList",
        )
        return result

    async def async_get_display_state(self):
        """Return power options."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooMusicControl/v2/getPowerOption",
        )

        return self.extract_is_screen_on(result)

    def extract_is_screen_on(self, power_options: dict):
        """Add is_screen_on property to power options."""
        # This is a hack to determine if the screen is on or off
        # When a screen is on, the following keywords are present in the screen option depending on the language
        keywords = ["Screen off", "å…³é—­å±å¹•", "é—œé–‰å±å¹•", "Bildschirm aus",
                    "Ecran Ã©teint", "Tela desligada", "ç”»é¢ã‚’ã‚ªãƒ•ã«ã™ã‚‹"]

        data = power_options.get("data")
        if data is None:
            LOGGER.debug('Key "data" not found in power options')
            return None

        screen_option = next(
            (item for item in data if item["tag"] == "screen"), None)

        if screen_option is None:
            LOGGER.debug('Key "screen" not found in power options')
            return None

        result = any(
            keyword.lower() in screen_option["name"].lower() for keyword in keywords)

        return result

    async def async_get_display_brightness(self):
        """Return the display brightness in range 0..255."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/getScreenBrightness",
        )
        current_value = result.get("currentValue", None)
        if current_value is None:
            LOGGER.debug('Key "currentValue" not found in response')
            return None

        # Max value for brightness is 115
        return round(current_value * (255 / 115))

    async def async_set_display_brightness(self, value) -> any:
        """Set the display brightness to a value in range 0..255."""
        # Max value for brightness is 115
        brightness = round(value * (115 / 255))
        return await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/setScreenBrightness?index={brightness}",
            parseJson=False,
        )

    async def async_get_knob_brightness(self) -> any:
        """Return the knob brightness in range 0..255."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/getKnobBrightness",
        )
        current_value = result.get("currentValue", None)
        if current_value is None:
            LOGGER.debug('Key "currentValue" not found in response')
            return None

        # Max value for brightness is 255
        return round(current_value)

    async def async_set_knob_brightness(self, value) -> any:
        """Set the knob brightness to a value in range 0..255."""
        # Max value for brightness is 255
        return await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/setKnobBrightness?index={value}",
            parseJson=False,
        )

    async def async_trigger_reboot(self) -> any:
        """Reboots the device."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/setPowerOption?tag=reboot",
            parseJson=False,
        )

    async def async_trigger_power_off(self) -> any:
        """Powers off the device."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooMusicControl/v2/setPowerOption?tag=poweroff",
            parseJson=False,
        )

    async def async_trigger_toggle_screen(self) -> any:
        """Toggles screen on/off."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/setPowerOption?tag=screen",
            parseJson=False,
        )

    async def async_trigger_turn_screen_on(self) -> any:
        """Turn screen on."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooControlCenter/RemoteControl/sendkey?key=Key.Screen.ON",
            parseJson=False,
        )

    async def async_trigger_turn_screen_off(self) -> any:
        """Turn screen off."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooControlCenter/RemoteControl/sendkey?key=Key.Screen.OFF",
            parseJson=False,
        )

    async def async_trigger_cycle_screen_mode(self, should_show_spectrum=False) -> any:
        """Goes to the next screen."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/changVUDisplay?openType={
                int(should_show_spectrum)}",
            parseJson=False,
        )

    async def async_select_vu_mode_option(self, index, tag) -> any:
        """Select the VU meter style."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/setVUMode?index={index}",
            parseJson=False,
        )

    async def async_select_spectrum_mode_option(self, index, tag) -> any:
        """Select the spectrum style."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/setSpPlayModeList?index={index}",
            parseJson=False,
        )

    async def async_has_knob_color(self) -> bool:
        """Check if the device supports knob color control."""
        try:
            result = await self._api_wrapper(
                method="get",
                url=f"http://{self._host}:{
                    self._port}/SystemSettings/displaySettings/getKnobSettingOption",
            )
            items = result.get("items", [])
            return any(
                item.get("tag") == "SettingsItemTagKnobLightColorList"
                for item in items
            )
        except EversoloApiClientError:
            return False

    async def async_get_knob_color_state(self):
        """Return the knob color list and current selection."""
        return await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/getKnobLightColorList",
        )

    async def async_select_knob_color_option(self, index, tag) -> any:
        """Select the knob light color."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/SystemSettings/displaySettings/setKnobLightColor?index={index}",
            parseJson=False,
        )

    async def async_mute(self) -> any:
        """Mutes the output."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/setMuteVolume?isMute=1",
            parseJson=False,
        )

    async def async_unmute(self) -> any:
        """Unmutes the output."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/setMuteVolume?isMute=0",
            parseJson=False,
        )

    async def async_volume_down(self) -> any:
        """Decreases the volume by one step."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooControlCenter/RemoteControl/sendkey?key=Key.VolumeDown",
            parseJson=False,
        )

    async def async_volume_up(self) -> any:
        """Increases the volume by one step."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooControlCenter/RemoteControl/sendkey?key=Key.VolumeUp",
            parseJson=False,
        )

    async def async_toggle_play_pause(self) -> any:
        """Toggles between play and pause."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/playOrPause",
            parseJson=False,
        )

    async def async_previous_title(self) -> any:
        """Plays the previous title."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/playLast",
            parseJson=False,
        )

    async def async_next_title(self) -> any:
        """Plays the next title."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/playNext",
            parseJson=False,
        )

    async def async_seek_time(self, time) -> any:
        """Seeks to a time given in milliseconds."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ZidooMusicControl/v2/seekTo?time={time}",
            parseJson=False,
        )

    async def async_set_volume(self, volume) -> any:
        """Set the volume."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooMusicControl/v2/setDevicesVolume?volume={volume}",
            parseJson=False,
        )

    async def async_set_input(self, index, tag) -> any:
        """Set the input/source."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooMusicControl/v2/setInputList?tag={tag}&index={index}",
            parseJson=False,
        )

    async def async_set_output(self, index, tag) -> any:
        """Set the output."""
        await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{
                self._port}/ZidooMusicControl/v2/setOutInputList?tag={tag}&index={index}",
            parseJson=False,
        )

    async def async_get_device_model(self) -> dict:
        """Fetch device model info including MAC addresses."""
        result = await self._api_wrapper(
            method="get",
            url=f"http://{self._host}:{self._port}/ControlCenter/getModel",
        )
        return result

    def create_image_url_by_song_id(self, song_id) -> any:
        """Create url to fetch album covers when using the internal player."""
        return f"http://{self._host}:{self._port}/ZidooMusicControl/v2/getImage?id={song_id}&target=16"

    def create_image_url_by_path(self, path) -> any:
        """Create url to fetch album covers when using AirPlay by concatting the path."""
        return f"http://{self._host}:{self._port}{path}"

    async def _api_wrapper(
        self,
        method: str,
        url: str,
        data: dict | None = None,
        headers: dict | None = None,
        parseJson: bool = True,
    ) -> any:
        """Get information from the API."""
        try:
            async with async_timeout.timeout(5):
                response = await self._session.request(
                    method=method,
                    url=url,
                    headers=headers,
                    json=data,
                )
                if response.status in (401, 403):
                    raise EversoloApiClientAuthenticationError(
                        "Invalid credentials",
                    )
                response.raise_for_status()
                if parseJson:
                    return await response.json(content_type=None)
                else:
                    return await response.read()

        except TimeoutError as exception:
            raise EversoloApiClientCommunicationError(
                f"Timeout error fetching information from {url}",
            ) from exception
        except (aiohttp.ClientError, socket.gaierror) as exception:
            raise EversoloApiClientCommunicationError(
                "Error fetching information",
            ) from exception
        except Exception as exception:  # pylint: disable=broad-except
            raise EversoloApiClientError(
                "Something really wrong happened!"
            ) from exception
