# HTTP Client 响应判定与登录过期处理 Design

## 目标

在 `src/utils/httpClient.ts` 中统一处理业务成功判定与 401 登录过期交互，避免调用方重复判断 `success` / `code`，并把无效业务响应统一转换为异常。

## 范围

- `src/utils/httpClient.ts`
- 验证 `src/services/auth.ts`
- 验证 `src/services/task.ts`

## 方案

- 在响应拦截器成功分支中读取 `response.data`，优先按业务响应结构做成功判定。
- 当响应体存在 `success` 字段时，仅 `success === true` 视为成功；否则当响应体存在 `code` 字段时，仅 `code === 200` 视为成功。
- 当业务响应判定失败时，统一抛出异常，并优先复用响应体中的 `message`。
- 当 HTTP 状态码为 401 时，不再直接 `message.error` 后跳转，而是弹出 `Modal.confirm` 提示“登录已过期，是否重新登录？”，确认后清理本地登录态并跳转登录页。
- 为避免多个并发 401 产生重复弹窗，在 `httpClient` 内增加一次性弹窗保护标记。

## 不做的事

- 不修改 OpenAPI 生成文件。
- 不重构 `src/services/auth.ts`、`src/services/task.ts` 的调用方式，只保证它们与新拦截器兼容。
- 不引入新的测试框架；当前仓库仍以类型检查、lint、build 作为最小验证门禁。
