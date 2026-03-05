# 任务制挑战系统设计文档

## 概述

将现有的 Python 在线编辑器重构为基于任务的挑战系统。用户需要登录后根据分配的角色（定位分析/路径规划）进入对应的挑战。

## 需求总结

- 用户登录：使用用户名密码认证
- 任务分配：每个用户一个任务，包含队伍信息和角色信息
- 角色系统：定位分析（方位角定位挑战）、路径规划（路径规划挑战）
- 挑战精简：只保留 bearing-positioning 和 shortest-path 两个挑战
- 调试器保留：原有的 Python 调试器作为独立功能保留
- 后端接口：先使用 Mock 数据，预留真实接口对接点

## 架构设计

### 路由结构

```
/login                      - 登录页面（未登录用户的入口）
/dashboard                  - 任务信息页面（显示任务详情、队伍、角色）
/challenge/positioning      - 方位角定位挑战
/challenge/pathfinding      - 路径规划挑战
/debugger                   - Python 调试器（保留原有功能）
/                          - 重定向到 /dashboard
```

### 页面流程

```
用户访问应用
  ↓
检查登录状态
  ↓
未登录 → /login
  ↓
输入用户名密码
  ↓
登录成功 → /dashboard
  ↓
显示任务信息、队伍、角色
  ↓
点击"开始作业"
  ↓
根据角色跳转到对应挑战
  - 定位分析 → /challenge/positioning
  - 路径规划 → /challenge/pathfinding
```

### 认证机制

- **状态管理**: 使用 Zustand 创建 `useAuthStore` 管理认证状态
- **Token 存储**: JWT token 存储在 localStorage
- **路由守卫**: 使用 `ProtectedRoute` 组件保护需要登录的路由
- **自动恢复**: 页面刷新时从 localStorage 恢复登录状态
- **Token 过期**: API 返回 401 时清除 token 并重定向到登录页

### 状态管理

**新增 Store:**

1. **useAuthStore** - 认证状态管理
   ```typescript
   interface AuthStore {
     user: User | null;
     token: string | null;
     isAuthenticated: boolean;
     login: (username: string, password: string) => Promise<void>;
     logout: () => void;
     loadFromStorage: () => void;
   }
   ```

2. **useTaskStore** - 任务状态管理
   ```typescript
   interface TaskStore {
     taskInfo: TaskInfo | null;
     fetchTask: () => Promise<void>;
   }
   ```

**保留 Store:**

3. **usePythonStore** - Python 运行时状态（保持不变）

## 组件设计

### 新增页面组件

#### 1. LoginPage (`/src/pages/LoginPage/index.tsx`)

**功能:**
- 用户名和密码输入框
- 登录按钮
- 错误提示（用户名或密码错误）
- 加载状态

**UI 设计:**
- 居中卡片布局
- 简洁现代的设计风格
- 使用 Ant Design 组件

#### 2. DashboardPage (`/src/pages/DashboardPage/index.tsx`)

**功能:**
- 任务信息卡片：显示任务名称、描述
- 队伍信息：显示所在队伍名称
- 角色信息：显示角色（定位分析/路径规划）
- 开始按钮：根据角色显示不同的提示文案
  - 定位分析角色："开始方位角定位挑战"
  - 路径规划角色："开始路径规划挑战"
- 退出登录按钮

**UI 设计:**
- 卡片式信息展示
- 清晰的视觉层次
- 突出显示角色信息

#### 3. ChallengePage 重构 (`/src/pages/ChallengePage/index.tsx`)

**改动:**
- 接收路由参数 `type` (positioning | pathfinding)
- 根据 type 只显示对应的挑战
- 移除挑战选择下拉框
- 保留所有调试功能（断点、变量面板、地图可视化等）
- 添加返回 Dashboard 按钮

**实现要点:**
```typescript
const { type } = useParams<{ type: string }>();
const challengeId = type === 'positioning'
  ? 'bearing-positioning'
  : 'shortest-path';
const challenge = CHALLENGES.find(c => c.id === challengeId);
```

#### 4. DebuggerPage (`/src/pages/DebuggerPage/index.tsx`)

**改动:**
- 将原 `App.tsx` 重命名为 `DebuggerPage`
- 保持原有功能不变
- 可选：添加访问控制

