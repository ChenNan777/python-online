# AGENTS.md

本文件用于指导在本仓库工作的 agent。

适用范围：仓库根目录及所有子目录。

## 项目速览

- 技术栈：React 18 + TypeScript + Vite 7 + ESLint 9 + Zustand + Ant Design。
- 包管理器：`npm`（存在 `package-lock.json`）。
- 构建产物：`dist/`。
- 路径别名：`@/* -> src/*`（见 `tsconfig.json`、`vite.config.ts`）。
- Dev Server：配置了 COOP/COEP 响应头，`/tianditu` 代理到外部地图服务。
- Worker：`vite.config.ts` 中使用 `worker.format = "es"`。

## 构建 / Lint / 测试命令

### 依赖与开发

- 安装依赖（CI/干净环境）：`npm ci`
- 安装依赖（日常开发）：`npm install`
- 启动开发：`npm run dev`
- 预览构建：`npm run preview`

### 构建与静态检查

- 生产构建：`npm run build`
- 全量 lint：`npm run lint`
- App 类型检查：`npx tsc -p tsconfig.app.json --noEmit`
- Node 配置类型检查：`npx tsc -p tsconfig.node.json --noEmit`
- 单文件 lint：`npx eslint src/path/to/file.tsx`

### 测试现状（重要）

- 当前 `package.json` 没有 `test` 脚本。
- 当前仓库未发现 `*.test.*` / `*.spec.*` 文件。
- 因此目前无可直接执行的自动化测试套件。
- 当前最小质量门禁：`npm run lint` + `npm run build`。

### 单测命令（未来引入 Vitest 时）

- 全量测试：`npm run test`
- 单文件测试：`npm run test -- src/foo/bar.test.ts`
- 单个用例：`npm run test -- src/foo/bar.test.ts -t "case name"`
- 若未配置脚本：`npx vitest run src/foo/bar.test.ts -t "case name"`

## 推荐验证顺序

1. `npx tsc -p tsconfig.app.json --noEmit`
2. `npm run lint`
3. `npm run build`

## 代码风格总则

- 优先遵循“邻近代码风格一致”，避免无关风格化改动。
- 改动保持最小，只处理当前任务相关文件。
- 不顺手重构无关模块，不额外引入基础设施。
- 不修改公共行为与接口语义，除非任务明确要求。

## Import 规范

- 使用 ES Module。
- 类型导入使用 `import type`。
- 推荐分组顺序：
  1) 第三方依赖
  2) 项目内模块
  3) 样式导入
- 分组内保持稳定排序（可按字母序）。
- 路径规则：
  - 旧文件优先保持原有相对路径风格。
  - 新增跨层级引用可用 `@/`，但需与同目录保持一致。

## 格式化规范

- 以 ESLint 可通过为底线（当前无独立 Prettier 配置）。
- 引号、分号、尾逗号遵循“文件内一致 + 邻近一致”。
- 不做纯格式化大改，避免制造无意义 diff。
- 多行结构保持清晰换行，避免超长行。

## TypeScript 规范

- 项目启用 `strict`，新增代码必须通过严格类型检查。
- 禁止新增裸 `any`；确需使用时应先评估 `unknown` 或泛型。
- 函数参数、返回值、异步返回应显式类型化。
- 公共类型优先放 `src/types/` 或模块内 `types.ts`。
- 复用已有类型，不重复定义等价结构。
- 状态字段可使用联合字面量（如 `"idle" | "running"`）。
- 空值语义优先显式 `null`，减少隐式 `undefined`。

## 命名规范

- 组件：`PascalCase`。
- Hook：`useXxx`。
- Zustand store hook：`useXxxStore`。
- 普通变量与函数：`camelCase`。
- 类型/接口：`PascalCase`。
- 常量：`UPPER_SNAKE_CASE`（仅真正常量）。
- 布尔变量优先 `is/has/can/should` 前缀。

## React 与状态管理

- 使用函数组件 + Hooks。
- 副作用放 `useEffect`，依赖项完整。
- 渲染路径避免重计算，必要时使用 `useMemo/useCallback`。
- Zustand：
  - action 命名使用动词前缀（`set/toggle/remove/reset`）。
  - 使用 selector 读取状态，避免不必要重渲染。
  - 本地存储读写集中处理（例如鉴权信息）。

## 错误处理规范

- HTTP 请求统一通过 `src/utils/httpClient.ts`。
- 网络层错误由拦截器统一处理提示与鉴权失效。
- 业务层按语义抛错（如 `throw new Error("获取任务信息失败")`）。
- `catch` 中优先恢复可恢复状态，并保留必要日志。
- 不向 UI 泄漏后端内部字段与堆栈细节。

## 服务层与数据适配

- API 调用放在 `src/services/`。
- 服务层负责把接口响应适配为前端业务模型。
- 页面层尽量消费适配后的结构，避免直接耦合后端字段。
- Token 注入与过期处理复用统一链路，不重复实现。

## 目录与文件约定

- 页面：`src/pages/<PageName>/index.tsx`
- 组件：`src/components/`
- 特性模块：`src/features/`
- 服务：`src/services/`
- 状态：`src/store/`
- 工具：`src/utils/`
- 类型：`src/types/`

## Agent 执行建议

- 先读上下文再改，优先最小可行改动。
- 每次改动后至少跑 `npm run lint`。
- 涉及构建链路/路由/鉴权/worker 时同时跑 `npm run build`。
- 若任务要求“单测通过”，先确认测试框架是否已接入。

## Cursor / Copilot 规则

已检查：

- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

当前仓库未发现上述规则文件。

若未来新增这些文件，建议优先级：

1. 用户直接指令
2. 更深层目录的 `AGENTS.md`
3. 根目录 `AGENTS.md`（本文件）
4. Cursor/Copilot 规则

## 快速命令备忘

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npx tsc -p tsconfig.app.json --noEmit`
- `npx eslint src/path/to/file.tsx`
- `npm run test -- src/foo/bar.test.ts -t "case name"`（未来）
