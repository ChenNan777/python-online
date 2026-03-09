# Exam Query Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将考试页相关读写请求迁移到 TanStack Query，统一缓存、去重、失效和请求状态管理。

**Architecture:** 在应用根部接入 `QueryClientProvider`，仅对考试页请求层进行迁移。读请求通过 `useQuery` 管理，写请求通过 `useMutation` 管理，`ExamChallengePage` 只组合 query / mutation 结果和本地 UI 状态。

**Tech Stack:** React 18, TypeScript, TanStack Query, Ant Design, Axios

---

### Task 1: 接入 TanStack Query 基础设施

**Files:**
- Modify: `package.json`
- Modify: `src/AppRoot.tsx`
- Create: `src/query/client.ts`

**Step 1: 安装依赖**

Run: `npm install @tanstack/react-query`
Expected: 依赖安装成功并写入 `package.json`

**Step 2: 创建 QueryClient**

在 `src/query/client.ts` 中创建统一 `QueryClient`，配置合理的默认 `staleTime`、`retry` 和 `refetchOnWindowFocus` 策略。

**Step 3: 接入 Provider**

在 `src/AppRoot.tsx` 中增加 `QueryClientProvider`，包裹现有 `BrowserRouter`。

**Step 4: 验证基础接入**

Run: `npm run lint`
Expected: 通过

### Task 2: 抽离考试页请求函数

**Files:**
- Create: `src/pages/ChallengePage/queries/examApi.ts`
- Modify: `src/pages/ChallengePage/hooks/useExamAssignment.ts`
- Modify: `src/pages/ChallengePage/hooks/useExamHistory.ts`

**Step 1: 抽出纯请求函数**

把 `assignment-info`、历史代码、保存代码、提交作业的底层 API 调用整理成纯函数，避免 UI hook 直接持有状态。

**Step 2: 收敛旧 hook 责任**

旧 hook 若保留，只保留参数转换和 payload 构建职责，不再保留 `useState` 状态容器。

### Task 3: 创建考试页 Query Hooks

**Files:**
- Create: `src/pages/ChallengePage/queries/useAssignmentInfoQuery.ts`
- Create: `src/pages/ChallengePage/queries/useExamHistoryQuery.ts`
- Create: `src/pages/ChallengePage/queries/useExamSceneQuery.ts`

**Step 1: 实现 assignment-info query**

- queryKey: `['exam-assignment', userId, operationType]`
- `enabled: userId != null`

**Step 2: 实现 history query**

- queryKey: `['exam-history', taskId, memberId]`
- `enabled: !!taskId && !!memberId`

**Step 3: 预留 scene query**

先定义 queryKey 和 hook 结构，路径规划场景可先由 assignment 派生，定位场景后续按 `targetId` 接入。

### Task 4: 创建考试页 Mutation Hooks

**Files:**
- Create: `src/pages/ChallengePage/queries/useSaveCodeMutation.ts`
- Create: `src/pages/ChallengePage/queries/useSubmitWorkMutation.ts`

**Step 1: 实现 save mutation**

将保存代码迁移为 mutation，返回统一 pending/error 状态。

**Step 2: 实现 submit mutation**

提交成功后失效：
- `['exam-history', taskId, memberId]`
- 必要时失效 `['exam-assignment', userId, operationType]`

### Task 5: 重构 ExamChallengePage

**Files:**
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`

**Step 1: 删除首屏串行 useEffect 请求链**

移除手写 `loadAssignment -> loadHistory` 初始化流程。

**Step 2: 改为 query 组合**

由 `useAssignmentInfoQuery` 和 `useExamHistoryQuery` 驱动页面数据。

**Step 3: 接入 mutation**

自动保存调用 `useSaveCodeMutation`，提交按钮调用 `useSubmitWorkMutation`。

**Step 4: 保留必要本地状态**

保留 `historyOpen`、`initialCode`、`currentCode` 与自动保存防抖逻辑，不再维护重复请求状态。

### Task 6: 清理旧状态与重复逻辑

**Files:**
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`
- Modify: `src/pages/ChallengePage/hooks/useExamAssignment.ts`
- Modify: `src/pages/ChallengePage/hooks/useExamHistory.ts`

**Step 1: 删除重复状态**

移除与 query / mutation 重复的 `loading/error/savePending/submitPending` 等状态。

**Step 2: 保留纯业务转换**

把 `workType`、`operationType`、提交 payload 组装等业务逻辑保留下来，但不要继续混入请求状态。

### Task 7: 验证迁移结果

**Files:**
- Modify: `docs/plans/2026-03-09-exam-query-migration-design.md`

**Step 1: 运行 lint**

Run: `npm run lint`
Expected: 通过

**Step 2: 运行 build**

Run: `npm run build`
Expected: 通过

**Step 3: 手工验证考试页**

- 进入考试页可正常获取 assignment-info
- 历史代码能正常展示
- 自动保存和提交可正常工作
- 提交成功后历史代码刷新

**Step 4: 回写设计文档**

若实现与设计有差异，补充到设计文档。
