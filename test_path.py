# 模拟用户代码
def solve(graph, start, end):
    # 简单的 BFS
    from collections import deque
    prev = {}
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        if u == end:
            break
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                prev[v] = u
                queue.append(v)
    if end not in prev and end != start:
        return []
    path, node = [], end
    while node in prev:
        path.append(node)
        node = prev[node]
    path.append(start)
    path.reverse()
    return path

# 测试图
graph = {
    "A": {"B": 5, "C": 3},
    "B": {"D": 2},
    "C": {"D": 4},
    "D": {}
}

result = solve(graph, "A", "D")
print(f"Path: {result}")
print(f"Type: {type(result)}")
print(f"Length: {len(result)}")
