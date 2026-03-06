# Core Flow Maintainability Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不改变现有业务行为的前提下，优化 `httpClient + services + store` 的结构与内容，提升可维护性和可读性。

**Architecture:** 采用三层单向依赖（`store -> services -> httpClient`）。网络层负责统一传输与拦截，服务层负责 API 调用和数据适配，状态层负责编排和持久化。通过最小改动保持页面调用方式与运行时行为不变。

**Tech Stack:** React 18, TypeScript, Vite 7, Axios, Zustand, ESLint 9

---

### Task 1: 基线确认与行为快照

**Files:**
- Read: `src/utils/httpClient.ts`
- Read: `src/services/auth.ts`
- Read: `src/services/task.ts`
- Read: `src/store/useAuthStore.ts`

**Step 1: 记录关键行为清单**

- 登录成功后 token 存储行为
- 登录失败错误提示行为
- 鉴权失效（401）跳转行为
- 任务信息拉取与适配行为
- 本地登录态恢复行为

**Step 2: 运行静态基线检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`  
Expected: PASS

**Step 3: 运行 lint 基线检查**

Run: `npm run lint`  
Expected: PASS

**Step 4: 运行 build 基线检查**

Run: `npm run build`  
Expected: PASS

**Step 5: Commit**

```bash
git add docs/plans/2026-03-06-core-flow-maintainability-implementation-plan.md
git commit -m "docs: add core flow maintainability implementation plan"
```

### Task 2: 收敛 `httpClient` 内部结构（不改行为）

**Files:**
- Modify: `src/utils/httpClient.ts`

**Step 1: 抽离 token 读取辅助函数**

- 将 `localStorage` token 读取封装为私有函数。
- 保持请求拦截器注入逻辑完全一致。

**Step 2: 抽离状态码处理映射函数**

- 将 401/403/404/5xx 处理逻辑整理为可读函数。
- 保持 message 文案与跳转条件不变。

**Step 3: 保持拦截器入口简洁**

- 请求拦截器只做注入与透传。
- 响应拦截器只做分发与 reject。

**Step 4: 验证 lint 与 build**

Run: `npm run lint`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

**Step 5: Commit**

```bash
git add src/utils/httpClient.ts
git commit -m "refactor: reorganize http client interceptors without behavior changes"
```

### Task 3: 收敛 `services/task.ts` 的适配边界

**Files:**
- Modify: `src/services/task.ts`

**Step 1: 规范辅助函数布局**

- 将 `parseTimeArray`、阶段映射、角色映射按“工具函数 -> 适配函数 -> 导出 API”顺序组织。

**Step 2: 明确适配函数职责**

- 保持 `adaptTaskInfoToUser` 为唯一字段映射入口。
- 不改字段含义和返回结构。

**Step 3: 保持错误语义不变**

- 继续在 code 非 200 时抛 `Error`。
- 保留已有中文错误文案逻辑。

**Step 4: 验证**

Run: `npx eslint src/services/task.ts`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

**Step 5: Commit**

```bash
git add src/services/task.ts
git commit -m "refactor: clarify task service adapter boundaries"
```

### Task 4: 收敛 `services/auth.ts` 的流程可读性

**Files:**
- Modify: `src/services/auth.ts`

**Step 1: 按流程分段组织登录逻辑**

- 密码加密、登录请求、临时 token 存储、任务信息加载、返回组装分段。
- 不改变原有执行顺序和失败语义。

**Step 2: 统一错误出口写法**

- 保留 catch 中 token 清理与 message 回传语义。
- 不新增交互行为。

**Step 3: 稳定导出面**

- 继续通过 `authApi` 暴露 `login/logout`。
- 保持调用签名不变。

**Step 4: 验证**

Run: `npx eslint src/services/auth.ts`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

**Step 5: Commit**

```bash
git add src/services/auth.ts
git commit -m "refactor: improve auth service flow readability"
```

### Task 5: 收敛 `useAuthStore` 编排职责

**Files:**
- Modify: `src/store/useAuthStore.ts`

**Step 1: 组织 action 结构**

- 将 `setAuth/logout/loadFromStorage/refreshTaskInfo` 按“写入、清理、恢复、刷新”顺序布局。
- 保持 action 对外签名不变。

**Step 2: 抽离本地存储辅助操作**

- 使用私有函数收口 token/user_info 的读写与清理。
- 保持 key 名和行为一致。

**Step 3: 明确失败兜底路径**

- 保留 JSON 解析失败时清理本地数据逻辑。
- 保留 refresh 失败日志行为。

**Step 4: 验证**

Run: `npx eslint src/store/useAuthStore.ts`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

**Step 5: Commit**

```bash
git add src/store/useAuthStore.ts
git commit -m "refactor: simplify auth store orchestration"
```

### Task 6: 全链路回归与最终整合

**Files:**
- Verify: `src/utils/httpClient.ts`
- Verify: `src/services/auth.ts`
- Verify: `src/services/task.ts`
- Verify: `src/store/useAuthStore.ts`

**Step 1: 运行完整类型检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`  
Expected: PASS

**Step 2: 运行全量 lint**

Run: `npm run lint`  
Expected: PASS

**Step 3: 运行构建**

Run: `npm run build`  
Expected: PASS

**Step 4: 手动行为回归清单**

- 登录成功后进入预期页面。
- 登录失败提示保持一致。
- 401 场景触发清理并跳登录。
- 任务信息展示不变。
- 刷新后登录态恢复不变。

**Step 5: Commit**

```bash
git add src/utils/httpClient.ts src/services/auth.ts src/services/task.ts src/store/useAuthStore.ts
git commit -m "refactor: optimize core flow maintainability without behavior changes"
```
