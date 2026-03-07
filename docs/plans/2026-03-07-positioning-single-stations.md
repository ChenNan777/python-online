# Positioning Single Stations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将定位分析题目与运行时从双参数 `stations + measurements` 模型统一为单参数 `stations` 模型。

**Architecture:** 保留数据装配层的按 ID 合并职责，但对题目、worker 和展示层只暴露带 `bearingDeg` 的 `stations` 列表。练习模式和考试模式共用统一定位模型，避免长期维护两套定位数据语义。

**Tech Stack:** React 18, TypeScript, Ant Design, Pyodide Worker, Monaco Editor

---

### Task 1: 更新定位类型与本地数据装配

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/utils/generatePositioning.ts`
- Modify: `src/pages/ChallengePage/adapters/examChallengeAdapter.ts`

**Step 1: 定义带 bearingDeg 的站点类型**

在 `src/types/index.ts` 中把定位分析标准输入改成单一 `stations` 列表，每项包含 `id`、`lng`、`lat`、`bearingDeg` 和可选 `frequency`。

**Step 2: 调整按 ID 合并逻辑**

在 `src/utils/generatePositioning.ts` 中保留 `mergePositioningDataById`，但输出改为单一 `stations` 列表。

**Step 3: 对齐考试 fallback 装配**

在 `src/pages/ChallengePage/adapters/examChallengeAdapter.ts` 中复用新的定位模型。

### Task 2: 更新定位题题面、starter code 和示例解法

**Files:**
- Modify: `src/pages/ChallengePage/challenges.ts`

**Step 1: 修改题面描述**

把函数签名、参数说明和示例输入统一改为 `solve(stations)`。

**Step 2: 修改 starter code**

将 starter code 改为：

```python
def solve(stations):
    pass
```

**Step 3: 修改所有示例解法**

把示例解法中遍历 `measurements` 的逻辑改为直接遍历 `stations`，统一从 `station["bearingDeg"]` 取方位角。

**Step 4: 修改测试用例**

把定位分析测试用例从双参数改为单参数数组。

### Task 3: 更新 Python 上下文与 worker 调用

**Files:**
- Modify: `src/pages/ChallengePage/domain/positioningSetup.ts`
- Modify: `src/worker/pyodide.worker.ts`

**Step 1: 只注入 stations**

在 `buildPositioningSetup` 中仅向 Python 上下文注入 `stations`。

**Step 2: 修改 worker 调用方式**

在 `src/worker/pyodide.worker.ts` 中把定位分析执行条件从 `stations && measurements` 改为只依赖 `stations`，并调用 `solve(stations)`。

### Task 4: 更新地图面板与定位面板

**Files:**
- Modify: `src/components/MapPanel.tsx`
- Modify: `src/components/PositioningPanel.tsx`

**Step 1: 移除 measurementMap 依赖**

将展示层全部改为直接读取 `station.bearingDeg`。

**Step 2: 调整方位线绘制逻辑**

路径保持不变，只把方位角来源从 `measurements` 改为 `stations`。

### Task 5: 验证改造

**Files:**
- Modify: `docs/plans/2026-03-07-positioning-single-stations-design.md`

**Step 1: 运行 lint**

Run: `npm run lint`
Expected: lint 通过

**Step 2: 运行 build**

Run: `npm run build`
Expected: 构建通过

**Step 3: 回写实现结果**

若最终实现与设计有差异，补充到设计文档中。
