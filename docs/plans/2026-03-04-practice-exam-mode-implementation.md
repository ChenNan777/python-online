# 练习模式与考试模式分离实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将定位分析和路径规划页面分为练习模式（无需登录）和考试模式（需要登录），通过独立路由实现完全隔离。

**Architecture:** 添加 `/practice/:type` 路由用于练习模式（无需登录保护），保持 `/challenge/:type` 路由用于考试模式（需要登录保护）。ChallengePage 根据路由路径判断当前模式，在考试模式下隐藏练习模式开关并强制关闭练习模式功能。

**Tech Stack:** React, React Router, TypeScript, Zustand

---

## Task 1: 添加练习模式路由

**Files:**
- Modify: `src/main.tsx:23-31`

**Step 1: 在路由配置中添加练习模式路由**

在 `<Route path="/debugger" element={<DebuggerPage />} />` 之后，`<Route element={<ProtectedRoute />}>` 之前添加练习模式路由：

```tsx
<Route path="/login" element={<LoginPage />} />
<Route path="/debugger" element={<DebuggerPage />} />

{/* 练习模式路由 - 无需登录 */}
<Route path="/practice/:type" element={<ChallengePage />} />

{/* 考试模式路由 - 需要登录 */}
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/challenge/:type" element={<ChallengePage />} />
</Route>
```

**Step 2: 验证路由配置**

手动检查：
- `/practice/:type` 在 `ProtectedRoute` 之外（无需登录）
- `/challenge/:type` 在 `ProtectedRoute` 之内（需要登录）

**Step 3: 提交更改**

```bash
git add src/main.tsx
git commit -m "feat: 添加练习模式路由

- 新增 /practice/:type 路由用于练习模式（无需登录）
- 保持 /challenge/:type 路由用于考试模式（需要登录）

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: 修改 ChallengePage 支持模式检测

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx:129-171`

**Step 1: 导入 useLocation hook**

在文件顶部的导入语句中，确认已经导入了 `useLocation`（第 23 行已存在）：

```tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
```

**Step 2: 添加模式检测逻辑**

在 `ChallengePage` 函数内部，`useParams` 之后添加模式检测：

```tsx
export default function ChallengePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams<{ type: string }>();

  // 检测当前是练习模式还是考试模式
  const isPracticeRoute = location.pathname.startsWith('/practice/');
```

**Step 3: 修改 isPracticeMode 的使用**

找到从 store 中获取 `isPracticeMode` 的地方（第 170 行），修改为：

```tsx
const {
  code, setCode,
  contextCode, setContextCode,
  breakpoints, toggleBreakpoint, setBreakpoints,
  isRunning,
  currentLine, hoverLine, setHoverLine,
  pausedDepth,
  output,
  graphData, setGraphData, setGraphResult,
  setVariableScopes, setCurrentLine, setIsPaused,
  setPositioningData, setPositioningResult,
  debugMode, setDebugMode,
  debugStartCoord, setDebugStartCoord,
  debugEndCoord, setDebugEndCoord,
  isPracticeMode: storePracticeMode, setChallengeMode,
} = usePythonStore();

// 在考试模式下强制关闭练习模式
const isPracticeMode = isPracticeRoute ? storePracticeMode : false;
```

**Step 4: 提交更改**

```bash
git add src/pages/ChallengePage/index.tsx
git commit -m "feat: 添加 ChallengePage 模式检测逻辑

- 根据路由路径判断是练习模式还是考试模式
- 考试模式下强制关闭练习模式功能

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: 隐藏考试模式下的练习模式开关

**Files:**
- Modify: `src/pages/ChallengePage/index.tsx:563-575`

**Step 1: 修改练习模式开关的显示条件**

找到练习模式开关的代码（第 563-575 行），添加条件判断：

```tsx
{(challenge.id === "shortest-path" || challenge.id === "bearing-positioning") && isPracticeRoute && (
  <Tooltip title="练习模式显示最优解和真实目标，考试模式只显示你的解" placement="bottom">
    <Space size={4} align="center">
      <span className="text-xs text-black/65">练习模式</span>
      <Switch
        size="small"
        checked={isPracticeMode}
        onChange={setChallengeMode}
        disabled={isRunning}
      />
    </Space>
  </Tooltip>
)}
```

**Step 2: 验证逻辑**

手动检查：
- 练习模式路由（`/practice/:type`）：显示开关
- 考试模式路由（`/challenge/:type`）：不显示开关

**Step 3: 提交更改**

```bash
git add src/pages/ChallengePage/index.tsx
git commit -m "feat: 考试模式下隐藏练习模式开关

- 只在练习模式路由下显示练习模式开关
- 考试模式下完全隐藏该开关

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: 在登录页添加练习模式入口

**Files:**
- Modify: `src/pages/LoginPage/index.tsx:76-84`

**Step 1: 添加练习模式按钮**

