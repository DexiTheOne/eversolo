import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: 'injected' } })],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    outDir: '../custom_components/eversolo/frontend',
    emptyOutDir: true,
    lib: { entry: 'src/main.ts', formats: ['es'], fileName: () => 'eversolo-peq.js' },
  },
});
