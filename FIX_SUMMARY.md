# 用户路径权重为 -1 的 BUG 修复

## 问题描述
在"真实路网最短路径"挑战中，点击执行后计算出的用户路径权重显示为 -1。

## 根本原因
代码没有验证用户返回的路径是否：
1. 从正确的起点开始
2. 在正确的终点结束
3. 所有边都存在于图中

## 修复内容

### 文件：`src/worker/pyodide.worker.ts`

#### 1. 添加图结构验证（第 299-303 行）
```python
print(f"[DEBUG] Graph has {len(__graph__)} nodes, start={__start__}, end={__end__}")
print(f"[DEBUG] Start node exists in graph: {__start__ in __graph__}")
print(f"[DEBUG] End node exists in graph: {__end__ in __graph__}")
if __start__ in __graph__:
    print(f"[DEBUG] Start node has {len(__graph__[__start__])} neighbors")
```

#### 2. 添加 None 返回值处理（第 308-310 行）
```python
if __user_result__ is None:
    print("[DEBUG] User solve returned None")
    __user_w__ = -1.0
```

#### 3. 添加详细路径信息（第 317-327 行）
```python
if len(__user_path__) > 0:
    print(f"[DEBUG] User path: {__user_path__[:3]}...{__user_path__[-3:]}")
    print(f"[DEBUG] Expected start: '{__start__}', path start: '{__user_path__[0]}'")
    print(f"[DEBUG] Start match: {str(__user_path__[0]) == __start__}")
    if len(__user_path__) > 1:
        print(f"[DEBUG] Expected end: '{__end__}', path end: '{__user_path__[-1]}'")
        print(f"[DEBUG] End match: {str(__user_path__[-1]) == __end__}")
```

#### 4. 添加路径起点终点验证（第 332-338 行）**【关键修复】**
```python
if str(__user_path__[0]) != __start__:
    print(f"[DEBUG] Path does not start at start node: '{__user_path__[0]}' != '{__start__}'")
    __valid__ = False
elif str(__user_path__[-1]) != __end__:
    print(f"[DEBUG] Path does not end at end node: '{__user_path__[-1]}' != '{__end__}'")
    __valid__ = False
```

#### 5. 改进边验证逻辑（第 343-360 行）
```python
if __u__ in __graph__:
    if __v__ in __graph__[__u__]:
        __edge_w__ = float(__graph__[__u__][__v__])
        __w__ += __edge_w__
        if __i__ < 2:
            print(f"[DEBUG] Edge {__u__} -> {__v__}: weight = {__edge_w__}")
    else:
        print(f"[DEBUG] Edge not found: {__u__} -> {__v__}")
        print(f"[DEBUG] Available neighbors of {__u__}: {list(__graph__[__u__].keys())[:5]}")
        __valid__ = False
        break
else:
    print(f"[DEBUG] Node {__u__} not found in graph")
    __valid__ = False
    break
```

## 测试步骤

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 打开浏览器访问 http://localhost:5174

3. 选择"真实路网最短路径"挑战

4. 输入以下测试代码：
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

5. 点击"执行"按钮

6. 打开浏览器控制台（F12），查看调试输出

## 预期结果

控制台应该显示类似以下内容：
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

地图上应该显示：
- 用户路径权重：3456.78（红色虚线）
- 最优路径权重：3456.78（绿色实线）

## 常见问题诊断

### 如果权重仍然是 -1，检查调试输出：

1. **"User solve returned None"** → 用户函数没有返回值，检查是否忘记写 `return`

2. **"Path does not start at start node"** → 路径起点不对，检查算法逻辑

3. **"Path does not end at end node"** → 路径终点不对，检查算法是否正确找到目标

4. **"Edge not found"** → 路径中包含不存在的边，可能是：
   - 算法错误，连接了不相邻的节点
   - 节点 ID 格式不匹配

5. **"Node not found in graph"** → 路径中包含不存在的节点

6. **"User path too short"** → 返回了空列表或单节点路径（当 start != end 时）
