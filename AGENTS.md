# AGENTS.md

本文件用于指导在本仓库中工作的 agent。

适用范围：仓库根目录及全部子目录。

## 项目概览

- 技术栈：React 18 + TypeScript + Vite 7 + ESLint 9。
- 主要依赖：Ant Design、Zustand、React Router、TanStack Query、Monaco Editor、Pyodide。
- 包管理器：`npm`，锁文件为 `package-lock.json`。
- TypeScript 采用 `strict` 模式，前端路径别名为 `@/* -> src/*`。
- 构建产物目录：`dist/`。
- 当前仓库是前端应用；后端接口代码通过 `src/services/` 中的生成文件接入。

## 目录结构

- 页面：`src/pages/<PageName>/index.tsx`
- 页面私有模块：`src/pages/<PageName>/components/`、`hooks/`、`queries/`、`adapters/`
- 通用组件：`src/components/`
- 特性模块：`src/features/`
- 状态管理：`src/store/`
- 服务层：`src/services/`
- 常量、工具、类型：`src/constants/`、`src/utils/`、`src/types/`
- 运行时相关：`src/worker/`、`src/monaco/`
- 文档与计划：`docs/plans/`

## 安装与开发命令

- 安装依赖（CI / 干净环境）：`npm ci`
- 安装依赖（日常开发）：`npm install`
- 启动开发服务器：`npm run dev`
- 本地预览构建产物：`npm run preview`
- 更新 OpenAPI 生成代码：`npm run openapi`

## 构建、Lint、类型检查

- 生产构建：`npm run build`
- 全量 lint：`npm run lint`
- 单文件 lint：`npx eslint src/path/to/file.tsx`
- 多文件 lint：`npx eslint src/foo.ts src/bar.tsx`
- App 类型检查：`npx tsc -p tsconfig.app.json --noEmit`
- Node / Vite 配置类型检查：`npx tsc -p tsconfig.node.json --noEmit`

## 测试现状与单测命令

- 当前 `package.json` 没有 `test` 脚本。
- 当前仓库未发现 `*.test.*` 或 `*.spec.*` 文件。
- 目前没有可直接执行的自动化测试套件。
- 因此，当前最小验证门禁为：类型检查 + `npm run lint` + `npm run build`。
- 若用户要求“跑测试”或“单测通过”，先明确说明仓库当前没有测试框架，不要虚构测试结果。

### 若后续接入 Vitest，推荐命令约定

- 全量测试：`npm run test`
- 单文件测试：`npm run test -- src/foo/bar.test.ts`
- 单个用例：`npm run test -- src/foo/bar.test.ts -t "case name"`
- 无脚本时可用：`npx vitest run src/foo/bar.test.ts`
- 单文件单次运行：`npx vitest run src/foo/bar.test.ts --reporter=basic`
- 单个用例单次运行：`npx vitest run src/foo/bar.test.ts -t "case name"`

## 推荐验证顺序

1. `npx tsc -p tsconfig.app.json --noEmit`
2. `npx tsc -p tsconfig.node.json --noEmit`（仅当修改了 `vite.config.ts` 等 Node 侧文件）
3. `npm run lint`
4. `npm run build`（涉及路由、worker、构建链路、样式、运行时或页面行为时执行）

## Agent 工作原则

- 先读上下文，再做最小可行修改。
- 优先遵循邻近代码风格，不做无关重构。
- 不顺手修复与当前任务无关的问题。
- 不擅自修改公共接口、路由语义、环境变量约定或生成代码结构。
- 变更鉴权、路由、Monaco、Worker、Pyodide、TanStack Query 时优先保证构建通过。
- 修改 OpenAPI 生成文件前，先确认是否应改源接口定义或只改适配层。
- 若需求只影响考试模式，不要误伤练习模式；反之亦然。

## Import 规范

- 使用 ES Module。
- 类型导入优先使用 `import type`。
- 推荐分组顺序：第三方依赖 -> 项目内模块 -> 样式导入。
- 分组之间保留空行；分组内保持稳定顺序，通常按字母序或邻近风格。
- 修改旧文件时优先保持原有相对路径风格。
- 新增跨层级引用时可使用 `@/`，但需与同目录代码保持一致。
- 不为了统一风格而批量改 import。

## 格式化与注释规范

