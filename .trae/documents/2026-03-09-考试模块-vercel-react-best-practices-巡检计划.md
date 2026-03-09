# 考试模块 vercel-react-best-practices 巡检计划

## 目标
- 用 Vercel React Best Practices 的视角，定位考试模块（以 `ExamChallengePage` 为核心链路）的性能与稳定性问题根因。
- 给出一组“低风险、可验证、不改业务语义”的改进项清单，并按优先级拆分实施步骤与验证门禁。

## 范围
- 页面：`src/pages/ChallengePage/ExamChallengePage.tsx`
- 适配与请求：`src/pages/ChallengePage/adapters/examChallengeAdapter.ts`、`src/pages/ChallengePage/queries/*`、`src/utils/httpClient.ts`
- 重点链路：路由解析 → 作业信息拉取 → 历史拉取 → 场景拉取/兜底 → 编辑器引导 → 自动保存 → 提交

## 非目标
- 不引入新功能、不修改接口契约、不调整 UI/文案（除非是“错误提示可读性增强”且不改变含义）。
- 不做大规模目录迁移/公共抽象重构。

## 巡检维度（按优先级映射到最佳实践）

### A. Eliminating Waterfalls（关键）
1. 梳理考试页的请求依赖链：
   - assignment（依赖 userId + operationType）
   - history（依赖 assignment.taskId + assignment.memberId）
   - positioningScene（依赖 assignment.targetId，仅定位题）
2. 确认能并行的部分是否已并行：
   - history 与 positioningScene 在 assignment 就绪后是否同时开始（避免串行等待）。
3. 对“提交”链路做依赖分解：
   - 保存补偿、payload 构建、提交、成功后刷新查询是否存在不必要的 await 串行。
   - 可并行的 invalidateQueries 是否已 Promise.all（若未则改为并行）。

### B. Bundle Size Optimization（关键）
1. 识别考试路由首屏是否“被迫加载”重依赖（Monaco/Pyodide/地图相关）：
   - 若 `ChallengeWorkspace` 或其依赖进入主 chunk，评估路由级/组件级动态加载（`import()` + `React.lazy`）。
2. 检查是否存在 barrel 导入导致整包引入（例如从 index 统一导出），对重依赖改为直达导入。
3. 若需要：对考试页专用的重组件做“按需加载 + 预加载（hover/focus）”策略，避免切换路由时白屏。

### C. Re-render Optimization（中等优先级）
1. Zustand 订阅范围收敛：
   - `useAuthStore` 只订阅考试页用到的最小字段（如 userId、task 是否存在），避免 user 对象变化导致整页重渲染。
   - `usePythonStore` 若仅在提交时使用结果，优先在 handler 内读取（或用 ref 缓存），避免运行结果更新触发整页重渲染。
2. 高频输入路径降噪（重点）：
   - 当前“代码变更”是否导致 `ExamChallengePage` 每次输入都重渲染；若是，评估将 `currentCode` 迁移到更靠近编辑器的组件或用 ref 承载，减少父组件更新。
3. 派生值/对象稳定性：
   - 避免把非必要对象放进 effect deps；尽量依赖原始、稳定的 primitive。
   - 对可能较重的计算（如 roadNetwork 解析）确认 memo 的依赖足够精确（优先依赖 `assignment.roadNetworkGeoJson` 而不是整个 assignment 引用）。

### D. Rendering / JS 性能（中低优先级）
1. 历史代码“最近一条”选择算法：
   - 目前若有 `sort` 复制排序，评估用单次遍历取 max，降低 O(n log n) 为 O(n)（保持行为一致前提下）。
2. JSX/回调的创建开销：
   - 对 `leftActions/rightActions` 是否需要 memo 评估（仅在确认渲染成本可观时做）。

## 产出（可执行改进清单）
### P0（先做）
- 收敛 store 订阅到最小字段，减少无关重渲染。
- 确认并修复提交/刷新中的不必要 await 串行（能并行就并行）。
- 将“保存失败”的可观测性补齐：用户能看到具体失败原因（权限/网络/作业信息缺失）。

### P1（再做）
- 路由级/组件级 code-splitting：把 Monaco/Pyodide/地图等重依赖延后加载到真正进入考试页后。
- 减少代码输入导致的父组件重渲染（ref 承载 + 仅在需要时同步 state）。

### P2（可选）
- 历史记录最近项选择改为 O(n)。
- 细化 memo 依赖、移除不必要 memo（保持可读性优先）。

## 实施步骤（批准后执行）
1. 代码走查与基线记录：
   - 标注哪些 state/selector 会导致整页重渲染；标注关键请求依赖图。
2. 落地 P0 改动并逐项验证（不改行为）：
   - store selector 收敛、并行 await、错误可观测性增强。
3. 落地 P1 改动并验证路由切换与构建产物：
   - 动态导入重组件，确保 SSR 不相关（本项目为 Vite SPA）且交互不变。
4. 回归验证：
   - 自动保存：加载/历史 loading 时不触发；作业信息齐全后正常保存；失败有可读提示。
   - 提交：保存补偿、两题型校验与提示保持一致；提交成功后历史与作业状态刷新。

## 验证门禁
- `npx tsc -p tsconfig.app.json --noEmit`
- `npm run lint`
- `npm run build`
- 手工回归：输入触发自动保存、切换历史覆盖确认、提交两题型链路

