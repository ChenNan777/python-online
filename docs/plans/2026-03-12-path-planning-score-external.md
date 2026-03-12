# 路径规划对外契约落地 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将“路径规划计算与路程消耗口径”从设计文档落地为可长期维护的对外契约资产（规则、字段、示例、验收清单），供外部系统稳定对接。

**Architecture:** 采用“单一事实来源 + 文档契约化”方式：以现有前端计算链路为事实基础，在文档层沉淀字段契约与异常规则，再补充版本化与验收流程。实现阶段只做文档与说明资产完善，不改变运行时代码逻辑。

**Tech Stack:** Markdown、TypeScript 类型定义（只读对照）、Git。

---

### Task 1: 固化契约字段映射表

**Files:**
- Modify: `docs/plans/2026-03-12-path-planning-score-external-design.md`
- Reference: `src/types/index.ts`
- Reference: `src/worker/pyodide.worker.ts`
- Reference: `src/pages/ChallengePage/adapters/examChallengeAdapter.ts`

**Step 1: 写“失败校验标准”（先定义验收）**

在设计文档新增“契约字段映射表”章节前，先写明验收条件：
- 文档必须包含 `graph/start/end/totalDistance/waypoints` 的来源、类型、单位、必填性。
- 文档必须标注字段来源文件路径。

**Step 2: 运行校验，确认当前文档不满足（预期失败）**

Run: `rg "契约字段映射表|字段来源|必填性" docs/plans/2026-03-12-path-planning-score-external-design.md`
Expected: 未命中全部关键字段（当前文档缺少结构化映射表）。

**Step 3: 最小实现（补齐映射表）**

在设计文档中新增表格，至少包含下列行：

```md
| 字段 | 类型 | 单位 | 必填 | 生成阶段 | 来源 |
| --- | --- | --- | --- | --- | --- |
| graph | Record<string, Record<string, number>> | 加权米 | 是 | 图构建 | src/utils/parseRoadNetwork.ts |
| start | string | - | 是 | 上下文注入 | src/worker/pyodide.worker.ts |
| end | string | - | 是 | 上下文注入 | src/worker/pyodide.worker.ts |
| planningResult.totalDistance | number | 加权米 | 是 | 提交组装 | src/pages/ChallengePage/adapters/examChallengeAdapter.ts |
| planningResult.waypoints | Array<{longitude,latitude,sequence}> | 度/序号 | 是 | 提交组装 | src/pages/ChallengePage/adapters/examChallengeAdapter.ts |
```

**Step 4: 再次校验（预期通过）**

Run: `rg "契约字段映射表|planningResult.totalDistance|waypoints" docs/plans/2026-03-12-path-planning-score-external-design.md`
Expected: 命中新增章节和关键字段。

**Step 5: Commit**

```bash
git add docs/plans/2026-03-12-path-planning-score-external-design.md
git commit -m "docs(path-planning): add contract field mapping table"
```

### Task 2: 补齐异常码与处理策略对照

**Files:**
- Modify: `docs/plans/2026-03-12-path-planning-score-external-design.md`
- Reference: `src/worker/pyodide.worker.ts`
- Reference: `src/pages/ChallengePage/ExamChallengePage.tsx`

**Step 1: 写“失败校验标准”（先定义验收）**

在文档中先定义最小异常清单验收项：
- 算法异常、空路径、`totalDistance=-1`、坐标缺失、提交前阻断。
- 每条异常需包含“触发条件/前端表现/外部系统建议处理”。

**Step 2: 运行校验，确认当前文档不满足（预期失败）**

Run: `rg "触发条件|外部系统建议处理|totalDistance=-1" docs/plans/2026-03-12-path-planning-score-external-design.md`
Expected: 未完整命中全部异常维度。

**Step 3: 最小实现（补齐异常对照表）**

在文档新增如下结构：

