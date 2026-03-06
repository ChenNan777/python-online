# Project Architecture Refactor Mapping (2026-03-06)

本文档记录 `ChallengePage` 的职责迁移关系，便于代码审查、问题定位与后续维护。

## 迁移总览

| 原位置 | 新位置 | 职责说明 |
| --- | --- | --- |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/domain/pathfindingSetup.ts` | 路网调试上下文拼装（节点/边/坐标映射）。 |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/domain/positioningSetup.ts` | 定位挑战上下文拼装（站点/路径/定位参数）。 |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/domain/escapeJsonForPyString.ts` | Python 字符串安全转义，避免重复实现。 |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/hooks/useEditorDecorations.ts` | Monaco 装饰、断点切换、悬浮高亮与错误行提示。 |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/hooks/useChallengeContextCode.ts` | 统一上下文拼装入口，按挑战类型生成最终上下文代码。 |
| `src/pages/ChallengePage/index.tsx` | `src/pages/ChallengePage/components/RunControls.tsx` | 运行/继续/单步/停止控制区渲染。 |

## 入口收敛策略

- `index.tsx` 保留页面编排职责：路由、状态组装、运行时调用和布局。
- 纯逻辑下沉到 `domain/`，避免页面文件继续膨胀。
- 视图片段与交互控件下沉到 `components/`，减少页面 JSX 噪音。
- 可复用交互逻辑下沉到 `hooks/`，保障状态来源单一。

## 本轮额外清理

- 移除 `editorRef.current.setValue(...)` 与 `setCode(...)` 的双写路径。
- 统一以 store 中 `code` 作为编辑器内容单一真源，降低状态不一致风险。
