# HTTP Client Response Handling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 axios 响应拦截器中统一处理业务成功判定和 401 登录过期弹窗，确保无效业务响应会被一致地抛出异常。

**Architecture:** 保持 `httpClient` 作为统一网络入口，在响应成功分支内识别带 `success` 或 `code` 的业务包装响应，并在失败时构造语义明确的错误对象。HTTP 401 继续走错误分支，但改为使用 `Modal.confirm` 触发重新登录交互，并通过本地标记避免重复弹窗。

**Tech Stack:** TypeScript、Axios、Ant Design、Vite。

---

### Task 1: 梳理响应判定辅助逻辑

**Files:**
- Modify: `src/utils/httpClient.ts`

**Step 1: 写出业务响应识别逻辑**

- 增加用于识别 `success` / `code` / `message` 字段的响应体守卫与辅助函数。

**Step 2: 明确成功判定规则**

- 在辅助函数中实现“有 `success` 则必须为 `true`，否则有 `code` 则必须为 `200`”的统一规则。

**Step 3: 为失败场景准备统一错误对象**

- 从响应体提取业务错误信息，构造可被调用方 `catch` 复用的异常。

### Task 2: 实现 401 弹窗与重登录流程

**Files:**
- Modify: `src/utils/httpClient.ts`

**Step 1: 引入确认弹窗**

- 把 401 分支从即时 `message.error` 改成 `Modal.confirm`，文案为“登录已过期 / 是否重新登录？”。

**Step 2: 防止重复弹窗**

- 增加模块级布尔标记，确保并发 401 时只弹一个确认框。

**Step 3: 保持现有清理逻辑**

- 用户确认后继续清理本地登录态并跳转登录页，取消时仅关闭弹窗。

### Task 3: 接入响应拦截器

**Files:**
- Modify: `src/utils/httpClient.ts`
- Verify: `src/services/auth.ts`
- Verify: `src/services/task.ts`

**Step 1: 在成功分支统一判断业务响应**

- 让 `response.use` 成功分支先校验业务成功与否，再决定返回 `response.data` 还是抛出异常。

**Step 2: 在错误分支复用状态码处理**

- 保留现有网络错误与 HTTP 错误处理，并让 401 使用新的确认弹窗逻辑。

**Step 3: 自查服务层兼容性**

- 确认 `src/services/auth.ts`、`src/services/task.ts` 仍能处理返回值与抛错，不额外引入行为回归。

### Task 4: 验证

**Files:**
- Modify: `docs/plans/2026-03-10-http-client-response-handling-design.md`
- Modify: `docs/plans/2026-03-10-http-client-response-handling.md`
- Verify: `src/utils/httpClient.ts`

**Step 1: 运行类型检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: PASS，无 TypeScript 错误。

**Step 2: 运行 lint**

Run: `npx eslint src/utils/httpClient.ts`

Expected: PASS，无 ESLint 错误。

**Step 3: 如改动通过则执行构建验证**

Run: `npm run build`

Expected: PASS，Vite 构建成功。