- 以 ESLint 可通过为底线。
- 当前仓库未见独立 Prettier 配置，不要额外引入格式化工具。
- 引号风格并不完全统一，优先保持“单文件内一致 + 邻近一致”。
- 不做纯格式化大改，避免制造无意义 diff。
- 以后新增或生成代码时，应补充简短注释，帮助快速理解非显然逻辑。
- 注释应简洁、直接，优先解释“为什么”或关键约束，不要逐行翻译代码。
- 注释默认使用中文；若文件整体为英文语境，则保持文件内一致。

## TypeScript 规范

- 新增代码必须满足 `strict` 模式。
- 禁止新增裸 `any`；优先使用 `unknown`、泛型或更具体的联合类型。
- 函数参数、返回值、异步返回值优先显式标注。
- 复用已有类型，避免重复定义等价结构。
- 公共类型优先放在 `src/types/` 或模块内 `types.ts`。
- 空值语义优先显式 `null`，与现有 state/store 风格保持一致。
- 业务状态优先使用字面量联合类型，如 `"idle" | "running"`。
- 类型收窄优先用守卫、早返回和小型辅助函数，少用断言。

## 命名规范

- React 组件：`PascalCase`
- Hook：`useXxx`
- Zustand store hook：`useXxxStore`
- Query hook：`useXxxQuery`，Mutation hook：`useXxxMutation`
- 普通变量与函数：`camelCase`
- 类型、接口、别名：`PascalCase`
- 常量：仅真正常量使用 `UPPER_SNAKE_CASE`
- 布尔值优先使用 `is`、`has`、`can`、`should` 前缀
- 辅助函数名称应体现动作，如 `build...`、`parse...`、`get...`、`fetch...`

## React、状态管理与数据获取

- 使用函数组件与 Hooks。
- 副作用逻辑放在 `useEffect`，依赖项保持完整；不要靠省略依赖掩盖问题。
- 渲染路径避免重复计算，必要时使用 `useMemo` / `useCallback`。
- 组件中优先通过 selector 读取 Zustand store，减少不必要重渲染。
- Zustand action 命名使用动词前缀：`set`、`toggle`、`remove`、`reset`、`load`。
- 本地存储读写集中处理，不要在多个页面散落重复实现。
- 服务端状态优先交给 TanStack Query；本地交互状态再用 `useState` / Zustand。
- Query key 统一集中管理，避免在组件里手写重复 key。

## 服务层、适配层与错误处理

- API 调用放在 `src/services/`；优先复用已有 OpenAPI 生成函数。
- HTTP 请求统一复用 `src/utils/httpClient.ts`，不要重复创建 axios 实例。
- 服务层负责把接口响应适配成前端业务模型；页面和组件尽量不要直接耦合后端原始字段。
- 页面复杂映射逻辑优先放到 `adapters/`、`services/` 或 `utils/`，不要塞进 JSX。
- 网络层错误优先由 `src/utils/httpClient.ts` 拦截器统一处理。
- 业务层可抛出语义明确的错误，例如 `throw new Error("获取任务信息失败")`。
- `catch` 中优先恢复可恢复状态，并保留必要日志。
- 登录、鉴权、持久化失败时要注意清理本地状态。

## 样式与运行时注意点

- 样式文件同时存在 `.css` 与 `.scss`，修改时保持邻近文件做法。
- 公共样式入口见 `src/index.css` 与 `src/styles/index.scss`。
- 不要因为小改动而迁移整块样式体系。
- `vite.config.ts` 中 `worker.format` 固定为 `"es"`，不要破坏该约定。
- `vite.config.ts` 配置了 `@` 别名、COOP/COEP 响应头和 `/tianditu` 代理。
- `pyodide` 被排除在 `optimizeDeps` 外，相关改动需留意构建与运行时兼容性。
- 修改编辑器、调试器、worker 通信协议时，至少跑一次 `npm run build`。

## 文档与计划文件

- 需求较大或跨模块改动时，先在 `docs/plans/` 写计划，再实施。
- 计划文件命名建议：`YYYY-MM-DD-<topic>.md`。
- 实现完成后，如果行为或约束发生变化，应同步更新相关计划文档或说明。

## Cursor / Copilot 规则

已检查以下位置：

- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

当前仓库未发现上述规则文件。

若未来新增这些规则，建议优先级为：

1. 用户直接指令
2. 更深层目录的 `AGENTS.md`
3. 仓库根目录 `AGENTS.md`
4. Cursor / Copilot 规则文件
