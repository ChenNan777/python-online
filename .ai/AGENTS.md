# Python Online Debugger - 代码规范与开发指南

本文档为 AI 编码助手提供项目规范，包括构建命令、代码风格、命名约定等。

## 项目概述

这是一个基于 React + TypeScript + Vite 的在线 Python 调试器，使用 Pyodide 在浏览器中运行 Python 代码，支持断点调试、变量查看等功能。

## 构建与开发命令

### 开发服务器
```bash
npm run dev
```
启动 Vite 开发服务器，支持热更新。服务器配置了 COOP/COEP 头以支持 SharedArrayBuffer（Pyodide 需要）。

### 构建
```bash
npm run build
```
先执行 TypeScript 类型检查（`tsc -b`），再执行 Vite 构建。构建产物输出到 `dist/` 目录。

### 代码检查
```bash
npm run lint
```
运行 ESLint 检查所有 `.ts` 和 `.tsx` 文件。

### 预览构建
```bash
npm run preview
```
预览生产构建结果。

### 注意事项
- 本项目暂无测试框架，不支持单元测试命令
- 开发服务器需要特殊的 HTTP 头支持 Pyodide，请勿修改 `vite.config.ts` 中的 `server.headers` 配置

## 技术栈

- **框架**: React 18.3.1
- **语言**: TypeScript 5.9.3 (strict 模式)
- **构建工具**: Vite 7.3.1
- **状态管理**: Zustand 4.4.3
- **UI 组件**: Ant Design 5.9.3
- **样式**: Tailwind CSS 4.1.18 + SCSS
- **代码编辑器**: Monaco Editor 0.55.1
- **Python 运行时**: Pyodide 0.29.3
- **路由**: React Router DOM 7.13.1

## 项目结构

```
src/
├── components/       # 通用 UI 组件
├── pages/           # 页面级组件
├── features/        # 功能模块（如 pythonRunner）
├── store/           # Zustand 状态管理
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── worker/          # Web Worker（Pyodide 运行在 Worker 中）
├── monaco/          # Monaco Editor 配置
├── styles/          # 全局样式
└── assets/          # 静态资源
```

## 代码风格指南

### TypeScript 配置
- 启用 `strict` 模式
- 使用 `ESNext` 目标和模块系统
- 路径别名：`@/*` 映射到 `src/*`
- 禁止 `allowJs`，所有代码必须是 TypeScript

### 导入顺序
按以下顺序组织导入，各组之间空一行：

1. React 相关导入
2. 第三方库导入（按字母顺序）
3. 本地模块导入（使用 `@/` 别名）
4. 类型导入（使用 `type` 关键字）
5. 样式文件导入

示例：
```typescript
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { Play, Stop } from "lucide-react";

import { usePythonStore } from "@/store/usePythonStore";
import { usePyodideWorker } from "@/features/pythonRunner";
import type { Breakpoint, VariableScope } from "@/types";

import "./App.css";
```

### 命名约定

#### 文件命名
- **组件文件**: PascalCase，如 `App.tsx`, `RightPanelStack.tsx`
- **Hook 文件**: camelCase，前缀 `use`，如 `usePythonStore.ts`, `usePyodideWorker.ts`
- **工具函数**: camelCase，如 `generateGraph.ts`, `generatePositioning.ts`
- **类型文件**: camelCase，通常命名为 `index.ts` 或 `types.ts`
- **Worker 文件**: camelCase，后缀 `.worker.ts`

#### 变量和函数命名
- **组件**: PascalCase，如 `function RunControls() {}`
- **函数/变量**: camelCase，如 `const handleClick = () => {}`
- **常量**: UPPER_SNAKE_CASE，如 `const CODE_TEMPLATES = []`
- **类型/接口**: PascalCase，如 `type RunStatus`, `interface PythonState`
- **私有变量**: 使用 `Ref` 后缀表示 ref，如 `editorRef`, `monacoRef`

### 类型定义
- 优先使用 `type` 而非 `interface`（除非需要扩展）
- 所有类型定义集中在 `src/types/index.ts`
- 组件特定类型可定义在组件文件或同目录的 `types.ts`
- 使用 `type` 关键字导入类型：`import type { Breakpoint } from "@/types"`

