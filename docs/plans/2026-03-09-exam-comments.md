# Exam Comments Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为考试模块的关键逻辑补充简短中文注释，同时保持行为、接口和 UI 完全不变。

**Architecture:** 仅在考试页面、考试适配层和考试 query/mutation hooks 中补充解释性注释。注释聚焦初始化、自动保存、防误覆盖、fallback 场景、请求启用条件和缓存失效策略。

**Tech Stack:** React 18、TypeScript、TanStack Query、Ant Design、Vite。

---

### Task 1: 页面关键状态注释

**Files:**
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`

**Step 1: 标注初始化与自动保存意图**

- 为 bootstrap key、自动保存防抖、定位场景 fallback、历史恢复拦截、提交前补保存添加简短注释。

**Step 2: 自查是否有噪音注释**

- 删除任何只是复述代码字面的注释，保留解释约束和副作用时机的注释。

### Task 2: 适配层与 API 约束注释

**Files:**
- Modify: `src/pages/ChallengePage/adapters/examChallengeAdapter.ts`
- Modify: `src/pages/ChallengePage/queries/examApi.ts`

**Step 1: 标注 fallback 和排序规则**

- 为定位场景 fallback、历史记录时间兜底排序、路径提交优先级添加注释。

**Step 2: 标注前端校验原因**

- 为保存/提交前校验 taskId、memberId、teamId 的原因补注释。

### Task 3: Query Hook 注释

**Files:**
- Modify: `src/pages/ChallengePage/queries/queryKeys.ts`
- Modify: `src/pages/ChallengePage/queries/useAssignmentInfoQuery.ts`
- Modify: `src/pages/ChallengePage/queries/useExamHistoryQuery.ts`
- Modify: `src/pages/ChallengePage/queries/useExamSceneQuery.ts`
- Modify: `src/pages/ChallengePage/queries/useSaveCodeMutation.ts`
- Modify: `src/pages/ChallengePage/queries/useSubmitWorkMutation.ts`

**Step 1: 标注 enabled 与失效策略**

- 为 query 的启用条件、mutation 的缓存失效语义补充注释。

**Step 2: 自查一致性**

- 确认注释语言统一为中文，风格简短直接。

### Task 4: 验证

**Files:**
- Modify: `docs/plans/2026-03-09-exam-comments-design.md`
- Modify: `docs/plans/2026-03-09-exam-comments.md`

**Step 1: 运行最小验证**

Run: `npx eslint src/pages/ChallengePage/ExamChallengePage.tsx src/pages/ChallengePage/adapters/examChallengeAdapter.ts src/pages/ChallengePage/queries/*.ts`

Expected: PASS，无 lint 错误。

**Step 2: 如 lint 通过则准备提交**

Run: `git status --short`

Expected: 仅包含本次注释与计划文档变更。
