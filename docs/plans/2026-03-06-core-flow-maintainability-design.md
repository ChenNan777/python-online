# 核心链路可维护性优化设计

日期：2026-03-06  
范围：`src/services`、`src/store`、`src/utils/httpClient.ts`  
目标：可维护性优先，保持行为不变

## 1. 背景与目标

当前项目在核心链路上已经具备可用能力，但在长期维护中存在以下风险：

- 网络层、服务层、状态层的职责边界不够清晰，后续迭代容易出现耦合扩散。
- 部分错误处理和日志位置分散，排障时容易重复定位。
- 页面层对业务数据的依赖路径需要进一步稳定，避免未来改动波及 UI。

本次优化聚焦“结构和内容优化”，不做行为改造，不变更页面接口，不新增业务功能。

## 2. 设计原则

- 最小改动：仅调整组织结构与职责边界，不改变现有业务语义。
- 单向依赖：`store -> services -> httpClient`，禁止反向耦合。
- 适配收敛：后端字段适配只在 services 层完成。
- 错误分层：网络错误、业务错误、状态编排错误分别在固定层处理。
- 向后兼容：页面调用签名与行为保持不变。

## 3. 方案选型

### 3.1 候选方案

1) 分层收口（推荐）  
在不改行为前提下，整理 `httpClient / services / store` 的职责边界与文件组织。

2) Store 中心化  
把更多编排逻辑上提到 store，services 尽量变薄。

3) HTTP 先行  
优先强化 httpClient，再逐步回推 services 与 store。

### 3.2 结论

采用方案 1（分层收口）。

原因：

- 风险最低，最符合“只做结构优化、不改行为”的约束。
- 可直接提升维护效率，并为后续优化留出清晰扩展点。
- 不会引入 store 过度膨胀或网络层过早抽象的问题。

## 4. 分层设计

### 4.1 传输层：`httpClient`

职责：

- 维护 axios 实例配置（baseURL、timeout、headers）。
- 请求拦截：注入 token。
- 响应拦截：按 HTTP 状态统一错误提示与鉴权失效处理。

边界：

- 不承载业务字段转换。
- 不直接操作业务状态。

### 4.2 服务层：`services`

职责：

- 调用 API。
- 将 API 响应适配为前端业务模型（adapter）。
- 在必要时抛出业务语义错误（例如“获取任务信息失败”）。

边界：

- 不做 UI message 重复提示。
- 不直接写入 store。

### 4.3 状态层：`store`

职责：

- 管理状态与 action。
- 编排 service 调用流程。
- 集中处理持久化（如 `localStorage` 的 token/user_info）。

边界：

- 不直接依赖 HTTP 细节。
- 不承担 API 字段适配。

## 5. 数据流设计

固定链路：

`UI 触发 action -> store action -> service method -> httpClient -> service adapter -> store 更新状态 -> UI 响应`

约束：

- 页面层只消费 store 输出，不直连 httpClient。
- service 层不反向调用 store，避免隐式副作用。

## 6. 错误处理设计

- 网络错误：由 `httpClient` 拦截器统一处理（401/403/404/5xx）。
- 业务错误：由 services 层抛语义错误，供上层兜底。
- 状态错误：由 store 层执行保守恢复策略并记录必要日志。

日志收敛建议：

- `httpClient`：记录网络级上下文。
- `services`：记录适配或业务语义失败点。
- `store`：记录状态编排失败点。

## 7. 验证与验收

由于当前仓库无自动化测试套件，本次采用静态与构建门禁：

1. `npx tsc -p tsconfig.app.json --noEmit`
2. `npm run lint`
3. `npm run build`

重点回归场景（行为不变检查）：

- 登录成功/失败流程。
- 登出与本地状态清理。
- 任务信息获取与适配。
- 鉴权过期跳转登录。
- 本地存储恢复登录态。

## 8. 非目标（本次不做）

- 不新增依赖或基础设施。
- 不引入测试框架。
- 不修改页面层公开调用方式。
- 不调整路由、权限和业务语义。

## 9. 实施边界

优先文件范围：

- `src/utils/httpClient.ts`
- `src/services/auth.ts`
- `src/services/task.ts`
- `src/store/useAuthStore.ts`

可选配套：

- 必要的同层导出或类型整理文件（仅当提升可维护性且不改变行为）。
