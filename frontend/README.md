# Eversolo Frontend

Svelte builds the editor into the `eversolo-peq-panel` web component. Home Assistant serves the bundled module through `panel_custom`; commands use its authenticated WebSocket API and the configured integration entry.

From this directory:

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run build
```

Commit source and generated files in `custom_components/eversolo/frontend`. Vite copies `public/THIRD_PARTY_NOTICES.txt` into the output. No external fonts or CDN requests are used.

For an offline preview, run `python3 -m http.server 8766 --bind 127.0.0.1` from the repository root and open `http://127.0.0.1:8766/frontend/test/preview.html`. The preview uses captured fixtures and browser memory.

The band/preamp controls, response plot, numeric fields, panel chrome and theme derive from [sigman78/dspi-web-console](https://github.com/sigman78/dspi-web-console), revision `239d1701d8ec129aaa198ee15aed72d8110e7c6b`. Bundled notices list the adapted paths and dependency licenses.
