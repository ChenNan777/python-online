# 真实路网路径规划功能设计文档

**日期：** 2026-03-02
**目标：** 将"最短路径"挑战从模拟网格改为使用真实路网数据，在真实地图上进行路径规划可视化

## 1. 概述

### 1.1 背景
当前的"最短路径"挑战使用 25×20 的模拟网格图，缺乏真实场景感。项目中已有长沙市的真实路网 GeoJSON 数据（`public/road.geojson`），需要将其集成到挑战系统中。

### 1.2 目标
- 使用真实的 OpenStreetMap 路网数据
- 在 Leaflet 地图上可视化路径规划结果
- 保持现有的挑战系统架构
- 提供直观的地理上下文

## 2. 技术方案

### 2.1 整体架构

**核心改动：**
- 替换"最短路径"挑战的数据源（从模拟图改为真实路网）
- 添加 Leaflet 地图库（react-leaflet）
- 创建 MapPanel 组件替代 GraphPanel
- 实现 GeoJSON 解析和图构建逻辑

**数据流：**
```
GeoJSON 文件 → 解析器 → 图结构 → Python 上下文 → 用户算法 → 结果 → 地图可视化
```

**组件结构：**
```
ChallengePage
  ├─ Editor (用户代码编辑器)
  ├─ RightPanelStack
  │   └─ MapPanel (新增组件)
  │       └─ Leaflet Map
  │           ├─ 底图图层 (OpenStreetMap)
  │           ├─ 路网图层 (GeoJSON)
  │           ├─ 最优路径图层 (蓝色)
  │           └─ 用户路径图层 (橙色)
  └─ TestCasesPanel (测试结果)
```

### 2.2 GeoJSON 解析与图构建

**实现文件：** `src/utils/parseRoadNetwork.ts`

**解析策略：**

1. **节点提取**
   - 遍历所有 Feature（道路）的 LineString 坐标
   - 提取每条道路的起点和终点
   - 检测道路交叉点（多条道路共享的坐标点）
   - 为每个唯一坐标点分配节点 ID
   - 使用坐标字符串作为 key 去重：`"lng,lat"`

2. **边构建**
   - 每条道路的相邻节点之间创建边
   - 权重计算：使用 Haversine 公式计算两点间的地理距离（米）
   - 双向边：道路默认双向通行（除非 properties.oneway === "yes"）

3. **数据结构**
   ```typescript
   type RoadNetwork = {
     graph: Record<string, Record<string, number>>;  // 邻接表
     positions: Record<string, [number, number]>;     // 节点坐标
     nodes: Array<{ id: string; lng: number; lat: number }>;
     edges: Array<{ from: string; to: string; weight: number }>;
     start: string;  // 起点节点 ID
     end: string;    // 终点节点 ID
     geojson: GeoJSON.FeatureCollection;  // 原始 GeoJSON
   };
   ```

4. **起点/终点选择**
   - 自动选择：选择路网中距离最远的两个节点
   - 或选择特定区域的节点（如路网的西北角和东南角）

**Haversine 公式实现：**
```typescript
function haversineDistance(
  lng1: number, lat1: number,
  lng2: number, lat2: number
): number {
  const R = 6371000; // 地球半径（米）
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
```

### 2.3 地图可视化组件

**实现文件：** `src/components/MapPanel.tsx`

**组件功能：**
- 使用 react-leaflet 渲染地图
- 显示 OpenStreetMap 底图
- 渲染路网 GeoJSON
- 高亮显示路径规划结果
- 显示起点/终点标记
- 信息栏显示路径权重对比

**图层样式：**
```typescript
// 路网基础样式
const roadStyle = {
  color: '#e2e8f0',
  weight: 1,
  opacity: 0.7
};

// 最优路径样式
const optimalPathStyle = {
  color: '#3b82f6',
  weight: 4,
  opacity: 1
};

// 用户路径样式
const userPathStyle = {
  color: '#f59e0b',
  weight: 4,
  opacity: 1,
  dashArray: '6 3'
};
```

