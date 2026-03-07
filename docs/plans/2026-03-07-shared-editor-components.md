# Shared Editor Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 抽出 `PageToolbar`、`RunControls`、`CodeEditorShell` 三个公共组件，收口 `ChallengePage` 与 `DebuggerPage` 的重复头部与编辑器壳层实现，同时保持现有业务逻辑不变。

**Architecture:** 采用“小组件 + 页面保留业务逻辑”的方式推进。`PageToolbar` 只负责布局插槽，`RunControls` 统一运行按钮并内部读取共享 store，`CodeEditorShell` 只负责 editor chrome 和壳层，不接管 Monaco 生命周期。

**Tech Stack:** React 18、TypeScript、Ant Design、Zustand、Monaco Editor、Tailwind utility classes、全局 CSS token。

---

### Task 1: 创建公共头部容器 `PageToolbar`

**Files:**
- Create: `src/components/PageToolbar.tsx`

**Step 1: 定义最小 props**

定义：

- `leftContent: ReactNode`
- `rightContent?: ReactNode`
- `className?: string`

**Step 2: 实现最小布局**

渲染一个统一头部容器，内部只做：

- 左侧内容容器
- 中间 `flex-1`
- 右侧内容容器

**Step 3: 不加入业务判断**

不要在组件里判断返回按钮、状态、主题切换器等逻辑。

**Step 4: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: 无类型错误。

### Task 2: 提升公共运行控件 `RunControls`

**Files:**
- Create: `src/components/RunControls.tsx`
- Modify: `src/pages/ChallengePage/components/index.ts`
- Delete or stop using: `src/pages/ChallengePage/components/RunControls.tsx`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 复制并提升组件**

以当前 `src/pages/ChallengePage/components/RunControls.tsx` 为基础创建公共组件。

**Step 2: 保持 store 读取方式**

公共组件继续内部读取 `usePythonStore` 的：

- `isRunning`
- `isPaused`
- `isReady`
- `hasBreakpoints`
- `runStatus`

**Step 3: 保持回调接口最小化**

只接收：

- `onRun`
- `onContinue`
- `onStepOver`
- `onStepInto`
- `onStepOut`
- `onStop`

**Step 4: 先接入 ChallengePage**

优先替换 `ChallengePage` 的引用，确认公共组件行为不变。

**Step 5: 运行校验**

Run: `npm run lint`

Expected: 无 lint 错误。

### Task 3: 用公共 `RunControls` 替换 DebuggerPage 本地实现

**Files:**
- Modify: `src/pages/DebuggerPage/index.tsx`
- Modify: `src/components/RunControls.tsx`（若需要补齐细节）

**Step 1: 删除本地 RunControls 实现**

移除 `DebuggerPage` 内部本地 `RunControls` 函数实现。

**Step 2: 接入公共组件**

从 `src/components/RunControls.tsx` 引入公共运行控件。

**Step 3: 校对行为一致性**

确认以下行为与原本一致：

- 就绪时显示运行按钮
- 运行中无断点时显示运行中 + 停止
- 暂停时显示继续 / 单步 / 进函数 / 出函数 / 停止

**Step 4: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: DebuggerPage 无类型错误。

### Task 4: 创建公共编辑器壳层 `CodeEditorShell`

**Files:**
- Create: `src/components/CodeEditorShell.tsx`

**Step 1: 定义最小 props**

定义：

- `title: string`
- `badges?: string[]`
- `children: ReactNode`
- `className?: string`

**Step 2: 实现 editor chrome**

组件负责渲染：

- 左侧小圆点
- 标题
- 右侧 badges
- 下方内容容器

**Step 3: 不接管 Monaco 参数**

不要在该组件中加入：

- `theme`
- `value`
- `onMount`
- `options`

这些仍由页面中的 `<Editor />` 负责。

**Step 4: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: 新组件类型正常。

### Task 5: ChallengePage 接入 `PageToolbar` 与 `CodeEditorShell`

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx`
- Modify: `src/components/PageToolbar.tsx`（如需微调）
- Modify: `src/components/CodeEditorShell.tsx`（如需微调）

**Step 1: 用 `PageToolbar` 包头部布局**

把当前头部 JSX 改为：

- 左侧内容作为 `leftContent`
- 右侧内容作为 `rightContent`

**Step 2: 用 `CodeEditorShell` 包 Monaco**

把当前 editor chrome JSX 移除，改由 `CodeEditorShell` 提供。

**Step 3: 保持业务逻辑原位**

不要把：

- 解法切换
- 运行逻辑
- test panel 逻辑

迁进公共组件。

**Step 4: 手动检查**

确认：

- 返回按钮位置不回退
- 工具栏右侧控件仍然完整
- editor 上边距不与上方分隔线重叠

### Task 6: DebuggerPage 接入 `PageToolbar` 与 `CodeEditorShell`

**Files:**
- Modify: `src/pages/DebuggerPage/index.tsx`

**Step 1: 用 `PageToolbar` 替换本地头部外层**

保留模板选择、依赖加载、上下文按钮等业务内容，但把头部容器换成公共组件。

**Step 2: 用 `CodeEditorShell` 包裹 Monaco**

标题使用当前 debugger 语义，例如 `sandbox.py`。

**Step 3: 保持右侧调试面板逻辑不动**

不要顺手调整 `RightPanelStack`、变量面板、断点面板等业务结构。

### Task 7: 清理导出与重复实现

**Files:**
- Modify: `src/pages/ChallengePage/components/index.ts`
- Delete: `src/pages/ChallengePage/components/RunControls.tsx`（若已完全迁移）
- Modify: import 使用到的新文件

**Step 1: 清理旧导出**

移除不再需要的局部 `RunControls` 导出。

**Step 2: 清理无用 import**

清理 `ChallengePage` / `DebuggerPage` 因抽组件产生的无用导入。

**Step 3: 运行校验**

Run: `npm run lint`

Expected: 无 unused import / component 警告。

### Task 8: 完整验证

**Files:**
- Modify: `src/index.css`（仅在抽组件后需要收口样式时）

**Step 1: App 类型检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: PASS

**Step 2: Lint**

Run: `npm run lint`

Expected: PASS

**Step 3: 构建**

Run: `npm run build`

Expected: PASS

**Step 4: 浏览器验收**

至少确认：

- `ChallengePage` 头部正常
- `DebuggerPage` 头部正常
- 两页运行控件样式一致
- 两页 editor chrome 一致
- 主题切换后样式无明显回退

### Task 9: 文档与约定补充（可选）

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/plans/2026-03-07-shared-editor-components-design.md`

**Step 1: 若组件边界稳定，补充到 AGENTS**

可补充一条：`ChallengePage` / `DebuggerPage` 共享头部与 editor 壳层组件。

**Step 2: 若实现与设计有偏差，回写设计文档**

仅记录实际落地偏差，不扩展额外范围。
