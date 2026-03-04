# API 接口接入实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将现有 Mock 数据替换为真实后端 API，实现登录、登出和获取任务信息功能

**Architecture:** 使用适配器模式，创建统一的 HTTP Client 处理请求/响应拦截和错误处理，在 Service 层进行数据适配，保持现有应用类型不变

**Tech Stack:** TypeScript, React, axios, zustand, antd

---

## Task 1: 安装依赖和创建环境配置

**Files:**
- Modify: `package.json`
- Create: `.env.development`
- Create: `.env.production`

**Step 1: 安装 axios 和 crypto-js**

Run: `npm install axios crypto-js`
Run: `npm install -D @types/crypto-js`

Expected: 依赖安装成功

**Step 2: 创建开发环境配置**

Create: `.env.development`

```env
VITE_API_BASE_URL=http://localhost:28888
VITE_USE_MOCK=false
```

**Step 3: 创建生产环境配置**

Create: `.env.production`

```env
VITE_API_BASE_URL=http://localhost:28888
VITE_USE_MOCK=false
```

**Step 4: 提交**

```bash
git add package.json package-lock.json .env.development .env.production
git commit -m "chore: 添加 axios 依赖和环境配置"
```

---

## Task 2: 创建 API 类型定义

**Files:**
- Create: `src/types/api.ts`

**Step 1: 创建 API 类型文件**

Create: `src/types/api.ts`

```typescript
// 通用 API 响应包装
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 登录接口响应
export interface LoginApiResponse {
  token: string;
  tokenHead: string;
  adminInfo: {
    id: string;
    username: string;
    password: string;
    icon: string;
    email: string;
    nickName: string;
    note: string | null;
    createTime: string;
    loginTime: string | null;
    status: string;
  };
  menuInfo: Array<{
    id: string;
    parentId: string;
    createTime: string;
    title: string | null;
    level: number;
    sort: number | null;
    name: string;
    icon: string;
    hidden: number;
    component: string;
    route: string;
    type: string;
    label: string;
    status: boolean;
    children: any[];
  }>;
}

// 任务信息接口响应
export interface TaskInfoApiResponse {
  taskId: string;
  taskName: string;
  taskStatus: string;
  startTime: number[];
  endTime: number[];
  teamId: string;
  teamName: string;
  memberId: string;
  memberName: string;
  taskRoleId: string;
  taskRoleName: string | null;
}
```

**Step 2: 提交**

```bash
git add src/types/api.ts
git commit -m "feat: 添加 API 类型定义"
```

---

## Task 3: 创建 HTTP Client

**Files:**
- Create: `src/utils/httpClient.ts`

**Step 1: 创建 HTTP Client 文件**

Create: `src/utils/httpClient.ts`

```typescript
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

// 创建 axios 实例
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:28888',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：注入 token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一错误处理
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 网络错误
    if (!error.response) {
      message.error('网络连接失败，请检查网络设置');
      return Promise.reject(error);
    }

    // HTTP 错误状态码处理
    const { status } = error.response;

    switch (status) {
      case 401:
        // 未授权，清除 token 并跳转登录
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        message.error('登录已过期，请重新登录');
        // 跳转到登录页
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        break;
      case 403:
        message.error('权限不足，无法访问');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message.error('服务器错误，请稍后重试');
        break;
      default:
        message.error('请求失败，请稍后重试');
    }

    return Promise.reject(error);
  }
);
```

**Step 2: 提交**

```bash
git add src/utils/httpClient.ts
git commit -m "feat: 创建 HTTP Client 和拦截器"
```

---

## Task 4: 创建密码加密工具

**Files:**
- Create: `src/utils/crypto.ts`

**Step 1: 创建加密工具文件**

Create: `src/utils/crypto.ts`

```typescript
import CryptoJS from 'crypto-js';

/**
 * MD5 加密密码
 */
export function encryptPassword(password: string): string {
  return CryptoJS.MD5(password).toString();
}
```

**Step 2: 提交**

```bash
git add src/utils/crypto.ts
git commit -m "feat: 添加密码加密工具"
```

---

## Task 5: 更新 TaskInfo 类型

