# 任务制挑战系统实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 Python 在线编辑器重构为基于任务的挑战系统，用户登录后根据角色进入对应挑战

**Architecture:** 多页面应用架构，使用 React Router 管理路由，Zustand 管理状态，先使用 Mock 数据实现完整流程，预留真实接口对接点

**Tech Stack:** React 18, TypeScript, React Router v6, Zustand, Ant Design, Axios

---

## 任务概览

1. 创建类型定义和 Mock 数据
2. 实现认证状态管理 (useAuthStore)
3. 实现 API 服务层
4. 创建登录页面
5. 创建路由守卫组件
6. 创建任务信息页面 (Dashboard)
7. 重构挑战页面支持角色路由
8. 重命名调试器页面
9. 更新路由配置
10. 精简挑战列表
11. 测试完整流程

---

### Task 1: 创建类型定义和 Mock 数据

**Files:**
- Create: `src/types/auth.ts`
- Create: `src/types/task.ts`
- Create: `src/services/mock.ts`

**Step 1: 创建认证相关类型定义**

创建 `src/types/auth.ts`:

```typescript
export interface User {
  id: string;
  username: string;
  role: 'positioning' | 'pathfinding';
  team: Team;
  task: TaskInfo;
}

export interface Team {
  id: string;
  name: string;
}

export interface TaskInfo {
  id: string;
  name: string;
  description: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
}
```

**Step 2: 创建任务相关类型定义**

创建 `src/types/task.ts`:

```typescript
export interface TaskInfo {
  id: string;
  name: string;
  description: string;
}
```

**Step 3: 创建 Mock 数据服务**

创建 `src/services/mock.ts`:

```typescript
import type { LoginRequest, LoginResponse, User } from '../types/auth';

// Mock 用户数据
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  user1: {
    password: '123456',
    user: {
      id: 'user001',
      username: '张三',
      role: 'positioning',
      team: {
        id: 'team001',
        name: '第一小队',
      },
      task: {
        id: 'task001',
        name: '城市定位任务',
        description: '使用方位角测量数据定位目标位置',
      },
    },
  },
  user2: {
    password: '123456',
    user: {
      id: 'user002',
      username: '李四',
      role: 'pathfinding',
      team: {
        id: 'team002',
        name: '第二小队',
      },
      task: {
        id: 'task002',
        name: '路径规划任务',
        description: '在真实路网中找到最短路径',
      },
    },
  },
};

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  await delay(500); // 模拟网络延迟

  const userRecord = MOCK_USERS[request.username];

  if (!userRecord || userRecord.password !== request.password) {
    return {
      success: false,
      message: '用户名或密码错误',
    };
  }

  return {
    success: true,
    data: {
      token: `mock-jwt-token-${Date.now()}`,
      user: userRecord.user,
    },
  };
};
```

**Step 4: 提交**

```bash
git add src/types/auth.ts src/types/task.ts src/services/mock.ts
git commit -m "feat: 添加认证和任务类型定义及 Mock 数据"
```

---

### Task 2: 实现认证状态管理

**Files:**
- Create: `src/store/useAuthStore.ts`

**Step 1: 创建 useAuthStore**

创建 `src/store/useAuthStore.ts`:

```typescript
import { create } from 'zustand';
import type { User } from '../types/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (token: string, user: User) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user_info');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ token, user, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user info:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      }
    }
  },
}));
```

**Step 2: 提交**

```bash
git add src/store/useAuthStore.ts
git commit -m "feat: 实现认证状态管理 useAuthStore"
```

---

### Task 3: 实现 API 服务层

**Files:**
- Create: `src/services/auth.ts`

**Step 1: 创建认证 API 服务**

创建 `src/services/auth.ts`:

```typescript
import type { LoginRequest, LoginResponse } from '../types/auth';
import { mockLogin } from './mock';

// 当前使用 Mock 数据，后续替换为真实 API
export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    // TODO: 替换为真实 API 调用
    // return axios.post('/api/auth/login', request);
    return mockLogin(request);
  },
};
```

