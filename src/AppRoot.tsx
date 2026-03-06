import { ConfigProvider } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

// 使用 React.lazy 实现动态加载
const ChallengePage = lazy(() => import('./pages/ChallengePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DebuggerPage = lazy(() => import('./pages/DebuggerPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
import {
  CHALLENGE_PATH,
  DASHBOARD_PATH,
  DEBUGGER_PATH,
  LOGIN_PATH,
  PRACTICE_CHALLENGE_PATH,
  PRACTICE_PATH,
  ROOT_PATH,
} from './constants/routes';
import { useThemeStore } from './store/useThemeStore';
import { getAntdTheme } from './utils/theme';

export default function AppRoot() {
  const themeId = useThemeStore((state) => state.themeId);

  return (
    <ConfigProvider theme={getAntdTheme(themeId)}>
      <div className="theme-app h-full">
        <BrowserRouter>
          <Routes>
            <Route path={LOGIN_PATH} element={<LoginPage />} />
            <Route path={PRACTICE_PATH} element={<PracticePage />} />
            <Route path={DEBUGGER_PATH} element={<DebuggerPage />} />
            <Route path={PRACTICE_CHALLENGE_PATH} element={<ChallengePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={DASHBOARD_PATH} element={<DashboardPage />} />
              <Route path={CHALLENGE_PATH} element={<ChallengePage />} />
            </Route>
            <Route path={ROOT_PATH} element={<Navigate to={DASHBOARD_PATH} replace />} />
            <Route path="*" element={<Navigate to={DASHBOARD_PATH} replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}
