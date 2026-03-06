---
name: ui-command-cockpit
description: 生成“科幻蓝色指挥控制台”风格的前端界面与组件。只要用户提到大屏、指挥调度、导调系统、态势面板、科技感中控台、赛博蓝 UI、军工风控制面板，或给出类似截图/Figma 让你还原，就应优先使用本技能。
---

# UI Command Cockpit Skill

## 目标
把用户需求实现为可落地的 React + TypeScript + Tailwind CSS 界面，视觉上贴近“深蓝背景 + 青色发光边框 + 分栏卡片 + 底部操作按钮”的指挥控制台风格。

## 技术栈约束
- **核心框架**: React 18 + TypeScript
- **样式方案**: Tailwind CSS (必须使用)
- **组件规范**: 
  - 优先使用 Tailwind Utility Classes，避免手写 SCSS/CSS。
  - 对于复杂的复用样式（如发光边框），使用 `@apply` 或封装为 React 组件。
  - 保持组件拆分，避免单文件过长。

## 视觉规则 (Figma 精确映射)

### 1. 核心色板
- **主背景**: 深蓝线性渐变 (Figma 原值)
  - 样式: `bg-[linear-gradient(140deg,rgba(0,81,168,0.15)_0%,rgba(0,81,168,0.05)_100%)]`
  - 兜底: 如不支持复杂渐变，使用 `bg-slate-900/90`
- **主强调色**: Cyber Blue
  - 默认: `text-[#00d4ff]`
  - 边框: `border-[rgba(6,196,255,0.3)]` (1.25px 宽)
  - 发光: `shadow-[0px_0px_20px_0px_rgba(6,196,255,0.1)]`
- **文字体系**:
  - 标题 (ANT-002): `text-[#00d4ff] text-[13px] font-medium tracking-[0.65px] font-['Inter']`
  - 状态 (在线): `text-[#0f8] text-[11px]`
  - 辅助 (信号频率): `text-[#8fb2cc] text-[10px]`
  - 数值 (2.4GHz): `text-[#00d4ff] text-[13px] font-medium tracking-[0.325px]`

### 2. 容器风格
- **外层容器**:
  - 边框: `border-[1.25px] border-[rgba(6,196,255,0.3)] rounded-[6px]`
  - 背景: `bg-slate-900` 叠加 `bg-[linear-gradient(...)]`
  - 阴影: `rgb(111 172 219)` (内发光)
- **内嵌容器** (Inner Slot):
  - 背景: `bg-[rgba(6,196,255,0.1)]`
  - 边框: `border-[1.25px] border-[rgba(6,196,255,0.3)] rounded-[6px]`

### 3. 装饰细节 (Gradient Lines)
Figma 中特有的四角/边缘渐变装饰线：
- **顶部渐变线**: `absolute top-0 left-0 w-[32px] h-[2px] bg-gradient-to-r from-[rgba(6,196,255,0.8)] to-transparent`
- **左侧渐变线**: `absolute top-0 left-0 w-[2px] h-[32px] bg-gradient-to-b from-[rgba(6,196,255,0.8)] to-transparent`
- **右下角水平线**: `absolute bottom-[2px] right-[40px] w-[32px] h-[2px] bg-gradient-to-l from-[rgba(6,196,255,0.8)] to-transparent`
- **右下角垂直线**: `absolute bottom-[30px] right-[10px] w-[2px] h-[32px] bg-gradient-to-t from-[rgba(6,196,255,0.8)] to-transparent`

## 布局规则
- **顶部**: `h-16 flex items-center justify-center bg-slate-900/80 border-b border-[#00d4ff]/30`
- **中部主体**: `flex-1 grid grid-cols-12 gap-4 p-4`
  - 左栏 (列表/任务池): `col-span-4 flex flex-col gap-3 overflow-y-auto`
  - 右栏 (编组/详情): `col-span-8 grid grid-cols-2 gap-4 content-start`
- **底部**: `h-20 flex items-center justify-center gap-6 bg-slate-900/90 border-t border-[#00d4ff]/20`

## 组件模式 (Tailwind 实现)

### 1. 科技感容器 (Cockpit Container)
```tsx
<div className="relative w-full h-full border-[1.25px] border-[rgba(6,196,255,0.3)] rounded-[6px] shadow-[0px_0px_20px_0px_rgba(6,196,255,0.1)] overflow-hidden bg-slate-900">
  {/* 背景渐变层 */}
  <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(0,81,168,0.15)_0%,rgba(0,81,168,0.05)_100%)] pointer-events-none" />
  
  {/* 内发光 */}
  <div className="absolute inset-0 shadow-[inset_0px_0px_20px_0px_rgba(77,178,255,0.05)] pointer-events-none rounded-[inherit]" />

  {/* 装饰线 */}
  <div className="absolute top-0 left-0 w-[32px] h-[2px] bg-gradient-to-r from-[rgba(6,196,255,0.8)] to-transparent" />
  <div className="absolute top-0 left-0 w-[2px] h-[32px] bg-gradient-to-b from-[rgba(6,196,255,0.8)] to-transparent" />

  {/* 内容 */}
  <div className="relative z-10 p-4">
    {children}
  </div>
</div>
```

### 2. 状态标签 (Status Badge)
```tsx
<div className="flex items-center gap-2">
  <div className="w-[8px] h-[8px] relative">
     <img src="/assets/circle.svg" className="w-full h-full block" />
  </div>
  <span className="text-[#0f8] text-[11px] font-normal leading-[16.5px]">在线</span>
</div>
```

### 3. 数据槽位 (Data Slot)
```tsx
<div className="w-full h-[54px] rounded-[6px] border-[1.25px] border-[rgba(6,196,255,0.3)] bg-[rgba(6,196,255,0.1)] flex items-center justify-center">
  <span className="text-[#00d4ff] text-[13px] font-medium tracking-[0.325px]">
    2.4GHz
  </span>
</div>
```

## 实现流程
1. **分析结构**: 识别页面主容器、侧边栏、内容区。
2. **搭建骨架**: 使用 Grid/Flex 布局，先不加颜色，确保空间分配正确。
3. **注入色板**: 严格使用 Figma 定义的 `rgba` 和 hex 值。
4. **添加质感**: 叠加 `linear-gradient` 背景和 `inset` 阴影。
5. **细节装饰**: 必加四角/边缘渐变装饰线。
6. **交互反馈**: 补充 `hover:border-[#00d4ff]` 和 `hover:shadow`。

## 输出要求
- 直接输出完整的 `.tsx` 组件代码。
- 确保 Tailwind 类名正确，复杂值使用 `[]` 语法。
- 优先复用 `lucide-react` 图标。