在"进入调试器（无需登录）"按钮之后添加两个练习模式按钮：

```tsx
<Form.Item>
  <Button
    block
    onClick={() => navigate('/debugger')}
  >
    进入调试器（无需登录）
  </Button>
</Form.Item>

<Form.Item>
  <Button
    block
    onClick={() => navigate('/practice/positioning')}
  >
    定位分析练习（无需登录）
  </Button>
</Form.Item>

<Form.Item>
  <Button
    block
    onClick={() => navigate('/practice/pathfinding')}
  >
    路径规划练习（无需登录）
  </Button>
</Form.Item>
```

**Step 2: 提交更改**

```bash
git add src/pages/LoginPage/index.tsx
git commit -m "feat: 在登录页添加练习模式入口

- 添加定位分析练习按钮
- 添加路径规划练习按钮
- 两个按钮都无需登录即可访问

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: 手动测试所有场景

**Files:**
- None (manual testing)

**Step 1: 测试未登录用户访问练习模式**

1. 清除浏览器登录状态（或使用无痕模式）
2. 访问 `http://localhost:5173/login`
3. 点击"定位分析练习（无需登录）"按钮
4. 验证：
   - 成功进入定位分析页面
   - 可以看到练习模式开关
   - 可以切换练习模式开关
5. 返回登录页，点击"路径规划练习（无需登录）"按钮
6. 验证：
   - 成功进入路径规划页面
   - 可以看到练习模式开关

**Step 2: 测试未登录用户访问考试模式**

1. 保持未登录状态
2. 直接访问 `http://localhost:5173/challenge/positioning`
3. 验证：
   - 被重定向到登录页
   - URL 变为 `/login`

**Step 3: 测试已登录用户访问考试模式**

1. 登录系统（使用 user1 / 123456）
2. 进入 dashboard
3. 点击"定位分析"挑战按钮
4. 验证：
   - 成功进入定位分析页面
   - 看不到练习模式开关
   - 只显示用户的解（不显示最优解）
5. 返回 dashboard，点击"路径规划"挑战按钮
6. 验证：
   - 成功进入路径规划页面
   - 看不到练习模式开关

**Step 4: 测试已登录用户访问练习模式**

1. 保持登录状态
2. 访问 `http://localhost:5173/login`
3. 点击"定位分析练习（无需登录）"按钮
4. 验证：
   - 成功进入定位分析页面
   - 可以看到练习模式开关
   - 可以切换练习模式开关

**Step 5: 测试练习模式功能**

1. 进入练习模式（任一挑战）
2. 开启练习模式开关
3. 运行代码
4. 验证：
   - 显示最优解（路径规划）或真实目标（定位分析）
5. 关闭练习模式开关
6. 再次运行代码
7. 验证：
   - 不显示最优解或真实目标

**Step 6: 测试考试模式功能**

1. 登录后进入考试模式（任一挑战）
2. 运行代码
3. 验证：
   - 只显示用户的解
   - 不显示最优解或真实目标
   - 没有练习模式开关

**Step 7: 记录测试结果**

创建测试报告或在终端记录所有测试场景的结果。

---

## Task 6: 最终提交和清理

**Files:**
- None (git operations)

**Step 1: 检查所有更改**

```bash
git status
git log --oneline -6
```

验证所有提交都已完成。

**Step 2: 推送到远程（如果需要）**

```bash
git push origin work-platform
```

**Step 3: 更新文档（如果需要）**

如果有 README 或用户文档需要更新，添加关于练习模式和考试模式的说明。

---

## 验收标准

- [ ] 未登录用户可以从登录页进入练习模式
- [ ] 未登录用户无法访问考试模式（会被重定向到登录页）
- [ ] 已登录用户可以从 dashboard 进入考试模式
- [ ] 练习模式显示练习模式开关，可以切换
- [ ] 考试模式不显示练习模式开关
- [ ] 练习模式开启时显示最优解/真实目标
- [ ] 考试模式只显示用户的解
- [ ] 所有现有功能（调试器、代码编辑、测试用例）正常工作
- [ ] 路由保护正常工作（考试模式需要登录）

---

## 注意事项

1. **不要修改 store 的初始值**：`isPracticeMode` 的初始值保持为 `import.meta.env.VITE_CHALLENGE_MODE !== 'exam'`，不需要修改。

2. **变量重命名**：在 Task 2 中，我们将 store 中的 `isPracticeMode` 重命名为 `storePracticeMode`，然后创建一个新的局部变量 `isPracticeMode`，这样可以避免修改大量现有代码。

3. **条件渲染**：在 Task 3 中，我们只是添加了 `isPracticeRoute` 条件，不需要修改其他逻辑。

4. **测试覆盖**：Task 5 的手动测试非常重要，确保所有场景都经过验证。

5. **向后兼容**：所有现有功能保持不变，只是添加了新的路由和入口。