### 新增工具组件

#### 5. ProtectedRoute (`/src/components/ProtectedRoute.tsx`)

**功能:**
- 检查用户登录状态
- 未登录重定向到 `/login`
- 已登录渲染子组件
- 保存原始访问路径，登录后自动跳转回去

**实现:**
```typescript
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
```

#### 6. ErrorBoundary (`/src/components/ErrorBoundary.tsx`)

**功能:**
- 捕获组件错误
- 显示友好的错误页面
- 提供返回首页按钮

### 修改的文件

#### 7. challenges.ts

**改动:**
- 移除除 `bearing-positioning` 和 `shortest-path` 外的所有挑战
- 保持数据结构不变

## 数据流设计

### 认证数据流

```
用户输入用户名密码
  ↓
LoginPage 调用 authStore.login(username, password)
  ↓
发送请求到后端 API (当前使用 Mock)
  ↓
后端返回 { token, user: { id, name, role, team, task } }
  ↓
存储到 authStore 和 localStorage
  ↓
跳转到 /dashboard
```

### 任务数据流

```
进入 Dashboard
  ↓
从 authStore 读取用户信息
  ↓
显示任务信息 (task.name, task.description)
  ↓
显示队伍信息 (team.name)
  ↓
显示角色信息 (role: 'positioning' | 'pathfinding')
  ↓
点击开始按钮
  ↓
跳转到 /challenge/${role}
```

### 挑战数据流

```
进入 /challenge/:type
  ↓
从路由参数读取 type
  ↓
从 challenges.ts 筛选对应的挑战
  ↓
type === 'positioning' → 加载 bearing-positioning 挑战
type === 'pathfinding' → 加载 shortest-path 挑战
  ↓
用户编写代码 → 运行测试 → 显示结果
```

### Mock 数据结构

**登录请求:**
```typescript
POST /api/auth/login
{
  username: string;
  password: string;
}
```

**登录响应:**
```typescript
{
  success: true,
  data: {
    token: "mock-jwt-token-12345",
    user: {
      id: "user001",
      username: "张三",
      role: "positioning",  // 或 "pathfinding"
      team: {
        id: "team001",
        name: "第一小队"
      },
      task: {
        id: "task001",
        name: "城市定位任务",
        description: "使用方位角测量数据定位目标位置"
      }
    }
  }
}
```

**测试用户:**
```typescript
// 用户1 - 定位分析角色
username: "user1"
password: "123456"
role: "positioning"

// 用户2 - 路径规划角色
username: "user2"
password: "123456"
role: "pathfinding"
```

## 错误处理

### 认证错误

1. **登录失败**
   - 用户名或密码错误 → "用户名或密码错误"
   - 网络请求失败 → "网络连接失败，请稍后重试"
   - 服务器错误 → "服务器错误，请联系管理员"

2. **Token 过期**
   - API 请求返回 401 → 清除本地 token
   - 重定向到 `/login`
   - 显示提示 "登录已过期，请重新登录"

3. **未授权访问**
   - 访问受保护路由但未登录 → 重定向到 `/login`
   - 保存原始访问路径，登录后自动跳转回去

### 任务加载错误

1. **任务信息获取失败**
   - Dashboard 显示错误状态
   - 提供重试按钮
   - 错误信息："无法加载任务信息，请重试"

2. **角色类型不匹配**
   - 如果后端返回的 role 不是 'positioning' 或 'pathfinding'
   - 显示错误页面："角色配置错误，请联系管理员"

### 挑战运行错误

1. **挑战类型不存在**
   - URL 参数 type 无效 → 重定向到 `/dashboard`
   - 显示提示："挑战类型不存在"

2. **Python 运行错误**
   - 保持现有的错误处理机制
   - 在编辑器中显示错误标记
   - 在输出面板显示错误信息

### 全局错误处理

1. **路由守卫**
   - 所有受保护路由使用 ProtectedRoute 包裹
   - 统一处理未登录状态

2. **错误边界**
   - 使用 React Error Boundary 捕获组件错误
   - 显示友好的错误页面
   - 提供返回首页按钮

3. **请求拦截器**
   - 统一处理 API 请求错误
   - 自动添加 Authorization header
   - 统一错误提示格式

