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
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import { setupMonaco } from "./monaco/setupMonaco";

setupMonaco();

// 恢复登录状态
useAuthStore.getState().loadFromStorage();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/debugger" element={<DebuggerPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/challenge/:type" element={<ChallengePage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