**Files:**
- Modify: `src/types/task.ts`

**Step 1: 扩展 TaskInfo 类型**

Modify: `src/types/task.ts`

```typescript
export interface TaskInfo {
  id: string;
  name: string;
  description: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
}
```

**Step 2: 提交**

```bash
git add src/types/task.ts
git commit -m "feat: 扩展 TaskInfo 类型定义"
```

---

## Task 6: 创建任务信息服务

**Files:**
- Create: `src/services/task.ts`

**Step 1: 创建任务服务文件**

Create: `src/services/task.ts`

```typescript
import { httpClient } from '../utils/httpClient';
import type { ApiResponse, TaskInfoApiResponse } from '../types/api';
import type { User } from '../types/auth';

/**
 * 将时间数组转换为 Date 对象
 */
function parseTimeArray(timeArray: number[]): Date {
  const [year, month, day, hour, minute, second] = timeArray;
  return new Date(year, month - 1, day, hour, minute, second);
}

/**
 * 将 API 任务信息转换为应用 User 对象
 */
function adaptTaskInfoToUser(apiData: TaskInfoApiResponse, username: string, userId: string): User {
  // 根据 taskRoleId 判断角色
  const role = apiData.taskRoleId === '2' ? 'positioning' : 'pathfinding';

  // 根据 taskStatus 判断任务状态
  const taskStatusNum = parseInt(apiData.taskStatus, 10);
  let taskStatus: 'not_started' | 'in_progress' | 'completed';
  if (taskStatusNum < 2) {
    taskStatus = 'not_started';
  } else if (taskStatusNum === 2) {
    taskStatus = 'in_progress';
  } else {
    taskStatus = 'completed';
  }

  return {
    id: userId,
    username,
    role,
    team: {
      id: apiData.teamId,
      name: apiData.teamName,
    },
    task: {
      id: apiData.taskId,
      name: apiData.taskName,
      description: `任务成员: ${apiData.memberName}`,
      status: taskStatus,
      startTime: parseTimeArray(apiData.startTime),
      endTime: parseTimeArray(apiData.endTime),
    },
  };
}

/**
 * 获取任务信息
 */
export async function getTaskInfo(username: string, userId: string): Promise<User> {
  const response = await httpClient.get<ApiResponse<TaskInfoApiResponse>>('/workPlatform/list');

  if (response.data.code !== 200) {
    throw new Error(response.data.message || '获取任务信息失败');
  }

  return adaptTaskInfoToUser(response.data.data, username, userId);
}
```

**Step 2: 提交**

```bash
git add src/services/task.ts
git commit -m "feat: 创建任务信息服务和适配器"
```

---

## Task 7: 更新认证服务

**Files:**
- Modify: `src/services/auth.ts`

**Step 1: 更新 auth.ts 实现真实 API 调用**

Modify: `src/services/auth.ts`

```typescript
import type { LoginRequest, LoginResponse } from '../types/auth';
import { mockLogin } from './mock';
import { httpClient } from '../utils/httpClient';
import { encryptPassword } from '../utils/crypto';
import type { ApiResponse, LoginApiResponse } from '../types/api';
import { getTaskInfo } from './task';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * 登录接口
 */
async function loginWithApi(request: LoginRequest): Promise<LoginResponse> {
  try {
    // 加密密码
    const encryptedPassword = encryptPassword(request.password);

    // 调用登录接口
    const response = await httpClient.post<ApiResponse<LoginApiResponse>>('/admin/login', {
      username: request.username,
      password: encryptedPassword,
    });

    if (response.data.code !== 200) {
      return {
        success: false,
        message: response.data.message || '登录失败',
      };
    }

    const loginData = response.data.data;

    // 临时保存 token 以便后续请求使用
    const fullToken = `${loginData.tokenHead}${loginData.token}`;
    localStorage.setItem('auth_token', fullToken);

    // 获取任务信息
    const user = await getTaskInfo(
      loginData.adminInfo.nickName || loginData.adminInfo.username,
      loginData.adminInfo.id
    );

    return {
      success: true,
      data: {
        token: fullToken,
        user,
      },
    };
  } catch (error: any) {
    // 清除临时 token
    localStorage.removeItem('auth_token');

    return {
      success: false,
      message: error.message || '登录失败',
    };
  }
}

/**
 * 登出接口
 */
async function logoutWithApi(): Promise<void> {
  try {
    await httpClient.post('/admin/logout');
  } catch (error) {
    console.error('Logout API error:', error);
    // 即使 API 调用失败，也继续清除本地数据
  }
}

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      return mockLogin(request);
    }
    return loginWithApi(request);
  },

  logout: async (): Promise<void> => {
    if (!USE_MOCK) {
      await logoutWithApi();
    }
  },
};
```