## 文件结构

```
src/
├── pages/
│   ├── LoginPage/
│   │   ├── index.tsx           # 登录页面
│   │   └── LoginPage.css       # 样式文件
│   ├── DashboardPage/
│   │   ├── index.tsx           # 任务信息页面
│   │   └── DashboardPage.css
│   ├── ChallengePage/
│   │   ├── index.tsx           # 重构后的挑战页面
│   │   └── challenges.ts       # 只保留2个挑战
│   └── DebuggerPage/
│       └── index.tsx           # 原 App.tsx 重命名
├── components/
│   ├── ProtectedRoute.tsx      # 路由守卫
│   └── ErrorBoundary.tsx       # 错误边界
├── store/
│   ├── useAuthStore.ts         # 认证状态管理
│   ├── useTaskStore.ts         # 任务状态管理
│   └── usePythonStore.ts       # 保持不变
├── services/
│   ├── api.ts                  # API 请求封装
│   ├── auth.ts                 # 认证相关 API
│   └── mock.ts                 # Mock 数据
├── types/
│   ├── auth.ts                 # 认证相关类型
│   └── task.ts                 # 任务相关类型
└── main.tsx                    # 路由配置更新
```

## 实现细节

### 路由配置 (main.tsx)

```typescript
<BrowserRouter>
  <ErrorBoundary>
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
  </ErrorBoundary>
</BrowserRouter>
```

### LocalStorage 存储

- Key: `auth_token` - 存储 JWT token
- Key: `user_info` - 存储用户信息 (JSON 字符串)
- 页面刷新时自动恢复登录状态

### API 请求封装

```typescript
// services/api.ts
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器：添加 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 测试策略

### 单元测试

1. **Store 测试**
   - `useAuthStore`: 测试 login、logout、token 存储/恢复
   - `useTaskStore`: 测试任务信息获取和状态更新

2. **组件测试**
   - `LoginPage`: 测试表单验证、登录流程、错误提示
   - `ProtectedRoute`: 测试登录/未登录状态的路由跳转
   - `DashboardPage`: 测试任务信息显示、角色判断

3. **API Mock 测试**
   - 测试 Mock 数据返回正确格式
   - 测试错误场景（网络失败、认证失败）

### 集成测试

1. **完整登录流程**
   - 未登录访问 `/dashboard` → 重定向到 `/login`
   - 登录成功 → 跳转到 `/dashboard`
   - Dashboard 点击开始 → 跳转到正确的挑战页面

2. **角色权限测试**
   - 定位分析角色 → 访问 positioning 挑战
   - 路径规划角色 → 访问 pathfinding 挑战

3. **状态持久化测试**
   - 登录后刷新页面 → 保持登录状态
   - 退出登录 → 清除所有状态

### 手动测试清单

- [ ] 正确的用户名密码可以登录
- [ ] 错误的用户名密码显示错误提示
- [ ] 登录后跳转到 Dashboard
- [ ] Dashboard 正确显示任务、队伍、角色信息
- [ ] 点击开始按钮跳转到对应挑战
- [ ] 定位分析挑战正常运行
- [ ] 路径规划挑战正常运行
- [ ] 地图可视化正常显示
- [ ] 调试功能正常工作
- [ ] 测试用例正常执行
- [ ] 原有调试器功能保持不变
- [ ] 退出登录后清除 token 并重定向

## 技术栈

- React 18 + TypeScript
- Zustand (状态管理)
- React Router v6 (路由)
- Ant Design (UI 组件)
- Monaco Editor (代码编辑器)
- Pyodide (Python 运行时)
- Axios (HTTP 请求)
- Leaflet (地图可视化)

## 后续对接真实接口

当后端接口开发完成后，只需要修改以下文件：

1. **services/auth.ts** - 将 Mock 实现替换为真实 API 调用
2. **services/mock.ts** - 删除或禁用 Mock 数据
3. **环境变量** - 配置真实的 API 地址

预留的接口对接点：
- `POST /api/auth/login` - 登录接口
- `GET /api/task/info` - 获取任务信息接口（可选）
- `POST /api/auth/logout` - 退出登录接口（可选）

## 实施计划

详见 `implementation-plan.md`