**交互功能：**
- 地图缩放、平移
- 悬停道路显示名称和属性
- 点击节点显示节点 ID
- 重置视图按钮

**信息栏内容：**
- 你的路径：权重值（米）
- 最优路径：权重值（米）
- 差异：+X 米（Y%）
- 结果标识：✓ 最优解 / 非最优

### 2.4 Python 集成

**上下文代码注入位置：** `ChallengePage.tsx` 的 `effectiveContextCode`

**注入内容：**
```python
# 路网图结构（邻接表，权重单位：米）
graph = {
  "node_0": {"node_1": 245.3, "node_5": 189.7},
  "node_1": {"node_0": 245.3, "node_2": 156.2},
  # ... 更多节点
}

# 节点坐标（经纬度，用于 A* 启发式）
positions = {
  "node_0": [113.0464809, 28.2504648],
  "node_1": [113.0446815, 28.2519344],
  # ... 更多坐标
}

# 起点和终点
start = "node_0"
end = "node_50"

# 最优解计算（用于测试）
import heapq as __hq__
def __optimal_path__(g, s, e):
    dist = {n: float('inf') for n in g}
    dist[s] = 0
    prev = {}
    pq = [(0, s)]
    while pq:
        cost, u = __hq__.heappop(pq)
        if cost > dist[u]: continue
        for v, w in g[u].items():
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                __hq__.heappush(pq, (dist[v], v))
    path, node = [], e
    while node in prev:
        path.append(node)
        node = prev[node]
    path.append(s)
    path.reverse()
    return path, dist[e]
```

**挑战描述更新：**
```
实现函数 solve(graph, start, end)，在真实路网中找到从起点到终点的最短路径。

参数：
  graph: 路网邻接表，graph[u][v] = 距离（米）
  start: 起点节点 ID（字符串）
  end: 终点节点 ID（字符串）

全局变量：
  positions: 节点坐标字典 {nodeId: [lng, lat]}（可选，用于 A* 启发式）

返回值：
  经过的节点 ID 列表，如 ["node_0", "node_5", "node_12", ...]

示例：
  solve(graph, "node_0", "node_50") → ["node_0", "node_5", "node_12", ..., "node_50"]

提示：
  - 可以使用 Dijkstra、A*、Bellman-Ford 等算法
  - A* 算法可以利用 positions 计算启发式距离
  - 右侧地图会显示你的路径和最优路径对比
```

### 2.5 测试用例设计

**测试策略：**
1. 验证路径有效性（相邻节点确实相连）
2. 验证起点和终点正确
3. 对比最优解权重

**测试用例实现：**
```typescript
testCases: [
  {
    args: [{ graph: "graph", start: "start", end: "end" }],
    expected: null,  // 不检查具体路径，只检查有效性
    description: "路径有效性检查",
    checkIsPath: true  // 自定义检查标志
  }
]
```

**Python 测试逻辑：**
```python
# 在测试运行器中
user_path = solve(graph, start, end)

# 验证 1：路径非空
if not user_path or len(user_path) == 0:
    result = {"passed": False, "actual": "空路径", "expected": "有效路径"}

# 验证 2：起点和终点正确
elif user_path[0] != start or user_path[-1] != end:
    result = {"passed": False, "actual": f"起点={user_path[0]}, 终点={user_path[-1]}", "expected": f"起点={start}, 终点={end}"}

# 验证 3：路径有效性（相邻节点相连）
else:
    valid = True
    for i in range(len(user_path) - 1):
        if user_path[i+1] not in graph.get(user_path[i], {}):
            valid = False
            break

    if not valid:
        result = {"passed": False, "actual": "路径包含不相连的节点", "expected": "所有相邻节点相连"}
    else:
        # 计算用户路径权重
        user_weight = sum(graph[user_path[i]][user_path[i+1]] for i in range(len(user_path)-1))
        optimal_path, optimal_weight = __optimal_path__(graph, start, end)

        result = {
            "passed": True,
            "actual": f"{user_weight:.1f}m",
            "expected": f"{optimal_weight:.1f}m (最优)"
        }
```