**Step 2: 提交**

```bash
git add src/services/auth.ts
git commit -m "feat: 实现认证 API 服务层"
```

---

### Task 4: 创建登录页面

**Files:**
- Create: `src/pages/LoginPage/index.tsx`
- Create: `src/pages/LoginPage/LoginPage.css`

**Step 1: 创建登录页面组件**

创建 `src/pages/LoginPage/index.tsx`:

```typescript
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import { authApi } from '../../services/auth';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);

      if (response.success && response.data) {
        setAuth(response.data.token, response.data.user);
        message.success('登录成功');
        navigate(from, { replace: true });
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      message.error('网络连接失败，请稍后重试');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card" title="Python 在线编辑器">
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-hint">
          <p>测试账号：</p>
          <p>定位分析: user1 / 123456</p>
          <p>路径规划: user2 / 123456</p>
        </div>
      </Card>
    </div>
  );
}
```

**Step 2: 创建登录页面样式**

创建 `src/pages/LoginPage/LoginPage.css`:

```css
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-card .ant-card-head-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.login-hint {
  margin-top: 16px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.login-hint p {
  margin: 4px 0;
}
```

**Step 3: 提交**

```bash
git add src/pages/LoginPage/
git commit -m "feat: 创建登录页面"
```

---

### Task 5: 创建路由守卫组件

**Files:**
- Create: `src/components/ProtectedRoute.tsx`

**Step 1: 创建 ProtectedRoute 组件**

创建 `src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
```

**Step 2: 提交**

```bash
git add src/components/ProtectedRoute.tsx
git commit -m "feat: 创建路由守卫组件 ProtectedRoute"
```

---

### Task 6: 创建任务信息页面 (Dashboard)

**Files:**
- Create: `src/pages/DashboardPage/index.tsx`
- Create: `src/pages/DashboardPage/DashboardPage.css`

**Step 1: 创建 Dashboard 页面组件**

创建 `src/pages/DashboardPage/index.tsx`:

```typescript
import { useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import './DashboardPage.css';

const { Title } = Typography;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  if (!user) {
    return null;
  }

  const handleStart = () => {
    const challengeType = user.role === 'positioning' ? 'positioning' : 'pathfinding';
    navigate(`/challenge/${challengeType}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleText = user.role === 'positioning' ? '定位分析' : '路径规划';
  const buttonText = user.role === 'positioning'
    ? '开始方位角定位挑战'
    : '开始路径规划挑战';

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <Title level={2}>任务信息</Title>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="用户信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
              <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="队伍信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="队伍名称">{user.team.name}</Descriptions.Item>
              <Descriptions.Item label="队伍ID">{user.team.id}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="任务信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="任务名称">{user.task.name}</Descriptions.Item>
              <Descriptions.Item label="任务描述">{user.task.description}</Descriptions.Item>
              <Descriptions.Item label="分配角色">
                <span className={`role-badge role-${user.role}`}>
                  {roleText}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card className="start-card" bordered={false}>
            <div className="start-content">
              <p className="start-hint">
                你的角色是 <strong>{roleText}</strong>，点击下方按钮开始作业
              </p>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                onClick={handleStart}
                block
              >
                {buttonText}
              </Button>
            </div>
          </Card>
        </Space>
      </div>
    </div>
  );
}
```

**Step 2: 创建 Dashboard 页面样式**

创建 `src/pages/DashboardPage/DashboardPage.css`:

```css
.dashboard-page {
  min-height: 100vh;
  background: #f0f2f5;
  padding: 24px;
}

.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h2 {
  margin: 0;
}

.role-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 500;
}

.role-positioning {
  background: #e6f7ff;
  color: #1890ff;
}

.role-pathfinding {
  background: #f6ffed;
  color: #52c41a;
}

