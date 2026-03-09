# Tasks
- [x] Task 1: 梳理页面职责边界并锁定“不改行为”基线
  - [x] 列出关键行为点：重定向条件、bootstrapKey 语义、自动保存条件、恢复历史确认、提交分支校验与提示
  - [x] 标注可安全重构的区域与禁止调整的区域（接口契约、UI 文案、payload 结构）

- [x] Task 2: 抽离代码引导（bootstrap）逻辑到页面私有单元
  - [x] 提供统一入口：输入 challenge/assignment/records/loading 状态，输出 initialCode/currentCode/lastSavedCode 的初始化更新时机
  - [x] 保持 bootstrapKey 的防覆盖语义不变

- [x] Task 3: 抽离自动保存（防抖）逻辑到页面私有单元
  - [x] 明确触发条件：assignment 就绪 + 非 loading + currentCode 变化 + 与 lastSavedCode 不同
  - [x] 保持保存成功后更新 lastSavedCode 的行为

- [x] Task 4: 重构提交逻辑为线性流程并降低分支噪音
  - [x] 提交前保存补偿独立成步骤
  - [x] 将定位/路径规划分支的校验与 payload 构建明确分层（校验失败直接返回）
  - [x] 确保错误处理与提示语义不变

- [x] Task 5: 调整组件内部结构与命名以提升可读性
  - [x] 将派生数据、effect、handlers、render props 分块组织
  - [x] 维持现有 JSX 结构与交互一致（仅做结构整理与命名优化）

- [x] Task 6: 为关键业务逻辑补充明确注释
  - [x] 为题型解析、bootstrapKey、自动保存、场景 fallback、提交分支添加简短中文注释
  - [x] 注释聚焦“为什么/约束”，避免逐行翻译代码

- [x] Task 7: 验证与回归
  - [x] `npm run lint` 通过
  - [x] `npm run build` 通过（若当前仓库基线可通过）；否则确保不引入新增构建错误
  - [x] 人工回归：历史代码恢复、自动保存提示、两类题型提交校验与成功提示

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 1
- Task 5 depends on Task 2, Task 3, Task 4
- Task 6 depends on Task 5
- Task 7 depends on Task 6
