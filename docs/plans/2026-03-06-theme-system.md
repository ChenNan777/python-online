# Theme System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为现有亮色站点增加可持久化的全局主题切换能力，首期提供 `light` 与 `dark-tech` 两套主题，并让 Ant Design、Monaco 与主要页面容器跟随主题变化。

**Architecture:** 通过新增全局主题 store 管理 `themeId`，在根节点写入 `data-theme`，并用 `src/styles/modules/theme.scss` 提供语义化 CSS token。业务样式优先消费 token；Ant Design 与 Monaco 通过集中适配层跟随当前主题，避免在页面内散落硬编码判断。

**Tech Stack:** React 18、TypeScript、Zustand、SCSS、Ant Design、Monaco Editor、Vite。

---

### Task 1: 建立主题状态与持久化

**Files:**
- Create: `src/store/useThemeStore.ts`
- Modify: `src/main.tsx`

**Step 1: 定义最小主题类型**

在 `src/store/useThemeStore.ts` 定义：

- `ThemeId = "light" | "dark-tech"`
- `THEME_STORAGE_KEY`
- `isThemeId(value)` 这类安全判断函数

**Step 2: 实现主题 store**

实现最小 store 能力：

- `themeId`
- `setTheme(themeId)`
- `loadFromStorage()`
- `applyTheme(themeId)`

其中 `applyTheme(themeId)` 负责写入：

- `document.documentElement.dataset.theme = themeId`

**Step 3: 接入启动流程**

在 `src/main.tsx` 中，渲染前调用主题初始化逻辑，确保首屏加载时主题已写入 DOM。

**Step 4: 处理异常回退**

读取 `localStorage` 失败或值非法时回退到 `light`。

**Step 5: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: 无 TypeScript 错误。

### Task 2: 扩展全局主题 token

**Files:**
- Modify: `src/styles/modules/theme.scss`
- Modify: `src/index.css`

**Step 1: 建立语义 token**

在 `src/styles/modules/theme.scss` 中定义两套主题：

- `:root[data-theme="light"]`
- `:root[data-theme="dark-tech"]`

至少覆盖以下 token：

- `--bg-app`
- `--bg-panel`
- `--bg-elevated`
- `--text-primary`
- `--text-secondary`
- `--border-default`
- `--accent-primary`
- `--accent-soft`
- `--shadow-panel`
- `--glow-accent`

**Step 2: 接管基础页面背景和文本**

在 `src/index.css` 中让 `html`、`body`、`#root` 使用主题 token，而不是写死亮色背景。

**Step 3: 保留现有动画逻辑**

不要重写路径动画逻辑，仅在必要时让阴影或描边颜色读取 token。

**Step 4: 运行校验**

Run: `npm run lint`

Expected: 样式相关改动不引入 lint 问题。

### Task 3: 接入 Ant Design 全局主题

**Files:**
- Modify: `src/main.tsx`
- Create or Modify: `src/utils/theme.ts`

**Step 1: 抽出主题映射工具**

在 `src/utils/theme.ts` 中提供：

- 主题元数据
- Ant Design token/algorithm 映射
- Monaco theme 映射

**Step 2: 用 `ConfigProvider` 包裹根应用**

在 `src/main.tsx` 根部加入 `ConfigProvider`，让 Ant Design 组件跟随 `themeId`。

**Step 3: 最小化首期 token 定制**

优先调整：

- 主色
- 背景色
- 文本色
- 边框色
- 圆角

避免首期过度微调所有组件 token。

**Step 4: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: 根渲染和主题工具类型正常。

### Task 4: 统一 Monaco 主题切换

**Files:**
- Modify: `src/pages/DebuggerPage/index.tsx`
- Modify: `src/pages/ChallengePage/index.tsx`
- Modify: `src/components/ContextCodeModal.tsx`
- Modify: `src/components/EditorX/EditorSurface.tsx`
- Modify: `src/components/EditorX/EditorX.tsx`（如需要）

**Step 1: 搜索并收口硬编码主题**

