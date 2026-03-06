import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/index.scss";
import DebuggerPage from "./pages/DebuggerPage";
import ChallengePage from "./pages/ChallengePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PracticePage from "./pages/PracticePage";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  CHALLENGE_PATH,
  DASHBOARD_PATH,
  DEBUGGER_PATH,
  LOGIN_PATH,
  PRACTICE_CHALLENGE_PATH,
  PRACTICE_PATH,
  ROOT_PATH,
} from "./constants/routes";
import { useAuthStore } from "./store/useAuthStore";
import { setupMonaco } from "./monaco/setupMonaco";

setupMonaco();

// 恢复登录状态
useAuthStore.getState().loadFromStorage();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route path={PRACTICE_PATH} element={<PracticePage />} />
        <Route path={DEBUGGER_PATH} element={<DebuggerPage />} />
        {/* 练习模式路由 - 无需登录 */}
        <Route path={PRACTICE_CHALLENGE_PATH} element={<ChallengePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={DASHBOARD_PATH} element={<DashboardPage />} />
          <Route path={CHALLENGE_PATH} element={<ChallengePage />} />
        </Route>
        <Route path={ROOT_PATH} element={<Navigate to={DASHBOARD_PATH} replace />} />
        <Route path="*" element={<Navigate to={DASHBOARD_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
