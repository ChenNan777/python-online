# 项目整体可维护性重构设计（功能不变）

日期：2026-03-06  
范围：全项目结构优化（页面/组件/hooks/domain/services/store）  
目标：组件拆分与目录重组，保持现有功能、路由和对外行为不变

## 1. 背景与目标

当前项目核心功能可用，但存在可维护性风险：

- 大页面文件职责过多（如 `src/pages/ChallengePage/index.tsx`），阅读与定位成本高。
- 页面逻辑、运行时逻辑、算法逻辑混杂，边界不清晰。
- 跨页面复用能力与页面内私有能力没有稳定分层，目录语义不够明确。

本次优化只做结构改进，不引入新功能，不改变现有交互语义。

## 2. 设计原则

- **行为不变**：路由、状态流、接口语义、运行结果保持一致。
- **最小侵入**：优先拆分与重组，不做无关重构。
- **职责单一**：页面编排、业务逻辑、算法工具、UI 组件分层明确。
- **单向依赖**：继续保持 `store -> services -> httpClient`。
- **渐进迁移**：按批次推进，每批次可独立验证与回滚。

## 3. 方案选型

### 3.1 候选方案

1) **分层 + 按页面域重组（采用）**  
按页面聚合 `components/hooks/domain`，跨页面复用再上移到 `features/components/services`。

2) 逻辑先拆分、目录后迁移  
风险较低，但短期结构会处于混合状态。

3) 仅目录与导出统一  
改动最小，但对大页面维护性提升有限。

### 3.2 结论

采用方案 1。原因：在“功能不变”前提下，可维护性收益最大，且可通过分批迁移控制风险。

## 4. 架构与目录蓝图

### 4.1 总体组织

- 入口与路由保持不变（`src/main.tsx` 不调整行为）。
- 采用“双层组织”：
  - 页面域聚合：页面内私有能力就近放置。
  - 跨域能力沉淀：可复用能力上移到 `src/features` / `src/components` / `src/services`。

### 4.2 关键目录建议

以 `ChallengePage` 为核心示例：

- `src/pages/ChallengePage/index.tsx`：仅保留页面编排。
- `src/pages/ChallengePage/components/*`：页面私有 UI 子组件。
- `src/pages/ChallengePage/hooks/*`：页面私有运行与视图 hooks。
- `src/pages/ChallengePage/domain/*`：算法与上下文构建等纯逻辑。

跨页面共享能力继续放在：

- `src/features/pythonRunner/*`：运行时能力。
- `src/components/*`：真正通用组件。
- `src/services/*`、`src/store/*`：数据与状态链路。

## 5. 组件拆分与职责边界

### 5.1 页面拆分目标

将大页面拆为“编排器 + 领域块”，提升可读性和可测试性。

建议拆分（示例）：

- `ChallengeHeader`：顶部操作区。
- `ChallengeDescriptionPanel`：题面与解法切换。
- `ChallengeEditorPanel`：编辑器渲染与挂载。
- `ChallengeRightPanel`：右侧调试与结果区聚合。
- `modals/*`：弹窗编排。

### 5.2 Hook 拆分建议

- `useChallengeRouteState`：路由参数与模式判定。
- `useChallengeRuntime`：运行控制、断点派生状态。
- `useEditorDecorations`：Monaco 装饰与 marker 生命周期。
- `useChallengeContextCode`：上下文拼装与依赖数据注入。

### 5.3 纯逻辑下沉

将页面中的算法与数据处理迁入 `domain/`，例如距离计算、节点搜索、可达性判断、上下文代码构建等。

## 6. 数据流与错误处理

### 6.1 固定数据流

`UI -> store action -> service -> httpClient -> adapter -> store -> UI`

约束：

- 页面层不直连网络层。
- services 不反向写 store。
- adapter 逻辑保持在 services 层。

### 6.2 错误分层

- 网络错误：`httpClient` 拦截器统一处理。
- 业务错误：`services` 抛语义错误。
- 编排错误：`store/page hooks` 做保守兜底并保留必要日志。

## 7. 注释策略（简短）

- 仅在非直观逻辑处加注释，优先 1 行短注释。
- 重点标注边界条件与状态切换点（断点装饰、调试模式分支、上下文拼装关键步骤）。
- UI 结构代码尽量不注释，依赖命名表达语义。
- `domain/` 纯逻辑允许极简注释（输入输出或关键假设）。
- 统一中文短注释，避免重复描述代码表面行为。

## 8. 迁移批次与风险控制

### 8.1 批次计划

1. 抽离纯逻辑到 `domain/`。  
2. 抽离页面 hooks。  
3. 拆分 UI 子组件并收敛页面编排。  
4. 统一目录与导出。

### 8.2 风险控制

- 每批次独立验证，不跨批次叠加风险。
- 保持外部调用签名与路由常量不变。
- 失败即在当前批次修复，不继续推进。

## 9. 验证与验收标准（严格门禁）

1. `npx tsc -p tsconfig.app.json --noEmit`
2. `npm run lint`
3. `npm run build`

并提供迁移映射清单：`旧文件/符号 -> 新文件/符号`，确保团队后续可追踪。

## 10. 非目标

- 不新增业务功能。
- 不改路由与权限语义。
- 不引入新的基础设施或测试框架。
- 不做与本任务无关的风格化改动。
