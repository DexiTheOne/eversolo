# Eversolo DSP Control

A local Home Assistant integration for Eversolo streamers, with a bundled DSP editor for the DMP-A6.

## Installation

1. In HACS, open **Custom Repositories** and add `https://github.com/DexiTheOne/eversolo` as an **Integration**.
2. Download **Eversolo Integration** and restart Home Assistant.
3. Open **Settings → Devices & Services → Add Integration → Eversolo** and enter the player’s host address and port (default `9529`). Existing Eversolo entries are reused after an update.
4. Open the player’s device page and follow **Visit Device** to its DSP editor, or select its **PEQ** sidebar entry. The editor requires a Home Assistant administrator account.

For manual installation, copy `custom_components/eversolo` into your Home Assistant configuration’s `custom_components` directory and restart Home Assistant. Home Assistant 2026.4.0 or newer is required.

## DSP Editor

The panel includes saved profile management, Mono/Stereo, channel PEQ, graphic EQ, correction PEQ, preamp, balance, loudness, FIR channel controls and an internal-storage WAV browser. Select a band to adjust its parameters, click a numeric field to enter a value, or use the channel copy/paste/reset actions.

**Save** and **Discard** apply to profile drafts. Output profile assignments and EQ enable switches take effect immediately and share state with the native Home Assistant entities. Editing a profile does not select it for an output. Saving a profile affects outputs already assigned to it. FIR import requires a saved or discarded draft and imports immediately.

Each output exposes an **EQ Profile** select and **EQ Enabled** switch on the device page. The integration also provides media playback, volume, power, display and knob lighting, output mode, screen mode, VU style and spectrum style controls, according to device capabilities.

The editor is packaged with the integration. No dashboard resource, separate server, Node.js installation on Home Assistant or YAML configuration is required.

## Development

Run backend checks from the repository root:

```sh
python -m pip install -r requirements.txt pytest
python -m pytest -q tests
python -m ruff check custom_components tests
```

See [Frontend Development](frontend/README.md) for the UI build and offline preview. Commit the generated panel alongside its source. GitHub Actions checks the backend, frontend and generated bundle, plus HACS and Hassfest validation. Release tags must match the integration manifest version.

## Credits

Based on [hchris1/Eversolo](https://github.com/hchris1/Eversolo). Editor components are adapted from [sigman78/dspi-web-console](https://github.com/sigman78/dspi-web-console). Bundled license notices are included with the panel. See [LICENSE](LICENSE) for the integration license.