```md
| 场景 | 触发条件 | 前端行为 | 外部系统处理建议 |
| --- | --- | --- | --- |
| 算法运行异常 | solve 抛错 | 无有效路径结果 | 标记“无效提交”并拒绝评分 |
| 空路径 | userPath/path 为空 | 阻断提交 | 回传“路径为空”业务错误 |
| 路程无效 | totalDistance = -1 | 视为无效结果 | 不进入正常评分 |
| 坐标缺失 | waypoints 全部过滤为空 | 不提交有效 planningResult | 返回字段缺失提示 |
```

**Step 4: 再次校验（预期通过）**

Run: `rg "场景 \| 触发条件 \| 前端行为 \| 外部系统处理建议" docs/plans/2026-03-12-path-planning-score-external-design.md`
Expected: 命中异常对照表表头。

**Step 5: Commit**

```bash
git add docs/plans/2026-03-12-path-planning-score-external-design.md
git commit -m "docs(path-planning): document exception handling matrix"
```

### Task 3: 增加版本化与对接验收流程

**Files:**
- Modify: `docs/plans/2026-03-12-path-planning-score-external-design.md`
- Create: `docs/plans/2026-03-12-path-planning-score-external-checklist.md`

**Step 1: 写“失败校验标准”（先定义验收）**

先定义交付门槛：
- 有文档版本号与变更记录区块。
- 有外部系统上线前验收清单（字段、顺序、异常、评分回填）。

**Step 2: 运行校验，确认当前不满足（预期失败）**

Run: `rg "版本|变更记录|验收清单" docs/plans/2026-03-12-path-planning-score-external-design.md`
Expected: 至少缺少一项。

**Step 3: 最小实现（新增版本区块与清单）**

在设计文档增加：

```md
## 文档版本
- v1.0.0 (2026-03-12): 首版发布，定义现有计算与提交口径。
```

新建清单文档：

```md
# 路径规划对外对接验收清单
- [ ] 字段完整：totalDistance/waypoints/sequence
- [ ] 顺序正确：按 sequence 可复原路径
- [ ] 异常一致：空路径、-1、缺字段处理一致
- [ ] 评分回填：消费后端评分字段而非前端自算
```

**Step 4: 再次校验（预期通过）**

Run: `rg "v1.0.0|评分回填" docs/plans/2026-03-12-path-planning-score-external-design.md docs/plans/2026-03-12-path-planning-score-external-checklist.md`
Expected: 命中版本号与清单关键项。

**Step 5: Commit**

```bash
git add docs/plans/2026-03-12-path-planning-score-external-design.md docs/plans/2026-03-12-path-planning-score-external-checklist.md
git commit -m "docs(path-planning): add versioning and external integration checklist"
```

### Task 4: 回归验证与交付说明

**Files:**
- Modify: `docs/plans/2026-03-12-path-planning-score-external.md`
- Reference: `docs/plans/2026-03-12-path-planning-score-external-design.md`
- Reference: `docs/plans/2026-03-12-path-planning-score-external-checklist.md`

**Step 1: 写“失败校验标准”（先定义验收）**

定义交付完成标准：
- 计划文档标记每个任务状态。
- 对外可直接发送的交付路径与使用顺序清晰。

**Step 2: 运行校验，确认当前状态不完整（预期失败）**

Run: `rg "Task [0-9]+:|交付顺序|完成标准" docs/plans/2026-03-12-path-planning-score-external.md`
Expected: 存在未补充的执行结果记录。

**Step 3: 最小实现（补充执行备注与交付顺序）**

在实现计划末尾追加：

```md
## 交付顺序
1. 先交付 design 文档（规则与契约）
2. 再交付 checklist（联调验收）
3. 最后通知后端/外部系统按 checklist 逐项签收
```

**Step 4: 再次校验（预期通过）**

Run: `rg "交付顺序|逐项签收" docs/plans/2026-03-12-path-planning-score-external.md`
Expected: 命中新增交付说明。

**Step 5: Commit**

```bash
git add docs/plans/2026-03-12-path-planning-score-external.md
git commit -m "docs(path-planning): finalize external handoff plan"
```
