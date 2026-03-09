# 考试模块注释补齐 Design

## 目标

在不改变考试模块行为的前提下，为关键但不显然的逻辑补充简短中文注释，提升后续 agent 和人工维护者的理解速度。

## 范围

- `src/pages/ChallengePage/ExamChallengePage.tsx`
- `src/pages/ChallengePage/adapters/examChallengeAdapter.ts`
- `src/pages/ChallengePage/queries/*.ts`

## 方案

- 只注释关键约束、fallback、数据依赖和副作用时机。
- 不逐行翻译代码，不给显然的 getter / import / JSX 结构加噪音注释。
- 注释统一使用简短中文，重点解释“为什么这样做”。

## 不做的事

- 不修改练习模式逻辑。
- 不重构 query 结构。
- 不补充与当前考试流无关的页面说明。