.start-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.start-card .ant-card-body {
  padding: 32px;
}

.start-content {
  text-align: center;
}

.start-hint {
  font-size: 16px;
  margin-bottom: 24px;
  color: white;
}

.start-hint strong {
  font-size: 18px;
  font-weight: 600;
}
```

**Step 3: 提交**

```bash
git add src/pages/DashboardPage/
git commit -m "feat: 创建任务信息页面 Dashboard"
```

---

### Task 7: 重构挑战页面支持角色路由

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 修改 ChallengePage 支持路由参数**

修改 `src/pages/ChallengePage/index.tsx`，在文件开头添加导入和路由参数处理：

找到这一行：
```typescript
export default function ChallengePage() {
```

在它之前添加：
```typescript
import { useParams, useNavigate } from 'react-router-dom';
```

然后修改函数开头：
```typescript
export default function ChallengePage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  // 根据路由参数确定挑战ID
  const challengeId = type === 'positioning'
    ? 'bearing-positioning'
    : type === 'pathfinding'
    ? 'shortest-path'
    : null;

  // 如果挑战ID无效，重定向到 dashboard
  if (!challengeId) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  // 查找对应的挑战
  const initialChallenge = CHALLENGES.find((c) => c.id === challengeId);
  if (!initialChallenge) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const [selectedId, setSelectedId] = useState(challengeId);
```

**Step 2: 移除挑战选择下拉框**

在 Header 部分，找到并删除这段代码：
```typescript
<Select
  value={selectedId}
  size="small"
  popupMatchSelectWidth={false}
  disabled={isRunning}
  options={CHALLENGES.map((c) => ({ value: c.id, label: c.title, difficulty: c.difficulty }))}
  optionRender={(opt) => (
    <div className="flex items-center gap-2">
      <span>{opt.data.label}</span>
      <Tag color={DIFFICULTY_COLOR[opt.data.difficulty as keyof typeof DIFFICULTY_COLOR]} className="text-[11px]">
        {opt.data.difficulty}
      </Tag>
    </div>
  )}
  onChange={handleChallengeChange}
/>
```

**Step 3: 添加返回 Dashboard 按钮**

在 Header 的 Segmented 组件之后添加：
```typescript
<Button
  size="small"
  onClick={() => navigate('/dashboard')}
  disabled={isRunning}
>
  返回任务
</Button>
```

**Step 4: 移除 handleChallengeChange 函数**

删除这个函数：
```typescript
const handleChallengeChange = useCallback((id: string) => {
  setSelectedId(id);
  setResults(null);
  clearEditorRunError();
}, [clearEditorRunError]);
```

**Step 5: 提交**

```bash
git add src/pages/ChallengePage/index.tsx
git commit -m "feat: 重构挑战页面支持角色路由参数"
```

---

### Task 8: 重命名调试器页面

**Files:**
- Rename: `src/App.tsx` → `src/pages/DebuggerPage/index.tsx`
- Modify: `src/pages/DebuggerPage/index.tsx`

**Step 1: 创建 DebuggerPage 目录并移动文件**

```bash
mkdir -p src/pages/DebuggerPage
git mv src/App.tsx src/pages/DebuggerPage/index.tsx
```

**Step 2: 修改导出名称**

修改 `src/pages/DebuggerPage/index.tsx`，将最后一行：
```typescript
export default App;
```

改为：
```typescript
export default function DebuggerPage() {
  // ... 保持原有的 App 组件代码不变
}
```

将整个 `function App()` 改名为 `function DebuggerPage()`。

**Step 3: 提交**

```bash
git add src/pages/DebuggerPage/
git commit -m "refactor: 将 App.tsx 重命名为 DebuggerPage"
```

---

### Task 9: 更新路由配置

**Files:**
- Modify: `src/main.tsx`

**Step 1: 更新导入**

修改 `src/main.tsx`，将：
```typescript
import App from "./App";
import ChallengePage from "./pages/ChallengePage";
```

改为：
```typescript
import DebuggerPage from "./pages/DebuggerPage";
import ChallengePage from "./pages/ChallengePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/usePythonStore";
```

**Step 2: 添加登录状态恢复**

在 `setupMonaco();` 之后添加：
```typescript
// 恢复登录状态
useAuthStore.getState().loadFromStorage();
```

**Step 3: 更新路由配置**

将：
```typescript
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/challenge" element={<ChallengePage />} />
</Routes>
```

改为：
```typescript
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
```

**Step 4: 添加 Navigate 导入**

在文件顶部添加：
```typescript
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
```

**Step 5: 提交**

```bash
git add src/main.tsx
git commit -m "feat: 更新路由配置支持多页面应用"
```

---

### Task 10: 精简挑战列表

**Files:**
- Modify: `src/pages/ChallengePage/challenges.ts`

**Step 1: 删除不需要的挑战**

修改 `src/pages/ChallengePage/challenges.ts`，只保留 `bearing-positioning` 和 `shortest-path` 两个挑战。

删除以下挑战：
- sort
- binary-search
- fibonacci
- valid-brackets
- two-sum

保留：
- shortest-path
- bearing-positioning

最终 `CHALLENGES` 数组应该只包含这两个挑战。

**Step 2: 提交**

```bash
git add src/pages/ChallengePage/challenges.ts
git commit -m "refactor: 精简挑战列表，只保留定位和路径规划"
```

---

### Task 11: 测试完整流程

**Step 1: 启动开发服务器**

```bash
npm run dev
```

**Step 2: 测试登录流程**

1. 访问 `http://localhost:5173/`
2. 应该自动重定向到 `/login`
3. 使用 `user1` / `123456` 登录
4. 应该跳转到 `/dashboard`
5. 验证显示正确的任务信息、队伍信息、角色信息

**Step 3: 测试定位分析角色**

1. 在 Dashboard 点击"开始方位角定位挑战"
2. 应该跳转到 `/challenge/positioning`
3. 验证显示 bearing-positioning 挑战
4. 验证地图和调试功能正常工作
5. 点击"返回任务"按钮，应该返回 Dashboard

**Step 4: 测试路径规划角色**

1. 退出登录
2. 使用 `user2` / `123456` 登录
3. 在 Dashboard 点击"开始路径规划挑战"
4. 应该跳转到 `/challenge/pathfinding`
5. 验证显示 shortest-path 挑战
6. 验证地图和调试功能正常工作

**Step 5: 测试调试器页面**

1. 直接访问 `/debugger`
2. 验证原有调试器功能正常工作

**Step 6: 测试状态持久化**

1. 登录后刷新页面
2. 验证保持登录状态
3. 验证仍在正确的页面

**Step 7: 测试路由守卫**

1. 退出登录
2. 尝试直接访问 `/dashboard`
3. 应该重定向到 `/login`
4. 登录后应该自动跳转回 `/dashboard`

**Step 8: 测试错误处理**

1. 使用错误的用户名密码登录
2. 验证显示错误提示
3. 尝试访问不存在的挑战类型 `/challenge/invalid`
4. 应该重定向到 `/dashboard`

**Step 9: 最终提交**

如果所有测试通过：

```bash
git add .
git commit -m "test: 完成任务制挑战系统测试"
```

---

## 实施完成

所有任务完成后，系统应该具备以下功能：

✅ 用户登录（用户名密码认证）
✅ 任务信息展示（队伍、角色）
✅ 角色制挑战系统（定位分析/路径规划）
✅ 路由守卫和状态持久化
✅ 保留原有调试器功能
✅ 使用 Mock 数据，预留真实接口对接点

## 后续对接真实接口

修改 `src/services/auth.ts`，将 Mock 实现替换为真实 API 调用：

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', request);
    return response.data;
  },
};
```
