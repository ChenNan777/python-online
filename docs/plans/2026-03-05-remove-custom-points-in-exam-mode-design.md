# 考试模式下移除自定义起终点开关 - 设计文档

**日期:** 2026-03-05
**状态:** 已批准

## 概述

在考试模式下隐藏"自定义起终点"开关，防止考生在考试时使用调试功能。保留所有 debugMode 相关的功能代码，仅控制 UI 显示层。

## 背景

当前系统同时支持练习模式和考试模式：
- 练习模式：允许学生查看最优解、使用调试工具
- 考试模式：应该限制调试功能，确保考试公平性

"自定义起终点"开关允许用户拖动地图上的起终点来验证算法，这是一个调试功能，不应该在考试模式下可用。

## 设计决策

### 方案选择

**选定方案：条件渲染**
- 在现有条件判断中添加 `isPracticeRoute` 检查
- 只在练习模式路由下显示该开关
- 保留所有功能代码，仅控制 UI 显示

**其他考虑的方案：**
- 方案 2：合并条件块 - 代码紧凑但可读性差
- 方案 3：组件级控制 - 过度设计，当前需求不需要

### 实现细节

**修改文件：** `src/pages/ChallengePage/index.tsx`

**修改位置：** 第 557 行

**当前代码：**
```tsx
{challenge.id === "shortest-path" && (
  <Tooltip title="开启后可拖动起终点验证算法" placement="bottom">
    <Space size={4} align="center">
      <span className="text-xs text-black/65">自定义起终点</span>
      <Switch
        size="small"
        checked={debugMode}
        onChange={handleDebugModeChange}
        disabled={isRunning}
      />
    </Space>
  </Tooltip>
)}
```

**修改后代码：**
```tsx
{challenge.id === "shortest-path" && isPracticeRoute && (
  <Tooltip title="开启后可拖动起终点验证算法" placement="bottom">
    <Space size={4} align="center">
      <span className="text-xs text-black/65">自定义起终点</span>
      <Switch
        size="small"
        checked={debugMode}
        onChange={handleDebugModeChange}
        disabled={isRunning}
      />
    </Space>
  </Tooltip>
)}
```

**关键变更：** 添加 `&& isPracticeRoute` 条件

## 行为说明

### 练习模式 (`/practice/*` 路由)
- 显示"自定义起终点"开关
- 用户可以启用 debugMode
- 可以拖动地图上的起终点标记
- 显示最优解和调试信息

### 考试模式 (其他路由)
- 隐藏"自定义起终点"开关
- debugMode 功能代码保持不变（为未来可能的需求保留）
- 不显示最优解（通过现有的 isPracticeMode 控制）

## 影响范围

### 修改的文件
- `src/pages/ChallengePage/index.tsx` - 添加条件判断

### 不受影响的部分
- `src/store/usePythonStore.ts` - debugMode 状态管理保持不变
- `src/components/MapPanel.tsx` - 地图组件功能保持不变
- 所有 debugMode 相关的功能代码保持不变

## 一致性

该设计与现有的"练习模式"开关保持一致：
```tsx
{(challenge.id === "shortest-path" || challenge.id === "bearing-positioning") && isPracticeRoute && (
  // 练习模式开关
)}
```

两个开关都使用 `isPracticeRoute` 条件，确保只在练习模式下显示。

## 测试考虑

### 需要验证的场景
1. 练习模式下，"自定义起终点"开关正常显示和工作
2. 考试模式下，"自定义起终点"开关被隐藏
3. debugMode 相关功能代码不受影响
4. 地图组件在两种模式下都能正常工作

## 未来扩展

如果将来需要在考试模式下启用调试功能（例如管理员模式），只需：
1. 修改条件判断，添加额外的权限检查
2. 所有功能代码已经存在，无需额外开发
