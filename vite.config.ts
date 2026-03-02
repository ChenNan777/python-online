import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    proxy: {
      '/osm-tiles': {
        target: 'https://tile.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/osm-tiles/, ''),
      },
    },
  },
  worker: {
    format: "es",
  },
  optimizeDeps: {
    exclude: ["pyodide"],
  },
});
