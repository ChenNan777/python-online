# 练习模式与考试模式分离设计

## 概述

将定位分析和路径规划的页面分为两种模式：
- **练习模式**：可以不登录直接从登录页进入，显示最优解和真实目标
- **考试模式**：必须登录后从 dashboard 进入，只显示用户的解

## 路由架构

### 新增路由
- `/practice/positioning` - 定位分析练习模式（无需登录）
- `/practice/pathfinding` - 路径规划练习模式（无需登录）

### 现有路由保持
- `/login` - 登录页（新增练习模式入口）
- `/dashboard` - 控制台（需要登录）
- `/challenge/positioning` - 定位分析考试模式（需要登录）
- `/challenge/pathfinding` - 路径规划考试模式（需要登录）

## 组件改动

### 1. LoginPage (src/pages/LoginPage/index.tsx)

**改动内容：**
在现有的"进入调试器（无需登录）"按钮下方，添加两个练习模式按钮：

```tsx
<Form.Item>
  <Button block onClick={() => navigate('/debugger')}>
    进入调试器（无需登录）
  </Button>
</Form.Item>

<Form.Item>
  <Button block onClick={() => navigate('/practice/positioning')}>
    定位分析练习（无需登录）
  </Button>
</Form.Item>

<Form.Item>
  <Button block onClick={() => navigate('/practice/pathfinding')}>
    路径规划练习（无需登录）
  </Button>
</Form.Item>
```

### 2. ChallengePage (src/pages/ChallengePage/index.tsx)

**改动内容：**

1. 从路由路径判断当前模式：
   - 如果路径以 `/practice/` 开头，则为练习模式
   - 如果路径以 `/challenge/` 开头，则为考试模式

2. 根据模式控制功能：
   - **练习模式**：保留练习模式开关，允许用户切换
   - **考试模式**：隐藏练习模式开关，强制 `isPracticeMode = false`

3. 实现逻辑：
```tsx
const location = useLocation();
const isPracticeRoute = location.pathname.startsWith('/practice/');

// 在考试模式下强制关闭练习模式
const effectiveIsPracticeMode = isPracticeRoute ? isPracticeMode : false;
```

4. UI 变化：
   - 考试模式下，移除第 563-575 行的练习模式开关
   - 使用 `effectiveIsPracticeMode` 替代 `isPracticeMode` 传递给子组件

### 3. main.tsx (src/main.tsx)

**改动内容：**

添加练习模式路由（无需登录保护）：

```tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/debugger" element={<DebuggerPage />} />

  {/* 练习模式路由 - 无需登录 */}
  <Route path="/practice/:type" element={<ChallengePage />} />

  {/* 考试模式路由 - 需要登录 */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/challenge/:type" element={<ChallengePage />} />
  </Route>

  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>
```

## 数据流

### 练习模式流程
1. 用户访问登录页
2. 点击"定位分析练习"或"路径规划练习"按钮
3. 导航到 `/practice/:type`
4. ChallengePage 检测到练习模式路由
5. 显示练习模式开关，允许用户切换
6. 根据开关状态显示/隐藏最优解和真实目标

### 考试模式流程
1. 用户登录
2. 进入 dashboard
3. 点击挑战按钮
4. 导航到 `/challenge/:type`
5. ChallengePage 检测到考试模式路由
6. 隐藏练习模式开关，强制关闭练习模式
7. 只显示用户的解

## 兼容性

### 现有功能保持不变
- 调试器页面 (`/debugger`) 保持独立
- Dashboard 的挑战按钮继续导航到 `/challenge/:type`
- 所有现有的挑战逻辑（测试用例、代码编辑、调试功能）保持不变

### Store 状态
- `isPracticeMode` 状态保留，但在考试模式下被覆盖
- 不需要修改 `usePythonStore` 的逻辑
- 初始值保持为 `import.meta.env.VITE_CHALLENGE_MODE !== 'exam'`

## 安全性

- 练习模式路由无需登录保护，任何人都可以访问
- 考试模式路由保持 `ProtectedRoute` 保护
- 用户无法通过修改 URL 从练习模式进入考试模式（因为考试模式需要登录）
- 用户可以从考试模式手动修改 URL 进入练习模式，但这不是安全问题（练习模式本身就是公开的）

## 测试场景

1. **未登录用户访问练习模式**
   - 从登录页点击练习按钮 → 成功进入练习模式
   - 可以看到练习模式开关
   - 可以切换练习模式开关

2. **未登录用户访问考试模式**
   - 直接访问 `/challenge/positioning` → 重定向到登录页

3. **已登录用户访问考试模式**
   - 从 dashboard 点击挑战按钮 → 成功进入考试模式
   - 看不到练习模式开关
   - 只显示用户的解

4. **已登录用户访问练习模式**
   - 从登录页点击练习按钮 → 成功进入练习模式
   - 可以看到练习模式开关

## 实现优先级

1. 修改 main.tsx 添加练习模式路由
2. 修改 ChallengePage 添加模式检测逻辑
3. 修改 LoginPage 添加练习模式入口按钮
4. 测试所有场景
