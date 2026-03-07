# Student Assignment Exam Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将挑战页拆分为练习容器与考试容器，并为考试模式接入学生作业、历史代码和后端场景数据装配能力。

**Architecture:** 保留共享编辑器工作区，拆分 `PracticeChallengePage` 与 `ExamChallengePage` 负责不同数据域。练习容器继续消费本地题库，考试容器通过 adapter / hooks 把学生作业接口和考试场景转换成统一工作区模型。定位分析场景统一为按站点 ID 合并后的结构，路径规划和地图测试点位也统一从容器层装配。

**Tech Stack:** React 18, TypeScript, Vite, Ant Design, Zustand, Axios, Monaco Editor, Pyodide

---

### Task 1: 梳理并抽取共享工作区输入模型

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx`
- Create: `src/pages/ChallengePage/types.ts`
- Create: `src/pages/ChallengePage/components/ChallengeWorkspace.tsx`

**Step 1: 定义工作区输入类型**

在 `src/pages/ChallengePage/types.ts` 中定义统一工作区模型，至少包含 challenge 元信息、初始代码、测试数据、场景数据、调试开关与考试模式扩展动作。

**Step 2: 抽出共享工作区组件**

把当前 `src/pages/ChallengePage/index.tsx` 的编辑器、运行控制、右侧面板、结果展示与地图可视化搬到 `ChallengeWorkspace`。

**Step 3: 用最小改动接回现有逻辑**

让旧页面先只作为容器把原有本地数据传给 `ChallengeWorkspace`，确保 UI 行为不变。

**Step 4: 运行 lint / build 验证工作区抽取未破坏现有功能**

Run: `npm run lint`
Expected: 通过或仅出现与本次改动无关的历史问题

Run: `npm run build`
Expected: 构建通过

### Task 2: 创建练习容器并保持现有能力

**Files:**
- Create: `src/pages/ChallengePage/PracticeChallengePage.tsx`
- Modify: `src/pages/ChallengePage/challenges.ts`
- Modify: `src/pages/ChallengePage/domain/index.ts`
- Modify: `src/pages/ChallengePage/hooks/useChallengeContextCode.ts`

**Step 1: 创建练习容器**

新增 `PracticeChallengePage`，负责从 `challenges.ts` 装配本地题目、测试数据与本地场景。

**Step 2: 把本地定位分析数据装配为统一场景模型**

在本地 adapter 中把 `stations` 和 `measurements` 通过 `stationId -> id` 进行合并，生成统一的定位场景结构。

**Step 3: 调整上下文代码装配逻辑**

让 `useChallengeContextCode` 优先消费统一场景模型，而不是散落依赖不同原始数据来源。

**Step 4: 验证练习模式功能不变**

Run: `npm run build`
Expected: 构建通过，练习模式仍可运行与调试

### Task 3: 创建考试容器与考试数据模型

**Files:**
- Create: `src/pages/ChallengePage/ExamChallengePage.tsx`
- Create: `src/pages/ChallengePage/adapters/examChallengeAdapter.ts`
- Create: `src/pages/ChallengePage/hooks/useExamAssignment.ts`
- Create: `src/pages/ChallengePage/hooks/useExamHistory.ts`
- Modify: `src/pages/ChallengePage/types.ts`

**Step 1: 定义考试模式扩展类型**

补充考试模式需要的作业信息、保存状态、提交状态、历史代码和场景加载状态类型。

**Step 2: 创建考试 adapter**

在 `examChallengeAdapter.ts` 中把后端作业 DTO 转换成统一工作区模型，并预留定位分析 `targetId -> 场景接口` 的二段式装配入口。

**Step 3: 创建作业 hook**

在 `useExamAssignment.ts` 中封装 `assignment-info`、`saveCode`、`submit` 调用，并提供 `workType` 映射：定位分析 `4`、路径规划 `5`。

**Step 4: 创建历史代码 hook**

在 `useExamHistory.ts` 中封装历史代码列表获取、预览与恢复逻辑。

### Task 4: 接入学生作业接口与自动保存

**Files:**
- Modify: `src/services/admin/xueshengxunlianzuoyeguanli.ts`
- Modify: `src/pages/ChallengePage/hooks/useExamAssignment.ts`
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`

