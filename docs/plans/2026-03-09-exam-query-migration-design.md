# 考试页 TanStack Query 迁移设计

**目标**

- 将考试页相关请求迁移到 TanStack Query。
- 优先解决 `assignment-info` 重复请求、请求状态分散和手写异步链过重的问题。
- 保持练习模式、Dashboard 和其他模块不受影响。

## 迁移范围

- 仅迁移考试页相关请求：
  - `assignment-info`
  - 历史代码查询
  - 保存代码
  - 提交作业
  - 后续定位分析场景接口预留
- 不迁移：
  - Dashboard 刷新任务
  - 登录态相关请求
  - 练习模式本地逻辑

## 方案结论

- 采用 TanStack Query 覆盖考试页“读 + 写”请求。
- `query` 负责读请求与缓存、去重、失效。
- `mutation` 负责保存与提交。
- 页面只保留本地 UI 状态，不再手写整条请求生命周期。

## 结构设计

- 在 `src/AppRoot.tsx` 顶层增加 `QueryClientProvider`。
- 在 `src/pages/ChallengePage/queries/` 下组织考试页请求逻辑：
  - `useAssignmentInfoQuery`
  - `useExamHistoryQuery`
  - `useExamSceneQuery`（预留）
  - `useSaveCodeMutation`
  - `useSubmitWorkMutation`
- `ExamChallengePage` 只组合 query / mutation 结果，并保留 UI 层状态。

## Query Key 设计

### assignment-info

- `['exam-assignment', userId, operationType]`
- 以“用户 + 作业类型”唯一标识当前考试作业。

### history

- `['exam-history', taskId, memberId]`
- 以“任务 + 学生”唯一标识历史代码列表。

### scene

- 路径规划先从 `assignment-info` 派生，不强制拆成独立 query。
- 定位分析后续场景接口预留：`['exam-positioning-scene', targetId]`

## 触发策略

### assignment-info

- `enabled: userId != null`
- 设置适度 `staleTime`，避免短时间重复进入页面重复请求。

### history

- 依赖 `assignment-info` 成功后启用。
- `enabled: !!taskId && !!memberId`

### scene

- 依赖 `targetId` 启用。
- 当前先只预留结构。

### saveCode

- 使用 `useMutation`。
- 页面层保留防抖自动保存逻辑。
- 对相同代码内容增加跳过策略，避免重复保存。

### submit

- 使用 `useMutation`。
- 成功后失效历史代码 query。
- 必要时可额外失效 `assignment-info`。

## 状态边界

### Query / Mutation 管理

- `data`
- `isLoading`
- `isFetching`
- `error`
- `isPending`
- 缓存和失效

### 页面保留状态

- `historyOpen`
- `initialCode`
- `currentCode`
- 自动保存定时器 / 防抖状态
- 历史代码恢复确认状态

## 对现有代码的影响

- `ExamChallengePage` 中手写的首屏 `useEffect` 请求链会被 query 组合替代。
- `useExamAssignment` / `useExamHistory` 将从“状态型 hook”收敛为：
  - 被 query/mutation 替代
  - 或保留为纯请求函数封装
- 页面不再自行维护 `loading/error/savePending/submitPending` 等重复状态。

## 重复请求问题的处理方式

- 开发模式下 `React.StrictMode` 会导致 effect 双执行。
- 将 `assignment-info` 改为 `useQuery` 后，同 key 请求可以通过缓存和请求复用减少重复影响。
- 再配合 `staleTime`，可以显著降低进入页面时的重复拉取抖动。

## 验收标准

- 考试页首屏请求改为 Query 驱动。
- `assignment-info` 和历史代码由 query 获取。
- `saveCode` 和 `submit` 由 mutation 处理。
- 提交成功后历史代码自动刷新。
- 页面删除大部分手写请求状态与串行初始化逻辑。
- `npm run lint` 和 `npm run build` 通过。
