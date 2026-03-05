# 手动测试步骤

## 1. 打开应用
访问: http://localhost:5174

## 2. 选择挑战
点击"编程挑战"或导航到挑战页面，选择"真实路网最短路径"挑战

## 3. 输入测试代码
复制以下 Dijkstra 算法代码：

```python
import heapq

def solve(graph, start, end):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    prev = {}
    pq = [(0, start)]
    
    while pq:
        cost, u = heapq.heappop(pq)
        if cost > dist[u]:
            continue
        for v, w in graph[u].items():
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                heapq.heappush(pq, (dist[v], v))
    
    if dist[end] == float('inf'):
        return []
    
    path, node = [], end
    while node in prev:
        path.append(node)
        node = prev[node]
    path.append(start)
    path.reverse()
    return path
```

## 4. 点击执行

## 5. 查看浏览器控制台（F12）
应该看到类似以下的调试输出：

```
[DEBUG] Graph has 150 nodes, start=112.345678,28.123456, end=112.456789,28.234567
[DEBUG] Start node exists in graph: True
[DEBUG] End node exists in graph: True
[DEBUG] Start node has 3 neighbors
[DEBUG] Calling user solve function...
[DEBUG] User result type: <class 'list'>, value: ['112.345678,28.123456', '112.346789,28.124567', '112.347890,28.125678']...
[DEBUG] User path length: 25
[DEBUG] User path: ['112.345678,28.123456', '112.346789,28.124567', '112.347890,28.125678']...['112.454678,28.232456', '112.455789,28.233567', '112.456789,28.234567']
[DEBUG] Expected start: '112.345678,28.123456', path start: '112.345678,28.123456'
[DEBUG] Start match: True
[DEBUG] Expected end: '112.456789,28.234567', path end: '112.456789,28.234567'
[DEBUG] End match: True
[DEBUG] Edge 112.345678,28.123456 -> 112.346789,28.124567: weight = 156.78
[DEBUG] Edge 112.346789,28.124567 -> 112.347890,28.125678: weight = 142.34
[DEBUG] User weight: 3456.78, valid: True
```

## 6. 检查地图显示
右侧地图应该显示：
- 用户路径权重：3456.78（或其他正数，不是 -1）
- 最优路径权重：3456.78（或类似的值）
- 红色虚线：用户路径
- 绿色实线：最优路径

## 7. 如果权重仍然是 -1
查看控制台的调试输出，会告诉你具体原因：
- "User solve returned None" → 函数没有返回值
- "Path does not start at start node" → 路径起点错误
- "Path does not end at end node" → 路径终点错误
- "Edge not found" → 路径包含不存在的边
- "Node not found in graph" → 路径包含不存在的节点

## 预期结果
✅ 用户路径权重应该是一个正数（例如 3456.78）
✅ 地图上应该显示用户的路径（红色虚线）
✅ 控制台应该显示详细的调试信息
