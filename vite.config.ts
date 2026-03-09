import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const DEFAULT_HTTPS_KEY_PATH = fileURLToPath(new URL('./.cert/dev-key.pem', import.meta.url));
const DEFAULT_HTTPS_CERT_PATH = fileURLToPath(new URL('./.cert/dev-cert.pem', import.meta.url));

function getHttpsConfig() {
  const enabled = process.env.VITE_DEV_HTTPS !== 'false';
  if (!enabled) {
    return undefined;
  }

  const keyPath = process.env.VITE_DEV_HTTPS_KEY_PATH ?? DEFAULT_HTTPS_KEY_PATH;
  const certPath = process.env.VITE_DEV_HTTPS_CERT_PATH ?? DEFAULT_HTTPS_CERT_PATH;

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    return undefined;
  }

  return {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  };
}

const httpsConfig = getHttpsConfig();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    https: httpsConfig,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    proxy: {
      '/tianditu': {
        target: 'http://t0.tianditu.gov.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tianditu/, ''),
      },
    },
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['pyodide'],
  },
});
