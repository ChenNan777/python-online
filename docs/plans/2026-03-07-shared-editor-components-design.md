# 公共编辑区组件抽取设计

## 背景

当前仓库中，`ChallengePage` 与 `DebuggerPage` 已经在视觉和交互上逐步趋同，但仍保留了明显的重复实现，尤其集中在以下三块：

- 头部工具栏容器与左右分区布局
- 运行控制按钮组
- 编辑器外壳（editor chrome + Monaco 外层容器）

这些重复导致两个问题：

1. 后续继续调头部视觉时，需要同时改两个页面，容易出现细节漂移。
2. 运行控件与编辑器外壳已经被设计成统一风格，但实现没有统一收口，后续维护成本较高。

本次目标不是重构整个页面骨架，而是优先抽出“高重复、低业务耦合”的公共 UI 组件。

## 目标

- 抽出 `PageToolbar` 公共头部工具栏容器组件。
- 抽出 `RunControls` 公共运行控件组件。
- 抽出 `CodeEditorShell` 公共编辑器外壳组件。
- 让 `ChallengePage` 与 `DebuggerPage` 共享这三块 UI 基建。
- 保持现有业务逻辑、运行时状态流和页面布局结构不被大改。

## 不做项

第一阶段不包含：

- 抽整个 `ChallengePage` / `DebuggerPage` 页面骨架
- 抽地图、测试用例面板、变量面板等业务区块
- 重构 Python 运行时状态管理
- 改动 Monaco 生命周期逻辑

## 推荐方案

采用“小而明确的公共组件”方案，而不是抽一个过大的工作区骨架组件。

推荐拆分为 3 个组件：

1. `PageToolbar`
2. `RunControls`
3. `CodeEditorShell`

原因：

- 这三块已经具有清晰的视觉边界。
- 它们之间的职责天然独立，适合稳定复用。
- 能显著减少重复 JSX，同时不会把页面特有逻辑硬塞进公共组件。

## 组件设计

### 1. PageToolbar

建议位置：`src/components/PageToolbar.tsx`

职责：

- 只负责头部工具栏容器与左右布局。
- 负责统一应用 `theme-toolbar`、左右分区、间距规则。
- 不做任何业务判断。

建议接口：

- `leftContent: ReactNode`
- `rightContent?: ReactNode`
- `className?: string`

推荐原因：

- `ChallengePage` 与 `DebuggerPage` 左右区块的内容并不完全一致。
- 若用显式插槽（slot）方式传入左右内容，就不需要为了兼容差异设计很多布尔参数。

### 2. RunControls

建议位置：`src/components/RunControls.tsx`

职责：

- 统一“运行 / 继续 / 单步 / 结束”按钮组。
- 内部读取 `usePythonStore` 的运行状态。
- 根据状态决定展示单按钮或多按钮模式。

建议接口：

- `onRun`
- `onContinue`
- `onStepOver`
- `onStepInto`
- `onStepOut`
- `onStop`
- `labels?`（可选，第一阶段通常不需要）

设计取舍：

- 让组件内部直接读取 `usePythonStore`，而不是把 `isRunning`、`isPaused`、`isReady` 等状态从页面层全部透传。
- 这是合理耦合，因为 `ChallengePage` 和 `DebuggerPage` 本来就基于同一运行时 store。
- 这样可以减少页面侧样板代码，让组件接口保持精简。

### 3. CodeEditorShell

建议位置：`src/components/CodeEditorShell.tsx`

职责：

- 负责编辑器外壳、顶部 chrome、文件名、标签 chip、外层视觉容器。
- 负责包裹 Monaco，但不直接创建 Monaco。

建议接口：

- `title: string`
- `badges?: string[]`
- `children: ReactNode`
- `className?: string`

设计取舍：

- 不把 `Editor`、`theme`、`onMount`、`value` 这些 Monaco 业务参数抽进公共组件。
- 页面仍然自己渲染 `<Editor />`，只放进 `CodeEditorShell` 内部。
- 这样既能统一 UI，又不会让公共组件承担太多编辑器逻辑。

## 页面接入方式

### ChallengePage

保留：

- 题目描述区
- 解法选择逻辑
- 运行逻辑
- 右侧业务面板

替换：

- 用 `PageToolbar` 包头部容器
- 用公共 `RunControls`
- 用 `CodeEditorShell` 包编辑器区域

### DebuggerPage

保留：

- 模板切换逻辑
- 依赖加载逻辑
- 上下文代码逻辑
- 调试流程与右侧调试面板

替换：

- 用 `PageToolbar` 包头部容器
- 用公共 `RunControls`
- 用 `CodeEditorShell` 包编辑器区域

## 数据流

### PageToolbar

- 纯展示组件
- 不读取 store
- 页面把左右内容作为 `leftContent` / `rightContent` 传入

### RunControls

- 内部读取 `usePythonStore`
- 页面只传动作回调
- 组件根据 store 状态决定显示形态

### CodeEditorShell

- 不读取 store
- 页面传标题与 badge
- 页面把 `<Editor />` 作为 `children` 传入

## 迁移步骤

### 第一步

创建 `src/components/PageToolbar.tsx`，只实现最小左右布局，不引入业务 props。

### 第二步

把 `src/pages/ChallengePage/components/RunControls.tsx` 提升为 `src/components/RunControls.tsx`。

此时先保证 `ChallengePage` 能正常接入，再替换 `DebuggerPage` 的本地实现。

### 第三步

创建 `src/components/CodeEditorShell.tsx`，把两页重复的 editor chrome 收口。

### 第四步

替换 `ChallengePage` 与 `DebuggerPage` 中重复的 JSX，并删除页面内冗余实现。

### 第五步

检查样式是否仍然只在 `src/index.css` 中维护一套，不因为抽组件又复制出局部样式。

## 风险点

### 1. RunControls 行为漂移

`DebuggerPage` 当前有本地 `RunControls` 实现，`ChallengePage` 使用组件版。

抽公共组件时，必须先对齐行为，再统一来源，否则可能导致一个页面的按钮态和另一个不一致。

### 2. PageToolbar 过度抽象

如果让 `PageToolbar` 开始接收状态、按钮配置、左右数组等复杂参数，就会变成过度通用组件。

第一阶段应坚持“只做布局容器 + 插槽”。

### 3. CodeEditorShell 边界变重

如果把 Monaco 的主题、onMount、options 也抽进去，就会把公共组件做成业务组件。

第一阶段只抽外壳，不抽 editor 生命周期。

### 4. 头部与编辑器间距回退

前面已经针对头部 spacing、按钮视觉、editor 顶边距做过多次微调。

抽组件后要重点验证：

- 返回按钮到左边缘的距离
- 工具栏右侧控件组视觉统一性
- 编辑器顶部与上方区域的分隔关系

## 验证方案

### 静态验证

- `npx tsc -p tsconfig.app.json --noEmit`
- `npm run lint`

### 构建验证

- `npm run build`

### UI 验收

- `ChallengePage` 头部与编辑器外壳正常显示
- `DebuggerPage` 头部与编辑器外壳正常显示
- 两页运行控件行为一致
- 不出现工具栏间距回退
- 不出现 editor 顶边重叠或间距异常
- 主题切换后两页外壳样式仍正确

## 结论

本次最合适的公共化边界不是整页工作区，而是“头部工具栏 + 运行控件 + 编辑器外壳”三件套。

这样既能最大化复用当前已稳定的视觉设计，又能避免把业务逻辑过早塞进抽象层。对当前仓库来说，这是收益最高、风险最低的一次组件抽取方案。