**Step 1: 复用现有 openapi 生成接口**

直接使用：
- `studentOperationCodeAssignmentInfoUsingGet`
- `studentOperationCodeSaveCodeUsingPost`
- `studentOperationCodeSubmitUsingPost`
- `studentOperationCodeListStudentTaskIdMemberIdUsingGet`

**Step 2: 实现考试模式初始化**

进入考试页时拉取当前作业信息，并在条件满足时拉取历史代码列表与考试场景。

**Step 3: 实现防抖自动保存**

在考试容器监听代码变化，加入防抖保存与保存失败状态。

**Step 4: 实现提交前兜底保存**

点击提交时先执行一次显式保存，再调用统一 `submit`。

### Task 5: 增加历史代码查看与恢复入口

**Files:**
- Create: `src/pages/ChallengePage/components/ExamHistoryModal.tsx`
- Modify: `src/pages/ChallengePage/components/ChallengeWorkspace.tsx`
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`

**Step 1: 创建历史代码弹窗**

展示历史代码列表、时间、语言、说明和代码预览。

**Step 2: 提供恢复动作**

点击恢复时，若当前代码有未保存修改则先确认，再把历史 `sourceCode` 回填编辑器。

**Step 3: 仅考试模式显示入口**

在共享工作区暴露可选 action 插槽，由考试容器传入“历史代码”入口。

### Task 6: 拆分页面入口与路由分发

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx`
- Modify: `src/constants/routes.ts`
- Modify: `src/App.tsx`

**Step 1: 让现有入口页只负责分发**

保留 `ChallengePage` 作为薄入口，根据是否练习路由分发到 `PracticeChallengePage` 或 `ExamChallengePage`。

**Step 2: 清理共享工作区中的模式判断**

把考试专属逻辑从工作区中移出，避免继续积累 `isPracticeRoute` 分支。

**Step 3: 验证路由行为**

Run: `npm run build`
Expected: 练习路由和考试路由都能正确进入对应容器

### Task 7: 接入地图与定位场景双来源模型

**Files:**
- Modify: `src/pages/ChallengePage/PracticeChallengePage.tsx`
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`
- Modify: `src/pages/ChallengePage/domain/pathfindingSetup.ts`
- Modify: `src/pages/ChallengePage/domain/positioningSetup.ts`
- Modify: `src/pages/ChallengePage/hooks/useChallengeContextCode.ts`

**Step 1: 统一路径规划场景输入**

让工作区只消费标准化路网、测试点位和附加信息，不关心它们是本地资源还是接口返回。

**Step 2: 统一定位分析场景输入**

让工作区只消费按 ID 合并后的定位场景数据。

**Step 3: 预留考试定位场景接口缺口**

当后端尚未提供 `targetId` 场景接口时，在考试容器中提供明确占位状态与错误提示，不在工作区内部兜底伪造数据。

### Task 8: 验证并补充文档

**Files:**
- Modify: `docs/plans/2026-03-07-student-assignment-exam-design.md`
- Modify: `src/pages/ChallengePage/ExamChallengePage.tsx`
- Modify: `src/pages/ChallengePage/PracticeChallengePage.tsx`

**Step 1: 运行类型与 lint 验证**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: 类型检查通过

Run: `npm run lint`
Expected: lint 通过或仅存在与本次无关的历史问题

**Step 2: 运行生产构建**

Run: `npm run build`
Expected: 构建通过

**Step 3: 回写实现结果**

若实现中有与设计不同的地方，补写回设计文档，保证文档与代码一致。
