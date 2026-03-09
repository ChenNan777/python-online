# 考试挑战页面可读性重构 Spec

## Why
当前考试页面（`ExamChallengePage`）同时承载路由解析、作业/历史/场景查询、编辑器引导、自动保存、提交组装等多段逻辑，可读性偏低且后续维护成本高。本次目标是在不改变对外行为与接口交互的前提下，重构代码组织，让逻辑更线性、更容易理解与修改。

## What Changes
- 拆分 `ExamChallengePage` 内的“派生数据/副作用/业务动作”逻辑，收敛到更清晰的结构（局部 helper 或页面私有 hooks）。
- 将“代码引导（bootstrap）+ 防覆盖保护（bootstrapKey）”逻辑封装为独立单元，明确输入与输出。
- 将“自动保存（防抖）”逻辑封装为独立单元，减少 `useEffect` 内部嵌套与条件分支。
- 将“提交作业（定位/路径规划分支）”逻辑拆分为更易读的流程（校验 -> 必要保存 -> 构建 payload -> 提交 -> 提示）。
- 统一命名与变量分组（例如 `records`、`roadScene`、`positioningScene`、`operationType/workType`），使其表达更直接。
- 为关键业务逻辑块添加明确注释（为什么需要该步骤、关键约束是什么），注释以“读者无需跳转文件也能理解”为目标。
- 仅调整代码组织与可读性：不新增功能、不改变 UI 展示、不更改接口契约。

## Impact
- Affected specs: 考试工作区代码编辑与提交流程、历史代码恢复流程、定位/路径规划场景加载与提交分支。
- Affected code:
  - `src/pages/ChallengePage/ExamChallengePage.tsx`
  - （可能新增/调整）`src/pages/ChallengePage/hooks/*`（页面私有 hooks）
  - （可能调整）`src/pages/ChallengePage/adapters/examChallengeAdapter.ts`

## ADDED Requirements
无（本次为重构，不新增用户可见能力）。

## MODIFIED Requirements

### Requirement: 考试页面逻辑更易理解
系统 SHALL 以更清晰的职责边界组织考试页面代码，使读者能够按“数据来源 -> 派生数据 -> 副作用 -> 用户动作（恢复/提交）-> 渲染”顺序阅读并理解。

#### Scenario: 关键逻辑具备明确注释
- **WHEN** 读者阅读页面代码
- **THEN** 下列逻辑块旁必须有简短明确的中文注释说明其目的/约束：
  - 路由题型解析与 challenge 选择
  - bootstrapKey 的防覆盖意图与触发条件
  - 自动保存的触发条件与防抖原因
  - 定位场景数据来源优先级（接口数据 vs fallback）
  - 提交流程的“先保存再提交”原因与两类题型分支校验点

#### Scenario: 代码引导与自动保存流程保持一致
- **WHEN** 页面加载完成并拿到题目/作业/历史记录
- **THEN** 编辑器初始代码与当前代码以“最新历史代码或 starterCode”为准
- **AND** 不会因重复触发 effect 而覆盖用户已编辑但未保存的内容（bootstrapKey 语义保持不变）
- **AND** 自动保存仍为防抖保存，且在作业信息未就绪/历史加载中不会触发

#### Scenario: 提交作业分支保持一致
- **WHEN** 用户点击“提交作业”
- **THEN** 若存在未保存编辑，提交前会补一次保存
- **AND** 定位题在缺少定位结果或 targetId 时阻止提交并提示
- **AND** 路径规划题在缺少有效路径数据时阻止提交并提示
- **AND** 成功/失败提示语义保持一致

## REMOVED Requirements
无。
