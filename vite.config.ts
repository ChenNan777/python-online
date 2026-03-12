import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_HTTPS_KEY_PATH = fileURLToPath(new URL('./.cert/dev-key.pem', import.meta.url));
const DEFAULT_HTTPS_CERT_PATH = fileURLToPath(new URL('./.cert/dev-cert.pem', import.meta.url));

function getHttpsConfig(env: Record<string, string>) {
  const enabled = env.VITE_DEV_HTTPS !== 'false';
  if (!enabled) {
    return undefined;
  }

  const keyPath = env.VITE_DEV_HTTPS_KEY_PATH ?? DEFAULT_HTTPS_KEY_PATH;
  const certPath = env.VITE_DEV_HTTPS_CERT_PATH ?? DEFAULT_HTTPS_CERT_PATH;

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    return undefined;
  }

  return {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const httpsConfig = getHttpsConfig(env);
  const apiTarget = env.VITE_API_BASE_URL ?? 'http://localhost:28888';
  const uavApiTarget = env.VITE_UAV_API_BASE_URL ?? apiTarget;
  console.log('apiTarget', apiTarget);
  console.log('uavApiTarget', uavApiTarget, env.VITE_UAV_API_BASE_URL);
  return {
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
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/uav-api': {
          target: uavApiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/uav-api/, ''),
        },
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
  };
});