把页面或组件内写死的 `theme="vs"` 改为读取统一主题映射。

**Step 2: 保持现有编辑器行为不变**

仅替换主题来源，不修改断点、运行、hover、快捷键等逻辑。

**Step 3: 统一映射规则**

- `light -> vs`
- `dark-tech -> vs-dark`

**Step 4: 运行校验**

Run: `npm run lint`

Expected: 编辑器相关文件无 lint 报错。

### Task 5: 加入主题切换 UI

**Files:**
- Modify: `src/pages/DashboardPage/index.tsx`
- Create: `src/components/ThemeSwitcher.tsx`

**Step 1: 新增切换组件**

创建 `src/components/ThemeSwitcher.tsx`，提供 `light` / `dark-tech` 选择能力。

推荐使用能兼容未来多主题的控件，例如：

- `Segmented`
- `Select`

**Step 2: 挂载到高可见位置**

优先挂在 `DashboardPage` 的顶部区域，确保用户可发现并可验证。

**Step 3: 确保切换即时生效**

切换后应立即写入 store、DOM 和 `localStorage`。

**Step 4: 运行校验**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: 组件 props 与主题状态类型正确。

### Task 6: 覆盖高可见页面容器样式

**Files:**
- Modify: `src/pages/LoginPage/index.tsx`
- Modify: `src/pages/LoginPage/LoginPage.css`
- Modify: `src/pages/DashboardPage/index.tsx`
- Modify: `src/pages/DashboardPage/DashboardPage.css`
- Modify: `src/pages/DebuggerPage/index.tsx`
- Modify: `src/pages/ChallengePage/index.tsx`
- Modify: `src/App.css`（如有全局容器样式依赖）

**Step 1: 先改容器层**

优先让页面背景、卡片背景、基础文本、边框和分割线跟随 token。

**Step 2: 再改高频交互元素**

处理按钮、标签、面板标题、激活态、输入框周边容器等高可见元素。

**Step 3: 控制科技风强度**

只在主按钮、焦点边框、面板边缘增加轻微发光或高亮，不做满屏重特效。

**Step 4: 手动检查**

检查以下页面在两套主题下的观感：

- 登录页
- Dashboard
- Debugger
- Challenge

### Task 7: 处理公共面板与零散硬编码颜色

**Files:**
- Modify: `src/components/*.tsx`（按实际命中范围最小修改）
- Modify: `src/styles/modules/*.scss`（如需要）

**Step 1: 搜索硬编码颜色**

搜索明显的颜色字面量、亮色背景、深色文字写死场景，优先处理高频组件。

**Step 2: 替换为 token**

将这些颜色逐步替换为语义 token，避免引入新的主题分支判断。

**Step 3: 保持范围可控**

只修复主题切换中明显失衡的组件，不做与当前目标无关的视觉重构。

### Task 8: 完整验证与收尾

**Files:**
- Modify: `AGENTS.md`（仅在新增了稳定主题开发命令或约定时）

**Step 1: 运行类型检查**

Run: `npx tsc -p tsconfig.app.json --noEmit`

Expected: PASS

**Step 2: 若改动了 `vite.config.ts` 则补 Node 类型检查**

Run: `npx tsc -p tsconfig.node.json --noEmit`

Expected: PASS

**Step 3: 运行 lint**

Run: `npm run lint`

Expected: PASS

**Step 4: 运行构建**

Run: `npm run build`

Expected: PASS

**Step 5: 手动验收清单**

确认：

- 主题切换即时生效
- 刷新后主题保持
- Ant Design 组件视觉一致
- Monaco 跟随主题变化
- 主要页面文字对比度足够
- 未出现明显白底白字或黑底黑字问题

### Task 9: 文档补充（可选）

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/plans/2026-03-06-theme-system-design.md`

**Step 1: 更新开发说明**

如果最终实现中新增了稳定约定，例如主题 store 文件位置、主题 token 命名规则，可补充到 `AGENTS.md`。

**Step 2: 回写设计偏差**

如果实现与设计文档存在必要偏差，在设计文档末尾补充实际落地说明。