### React 组件规范

#### 组件结构
```typescript
// 1. 导入
import { useState } from "react";
import type { FC } from "react";

// 2. 类型定义
type Props = {
  value: string;
  onChange: (value: string) => void;
};

// 3. 组件定义（优先使用函数声明）
function MyComponent(props: Props) {
  // 4. Hooks（按顺序：状态、副作用、回调）
  const [state, setState] = useState("");
  
  useEffect(() => {
    // ...
  }, []);
  
  const handleChange = useCallback(() => {
    // ...
  }, []);
  
  // 5. 渲染
  return <div>{props.value}</div>;
}

// 6. 导出
export default MyComponent;
```

#### Hooks 使用
- 使用 Zustand 进行全局状态管理
- 使用 `useCallback` 包裹传递给子组件的函数
- 使用 `useMemo` 缓存计算结果
- 自定义 Hook 必须以 `use` 开头

### 样式规范
- 优先使用 Tailwind CSS 工具类
- 使用 Ant Design 组件的内置样式
- 复杂样式使用 CSS/SCSS 文件
- Tailwind 类名使用 `clsx` 或 `tailwind-merge` 组合
- 使用 `!` 后缀强制覆盖样式（如 `h-12!`）

### 错误处理
- 使用 Ant Design 的 `message` API 显示用户提示
- 使用 Monaco Editor 的 `setModelMarkers` API 显示代码错误
- Worker 错误通过 postMessage 传递到主线程处理
- 避免使用 `console.error`，优先使用 UI 提示

### 注释规范
- 使用中文注释
- 复杂逻辑必须添加注释说明
- 组件顶部添加功能说明（如有必要）
- 使用 JSDoc 注释导出的公共 API

示例：
```typescript
// Monaco Editor 实例，便于后续操作编辑器
const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

/**
 * 在编辑器中显示运行时错误
 * @param args 错误信息，包含消息、行号、文件名
 */
const showEditorRunError = useCallback((args: {
  message: string;
  lineno?: number | null;
  filename?: string;
}) => {
  // ...
}, []);
```

### 代码格式
- 使用双引号（字符串）
- 使用分号结尾
- 缩进：2 空格
- 行尾不留空格
- 文件末尾保留一个空行
- 对象/数组最后一项保留尾逗号

## 特定模块规范

### Zustand Store
- Store 定义在 `src/store/` 目录
- 使用 `createWithEqualityFn` 创建 store
- 使用 `shallow` 比较避免不必要的重渲染
- State 和 Actions 分组定义在同一个接口

### Worker 通信
- Worker 文件放在 `src/worker/` 目录
- 使用 TypeScript 定义消息协议（见 `debugProtocol.ts`）
- 主线程通过 `postMessage` 发送命令
- Worker 通过 `postMessage` 返回结果或事件

### Monaco Editor
- 配置代码放在 `src/monaco/setupMonaco.ts`
- 使用 `@monaco-editor/react` 包装器
- 自定义装饰（断点、当前行）使用 `deltaDecorations` API
- 错误标记使用 `setModelMarkers` API

## 常见任务

### 添加新组件
1. 在 `src/components/` 或 `src/pages/` 创建 `.tsx` 文件
2. 使用函数声明定义组件
3. 定义 Props 类型
4. 导出组件（通常使用 `export default`）

### 添加新状态
1. 在 `src/store/usePythonStore.ts` 的 `PythonState` 接口添加状态字段
2. 添加对应的 setter 方法
3. 在 store 初始化中设置默认值
4. 在组件中使用 `usePythonStore` 访问

### 添加新类型
1. 在 `src/types/index.ts` 添加类型定义
2. 使用 `export type` 导出
3. 在需要的地方使用 `import type { ... } from "@/types"` 导入

## 注意事项

- **不要修改 Vite 配置中的 COOP/COEP 头**，这是 Pyodide 运行的必要条件
- **不要在主线程运行 Python 代码**，必须在 Worker 中运行
- **Monaco Editor 操作必须在 onMount 后进行**，否则会报错
- **Zustand store 使用 shallow 比较**，避免在组件中解构 store
- **路径别名 `@/` 仅在 TypeScript 和 Vite 中生效**，不要在配置文件中使用
