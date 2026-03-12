import React from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/index.scss";
import AppRoot from "./AppRoot";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { setupMonaco } from "./monaco/setupMonaco";

setupMonaco();

// 恢复登录状态
useAuthStore.getState().loadFromStorage();
useThemeStore.getState().loadFromStorage();

async function bootstrap() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppRoot />
    </React.StrictMode>,
  );
}

void bootstrap();
