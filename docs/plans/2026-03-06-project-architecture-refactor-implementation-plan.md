# 项目整体可维护性重构 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不改变现有功能的前提下，完成全项目组件拆分与目录结构重组，显著提升可维护性与可定位性。

**Architecture:** 采用“页面域聚合 + 跨域能力沉淀”方案：页面内部能力下沉到页面目录（`components/hooks/domain`），通用能力保留在 `features/components/services/store`。实现过程中保持数据流 `UI -> store -> services -> httpClient -> store -> UI` 不变，避免行为偏移。

**Tech Stack:** React 18、TypeScript(strict)、Vite 7、Zustand、Ant Design、Monaco Editor、ESLint 9。

---

### Task 1: 建立 ChallengePage 目录骨架

**Files:**
- Create: `src/pages/ChallengePage/components/index.ts`
- Create: `src/pages/ChallengePage/hooks/index.ts`
- Create: `src/pages/ChallengePage/domain/index.ts`

**Step 1: 创建空导出文件**

```ts
export {};
```

**Step 2: 运行单文件 lint 验证可通过**

Run: `npx eslint src/pages/ChallengePage/components/index.ts src/pages/ChallengePage/hooks/index.ts src/pages/ChallengePage/domain/index.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add src/pages/ChallengePage/components/index.ts src/pages/ChallengePage/hooks/index.ts src/pages/ChallengePage/domain/index.ts
git commit -m "refactor: 建立 ChallengePage 重构目录骨架"
```

### Task 2: 抽离路径规划纯逻辑到 domain

**Files:**
- Create: `src/pages/ChallengePage/domain/pathfindingSetup.ts`
- Modify: `src/pages/ChallengePage/domain/index.ts`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 先写类型签名与最小导出（保持编译通过）**

```ts
export type DebugCoord = { lng: number; lat: number };

export function buildPathfindingSetup(): string {
  return "";
}
```

**Step 2: 运行类型检查确认当前最小版本可编译**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

**Step 3: 迁移 `haversineDistance/findNearestNode/getReachableNodes/buildPathfindingSetup` 完整实现**

```ts
// 从 page 中原样迁移实现，签名不变，调用参数不变
```

**Step 4: 页面改为从 domain 导入并替换原内联函数**

Run: `npx eslint src/pages/ChallengePage/index.tsx src/pages/ChallengePage/domain/pathfindingSetup.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/ChallengePage/domain/pathfindingSetup.ts src/pages/ChallengePage/domain/index.ts src/pages/ChallengePage/index.tsx
git commit -m "refactor: 抽离 ChallengePage 路径规划纯逻辑"
```

### Task 3: 抽离定位上下文构建逻辑到 domain

**Files:**
- Create: `src/pages/ChallengePage/domain/positioningSetup.ts`
- Modify: `src/pages/ChallengePage/domain/index.ts`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 新建 `buildPositioningSetup` 并迁移 `generatePositioningData` 相关拼装逻辑**

```ts
export function buildPositioningSetup(): string {
  return "";
}
```

**Step 2: 替换页面中的同名内联函数引用**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

**Step 3: 运行针对文件 lint**

Run: `npx eslint src/pages/ChallengePage/index.tsx src/pages/ChallengePage/domain/positioningSetup.ts`
Expected: PASS

**Step 4: Commit**

```bash
git add src/pages/ChallengePage/domain/positioningSetup.ts src/pages/ChallengePage/domain/index.ts src/pages/ChallengePage/index.tsx
git commit -m "refactor: 抽离 ChallengePage 定位上下文构建逻辑"
```

### Task 4: 抽离运行按钮组为页面私有组件

**Files:**
- Create: `src/pages/ChallengePage/components/RunControls.tsx`
- Modify: `src/pages/ChallengePage/components/index.ts`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 复制 `RunControls` 组件到独立文件并保持 props 签名不变**

```tsx
export default function RunControls(props: RunControlsProps) {
  // 迁移原实现
}
```

**Step 2: 页面删除内联组件，改为导入使用**

Run: `npx eslint src/pages/ChallengePage/index.tsx src/pages/ChallengePage/components/RunControls.tsx`
Expected: PASS

**Step 3: Commit**

```bash
git add src/pages/ChallengePage/components/RunControls.tsx src/pages/ChallengePage/components/index.ts src/pages/ChallengePage/index.tsx
git commit -m "refactor: 拆分 ChallengePage 运行控制组件"
```