**Step 2: 提交**

```bash
git add src/services/auth.ts
git commit -m "feat: 实现真实 API 登录和登出"
```

---

## Task 8: 更新认证 Store

**Files:**
- Modify: `src/store/useAuthStore.ts`

**Step 1: 添加登出 API 调用**

Modify: `src/store/useAuthStore.ts`

```typescript
import { create } from 'zustand';
import type { User } from '../types/auth';
import { authApi } from '../services/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => Promise<void>;
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

  logout: async () => {
    // 调用登出 API
    await authApi.logout();

    // 清除本地数据
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
git commit -m "feat: 更新认证 Store 支持登出 API"
```

---

## Task 9: 更新 DashboardPage 使用异步登出

**Files:**
- Modify: `src/pages/DashboardPage/index.tsx`

**Step 1: 更新登出处理为异步**

Modify: `src/pages/DashboardPage/index.tsx` (line 22-25)

Old:
```typescript
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
```

New:
```typescript
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
```

**Step 2: 提交**

```bash
git add src/pages/DashboardPage/index.tsx
git commit -m "fix: 更新 DashboardPage 使用异步登出"
```

---

## Task 10: 测试和验证

**Files:**
- Test: 所有接口功能

**Step 1: 启动开发服务器**

Run: `npm run dev`

Expected: 服务器启动成功

**Step 2: 测试登录功能**

1. 访问 `/login` 页面
2. 输入测试账号（根据接口文档提供的账号）
3. 点击登录

Expected:
- 密码被 MD5 加密
- 调用 `/admin/login` 接口
- 成功后调用 `/workPlatform/list` 获取任务信息
- 跳转到 `/dashboard` 页面
- 显示正确的用户信息、队伍信息和任务信息

**Step 3: 测试任务信息显示**

在 Dashboard 页面检查：
- 用户名和 ID 正确
- 队伍名称和 ID 正确
- 任务名称和描述正确
- 角色根据 taskRoleId 正确显示（2=定位分析，3=路径规划）

Expected: 所有信息显示正确

**Step 4: 测试登出功能**

1. 点击"退出登录"按钮
2. 观察网络请求

Expected:
- 调用 `/admin/logout` 接口
- 清除本地 token 和用户信息
- 跳转到 `/login` 页面

**Step 5: 测试错误处理**

1. 输入错误的用户名或密码
2. 观察错误提示

Expected: 显示"用户名或密码错误"

**Step 6: 测试 token 过期**

1. 手动清除 localStorage 中的 token
2. 刷新页面或访问需要认证的页面

Expected: 自动跳转到登录页

**Step 7: 最终提交**

```bash
git add -A
git commit -m "test: 验证所有接口功能正常"
```

---

## 注意事项

1. **密码加密**: 确保密码在发送前进行 MD5 加密
2. **Token 格式**: 使用 `Bearer ${token}` 格式，注意 tokenHead 已包含 "Bearer "
3. **错误处理**: 所有 API 调用都要有 try-catch 处理
4. **环境变量**: 确保 `.env` 文件配置正确
5. **类型安全**: 确保所有类型定义正确，避免运行时错误

## 完成标准

- [ ] 所有依赖安装成功
- [ ] HTTP Client 创建并配置拦截器
- [ ] API 类型定义完整
- [ ] 登录接口调用成功并正确适配数据
- [ ] 任务信息接口调用成功并正确适配数据
- [ ] 登出接口调用成功
- [ ] 错误处理正常工作
- [ ] 所有功能测试通过
- [ ] 代码已提交到 git
