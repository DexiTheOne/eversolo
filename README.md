# Eversolo Integration

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]
[![License][license-shield]](LICENSE)

[![hacs][hacsbadge]][hacs]
![Project Maintenance][maintenance-shield]

[![Community Forum][forum-shield]][forum]

_Integration for [Eversolo Digital Streamers](https://www.eversolo.com/)._

## Description

This custom component integrates Eversolo Digital Streamers into [Home Assistant](https://www.home-assistant.io/).

It provides the following entities:

| Platform      | Name                         | Description                                                                   |
|---------------|------------------------------|-------------------------------------------------------------------------------|
| Button        | Cycle Screen Mode            | Goes to next screen mode (menu, song info, VU meter with info, VU meter only) |
| Button        | Reboot                       | Reboots device                                                                |
| Light         | Display                      | Controls display on/off and brightness                                                   |
| Light         | Knob                         | Controls knob brightness                                                      |
| Media Player  | Eversolo                     | Media and device power controls                                                                |
| Select        | Knob Color                   | Selects knob light color (only on supported devices)                          |
| Select        | Output Mode                  | Selects between available outputs                                             |
| Select        | Spectrum Style               | Selects between the 4 available Spectrum styles                               |
| Select        | VU Style                     | Selects between the 4 available VU styles                                     |

### Output EQ controls

Each output discovered from the player has an **EQ Profile** select and an **EQ Enabled** switch, grouped under **Configuration** on the native device page. Selecting a profile preserves that output's enabled/disabled state; switching EQ off preserves its profile assignment. These controls do not edit saved profiles. Duplicate profile names are distinguished by their device IDs.

Output assignments are polled every 5 seconds. The shared profile catalog is fetched at startup, after reconnection, every 60 seconds, and when a newly observed assignment has an unknown ID. Commands fetch fresh companion state and verify readback. All requests use the integration's configured host and port.

EQ polling caches, profile IDs, names, and scheduling timestamps stay in memory; no polling data is saved to configuration entries or files. Unchanged polls do not publish EQ entity updates. Recorder can record actual changes to entity state/options or availability, but no poll counters, timestamps, or full EQ settings are exposed. Home Assistant still persists its normal entity registry when entities are first discovered. Profile creation/editing is outside this feature.

### Replacing duplicate buttons

Power On, Power Off, Toggle Screen On/Off, Turn Screen On, and Turn Screen Off buttons have been removed. Use `media_player.turn_on` / `media_player.turn_off` for device power (turn-on requires Wake-on-LAN support), and `light.turn_on` / `light.turn_off` / `light.toggle` on the Display light for the screen.

Cycle Screen Mode (Spectrum) has also been removed. Use the Spectrum Style selector to choose a spectrum style; the regular Cycle Screen Mode button remains available.

Before updating, change any automations, scripts, or dashboard cards that reference those buttons to use the corresponding actions above. The media player and Display light keep their existing entity IDs. Old button registry entries may remain unavailable after updating and can be deleted once their references have been replaced.

> [!IMPORTANT]
> This integration is only tested on the **Eversolo DMP-A6**. Tests and contributions to verify and support more Eversolo devices are welcome!

## Installation

### Install with HACS (recommended)

In case you have [HACS](https://hacs.xyz/) installed already, add this repository as a custom repository and install it. Restart Home Assistant afterwards to load the added integration. HACS will keep track of updates so you can install component updates when available.

### Install manually

Copy the `eversolo` folder from `Eversolo/custom_components` into your `custom_components` folder. Restart Home Assistant afterwards to load the added integration.

## Configuration

You can configure the component using the `Add integration` dialog. Search for `Eversolo` and enter the host IP of your Eversolo streamer.

[commits-shield]: https://img.shields.io/github/commit-activity/y/hchris1/eversolo.svg?style=for-the-badge
[commits]: https://github.com/hchris1/eversolo/commits/main
[hacs]: https://github.com/hacs/integration
[hacsbadge]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/
[license-shield]: https://img.shields.io/github/license/hchris1/eversolo.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Christian%20%40hchris1-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/hchris1/eversolo.svg?style=for-the-badge
[releases]: https://github.com/hchris1/eversolo/releases