### Task 5: 抽离编辑器装饰与错误标记 hook

**Files:**
- Create: `src/pages/ChallengePage/hooks/useEditorDecorations.ts`
- Modify: `src/pages/ChallengePage/hooks/index.ts`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 把 marker 与 decorations 相关状态/副作用迁入 hook**

```ts
export function useEditorDecorations(args: UseEditorDecorationsArgs) {
  return {
    clearEditorRunError,
    showEditorRunError,
    handleEditorMount,
  };
}
```

**Step 2: 页面改为消费 hook 返回值，不改 Monaco 交互语义**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

**Step 3: 运行针对文件 lint**

Run: `npx eslint src/pages/ChallengePage/index.tsx src/pages/ChallengePage/hooks/useEditorDecorations.ts`
Expected: PASS

**Step 4: Commit**

```bash
git add src/pages/ChallengePage/hooks/useEditorDecorations.ts src/pages/ChallengePage/hooks/index.ts src/pages/ChallengePage/index.tsx
git commit -m "refactor: 抽离 ChallengePage 编辑器装饰逻辑"
```

### Task 6: 抽离上下文拼装 hook

**Files:**
- Create: `src/pages/ChallengePage/hooks/useChallengeContextCode.ts`
- Modify: `src/pages/ChallengePage/hooks/index.ts`
- Modify: `src/pages/ChallengePage/index.tsx`

**Step 1: 迁移 `effectiveContextCode` 相关 `useMemo` 与依赖构建**

```ts
export function useChallengeContextCode(args: UseChallengeContextCodeArgs): string {
  return "";
}
```

**Step 2: 页面接入 hook，保持拼接顺序不变（test -> graph -> positioning -> userContext）**

Run: `npx eslint src/pages/ChallengePage/index.tsx src/pages/ChallengePage/hooks/useChallengeContextCode.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add src/pages/ChallengePage/hooks/useChallengeContextCode.ts src/pages/ChallengePage/hooks/index.ts src/pages/ChallengePage/index.tsx
git commit -m "refactor: 抽离 ChallengePage 上下文拼装逻辑"
```

### Task 7: 收敛 ChallengePage 为编排器

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx`
- Modify: `src/pages/ChallengePage/components/index.ts`
- Modify: `src/pages/ChallengePage/hooks/index.ts`
- Modify: `src/pages/ChallengePage/domain/index.ts`

**Step 1: 清理已迁移的内联函数与重复状态定义**

```ts
// index.tsx 仅保留页面装配与 props 连接
```

**Step 2: 统一 import 分组与排序（第三方 -> 项目内 -> 样式）**

Run: `npx eslint src/pages/ChallengePage/index.tsx`
Expected: PASS

**Step 3: 运行类型检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

**Step 4: Commit**

```bash
git add src/pages/ChallengePage/index.tsx src/pages/ChallengePage/components/index.ts src/pages/ChallengePage/hooks/index.ts src/pages/ChallengePage/domain/index.ts
git commit -m "refactor: 收敛 ChallengePage 页面编排职责"
```

### Task 8: 全量质量门禁与迁移清单

**Files:**
- Create: `docs/plans/2026-03-06-project-architecture-refactor-mapping.md`
- Modify: `docs/plans/2026-03-06-project-architecture-refactor-implementation-plan.md`

**Step 1: 执行全量门禁**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

**Step 2: 编写迁移映射清单（旧路径/符号 -> 新路径/符号）**

```md
| 旧位置 | 新位置 | 说明 |
| --- | --- | --- |
| src/pages/ChallengePage/index.tsx#RunControls | src/pages/ChallengePage/components/RunControls.tsx | 组件拆分 |
```

**Step 3: Commit**

```bash
git add docs/plans/2026-03-06-project-architecture-refactor-mapping.md docs/plans/2026-03-06-project-architecture-refactor-implementation-plan.md
git commit -m "docs: 补充重构迁移映射与验收记录"
```

### Task 9: 回归检查（手动）

**Files:**
- Modify: 无（仅验证）

**Step 1: 启动开发环境**

Run: `npm run dev`
Expected: 本地可正常打开页面

**Step 2: 按清单手动回归核心链路**

- 挑战页运行/暂停/单步/停止
- 断点设置与高亮
- 练习模式与考试模式路由
- 测试结果展示与通过计数

**Step 3: Commit（仅当发现并修复重构回归）**

```bash
git add <fixed-files>
git commit -m "fix: 修复重构后回归问题"
```
