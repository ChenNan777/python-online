# API 接口接入设计文档

## 概述

本文档描述如何将现有的 Mock 数据替换为真实的后端 API 接口，包括登录、登出和获取任务信息三个接口。

## 设计目标

1. 保持现有代码结构和类型定义不变
2. 使用适配器模式处理 API 数据与应用数据的差异
3. 统一管理 HTTP 请求、token 和错误处理
4. 支持环境变量配置，便于开发和部署

## 架构设计

### 分层结构

```
HTTP Client (httpClient.ts)
    ↓
API Services (auth.ts, task.ts)
    ↓
Adapters (数据转换)
    ↓
Application Types (auth.ts, task.ts)
    ↓
Components & Stores
```

### 关键组件

- **HTTP Client**: 统一的 axios 实例，处理请求/响应拦截、token 注入、错误处理
- **API Types**: 定义接口原始返回的数据结构
- **Service Layer**: 封装 API 调用，包含适配器逻辑
- **Application Types**: 现有的业务类型，保持不变

## 详细设计

### 1. HTTP Client 设计

**文件**: `src/utils/httpClient.ts`

**功能**:
- 配置 base URL 和默认 headers
- 请求拦截器：自动注入 Authorization token
- 响应拦截器：统一处理错误
- 支持环境变量配置 API 地址

**错误处理策略**:
- 401 Unauthorized → 清除 token，跳转登录页
- 403 Forbidden → 提示权限不足
- 500+ Server Error → 提示服务器错误
- Network Error → 提示网络连接失败

**配置方式**:
- 环境变量: `VITE_API_BASE_URL`
- 默认值: `http://localhost:28888`

### 2. API 类型定义

**文件**: `src/types/api.ts`

**定义接口原始响应结构**:

```typescript
// 通用响应包装
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 登录响应
interface LoginApiResponse {
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
    name: string;
    route: string;
    component: string;
    type: string;
    label: string;
    // ... 其他字段
  }>;
}

// 任务信息响应
interface TaskInfoApiResponse {
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

### 3. 数据适配器设计

**登录接口适配**:

```
API Response (adminInfo + menuInfo + token)
    ↓ Adapter
Application User (id, username, role, team, task)
```

**适配逻辑**:
- 从 `adminInfo` 提取用户基本信息
- 从 `menuInfo` 暂时不使用（未来可用于权限控制）
- 保留 `token` 和 `tokenHead`
- 登录后需要调用任务信息接口获取完整用户数据

**任务信息接口适配**:

```
API Response (taskId, taskName, taskStatus, taskRoleId, etc.)
    ↓ Adapter
Application User (id, username, role, team, task)
```

**适配逻辑**:
- `taskRoleId`: "2" → positioning, "3" → pathfinding
- `taskStatus`: <2 未开始, =2 进行中, >2 已结束
- 组装完整的 User 对象（包含 team 和 task 信息）

### 4. 服务层设计

**auth.ts 更新**:
- 保持现有接口签名不变
- 内部调用真实 API
- 使用适配器转换数据
- 保留 Mock 作为降级方案（通过环境变量控制）

**新增 task.ts**:
- `getTaskInfo()`: 获取任务信息接口
- 返回完整的 User 对象（用于刷新用户信息）

**登出接口**:
- 调用 `/admin/logout` 清除服务端 session
- 同时清除本地 token 和用户信息

## 实现计划

### 文件清单

1. **新增文件**:
   - `src/utils/httpClient.ts` - HTTP 客户端
   - `src/types/api.ts` - API 类型定义
   - `src/services/task.ts` - 任务信息服务
   - `.env.development` - 开发环境配置
   - `.env.production` - 生产环境配置

2. **修改文件**:
   - `src/services/auth.ts` - 替换 Mock 为真实 API
   - `src/types/auth.ts` - 可能需要微调类型
   - `src/types/task.ts` - 扩展任务信息类型
   - `src/store/useAuthStore.ts` - 可能需要添加刷新用户信息方法

### 实现步骤

1. 创建 HTTP Client 和 API 类型定义
2. 实现登录接口和适配器
3. 实现任务信息接口和适配器
4. 实现登出接口
5. 更新 LoginPage 组件（如需要）
6. 测试所有接口功能
7. 处理边界情况和错误场景

## 技术决策

### 为什么选择适配器模式？

1. **保持现有代码稳定**: 不需要修改大量组件代码
2. **灵活性**: 可以独立调整 API 数据结构和应用数据结构
3. **可测试性**: 适配器逻辑可以独立测试
4. **渐进式迁移**: 可以逐个接口替换，不影响其他功能

### 为什么使用 axios？

1. **成熟稳定**: 广泛使用，社区支持好
2. **拦截器**: 方便统一处理请求和响应
3. **类型支持**: TypeScript 支持良好
4. **取消请求**: 支持请求取消（如需要）

## 注意事项

1. **密码加密**: 接口文档中密码已经是 MD5 加密，前端需要在发送前进行 MD5 加密
2. **Token 格式**: 使用 `Bearer ${token}` 格式
3. **时间格式**: 任务时间返回的是数组格式 `[year, month, day, hour, minute, second]`，需要转换
4. **角色判断**: taskRoleId 为字符串类型，需要正确比较
5. **错误处理**: 需要处理网络错误、超时、服务器错误等各种情况

## 测试计划

1. **单元测试**: 测试适配器函数的数据转换逻辑
2. **集成测试**: 测试完整的登录流程
3. **错误场景**: 测试各种错误情况的处理
4. **边界情况**: 测试空数据、异常数据的处理

## 未来扩展

1. **菜单权限**: 使用 menuInfo 实现动态路由和权限控制
2. **请求缓存**: 对不常变化的数据进行缓存
3. **请求重试**: 对失败的请求自动重试
4. **请求队列**: 管理并发请求数量