## 3. 实现细节

### 3.1 依赖安装

**新增依赖：**
```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "@types/leaflet": "^1.9.8"
}
```

**安装命令：**
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### 3.2 CSS 导入

在 `src/main.tsx` 或 `MapPanel.tsx` 中导入：
```typescript
import 'leaflet/dist/leaflet.css';
```

**修复 Leaflet 图标问题（Vite 常见问题）：**
```typescript
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
```

### 3.3 错误处理

**GeoJSON 加载失败：**
```typescript
try {
  const response = await fetch('/road.geojson');
  if (!response.ok) throw new Error('加载失败');
  const geojson = await response.json();
  // 解析...
} catch (error) {
  console.error('路网数据加载失败:', error);
  // 显示错误提示
}
```

**图构建失败：**
- 检测节点数是否为 0
- 检测图是否连通（BFS 遍历）
- 如果不连通，选择最大连通分量

**性能优化：**
- 如果节点数 > 500，考虑：
  - 只保留主要道路（highway = "primary", "secondary"）
  - 简化节点（合并度为 2 的节点）
- 使用 useMemo 缓存解析结果

### 3.4 文件清单

**新增文件：**
- `src/utils/parseRoadNetwork.ts` - GeoJSON 解析和图构建
- `src/components/MapPanel.tsx` - Leaflet 地图组件

**修改文件：**
- `src/pages/ChallengePage/challenges.ts` - 更新"最短路径"挑战描述
- `src/pages/ChallengePage/index.tsx` - 集成 MapPanel，注入路网数据
- `src/pages/EditorPage/RightPanelStack.tsx` - 添加 MapPanel 到面板栈
- `package.json` - 添加依赖

**保留文件：**
- `src/components/GraphPanel.tsx` - 保留供其他功能使用
- `src/utils/generateGraph.ts` - 保留供其他功能使用

## 4. 用户体验

### 4.1 挑战流程
1. 用户选择"最短路径"挑战
2. 右侧显示长沙路网地图
3. 地图上标记起点（绿色）和终点（红色）
4. 用户编写路径规划算法
5. 点击运行，地图上显示：
   - 用户路径（橙色虚线）
   - 最优路径（蓝色实线）
6. 信息栏显示权重对比和优化空间

### 4.2 视觉反馈
- 路径动画：路径绘制时使用渐进动画
- 颜色编码：
  - 绿色 = 起点
  - 红色 = 终点
  - 蓝色 = 最优路径
  - 橙色 = 用户路径
- 权重标签：在路径上显示总距离

### 4.3 错误提示
- 路径无效：高亮显示断开的边
- 算法超时：提示优化算法
- 未找到路径：提示检查算法逻辑

## 5. 兼容性

### 5.1 其他挑战
- 保持 "bearing-positioning" 等其他挑战不受影响
- GraphPanel 组件保留，供其他功能使用
- 条件渲染：只在 challenge.id === "shortest-path" 时使用 MapPanel

### 5.2 现有功能
- 断点调试功能正常工作
- 变量面板正常显示
- 测试用例面板正常工作
- 上下文代码功能正常

## 6. 未来扩展

### 6.1 可能的增强
- 支持用户点击地图选择起点/终点
- 支持多个测试用例（不同起点/终点组合）
- 显示算法执行过程动画（访问的节点）
- 支持更多城市的路网数据
- 添加路况权重（模拟拥堵）

### 6.2 性能优化
- 使用 Web Worker 解析大型 GeoJSON
- 实现图的增量更新
- 使用虚拟化渲染大量节点

## 7. 总结

本设计将"最短路径"挑战从模拟网格升级为真实路网，通过 Leaflet 地图提供直观的地理可视化。核心改动包括 GeoJSON 解析、图构建、地图组件开发和 Python 集成。设计保持了现有架构的简洁性，同时提供了良好的用户体验和扩展性。
