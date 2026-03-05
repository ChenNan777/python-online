export type TestCase = {
  args: unknown[];
  expected: unknown;
  description: string;
  tolerance?: number;
  checkIsPosition?: boolean;
};

export type Solution = {
  label: string;
  code: string;
};

export type Challenge = {
  id: string;
  title: string;
  difficulty: "简单" | "中等" | "困难";
  description: string;
  starterCode: string;
  solutions: Solution[];
  testCases: TestCase[];
};

export const CHALLENGES: Challenge[] = [
  {
    id: "shortest-path",
    title: "路径规划",
    difficulty: "困难",
    description: `实现函数 solve(graph, start, end)，在真实路网中找到从起点到终点的最短路径。

参数：
  graph: 路网邻接表，graph[u][v] = 距离（米）
  start: 起点节点 ID（字符串）
  end: 终点节点 ID（字符串）

全局变量：
  positions: 节点坐标字典 {nodeId: [lng, lat]}（可选，用于 A* 启发式）

返回值：
  经过的节点 ID 列表，如 ["node_0", "node_5", "node_12", ...]

示例：
  solve(graph, "node_0", "node_50") → ["node_0", "node_5", ..., "node_50"]

本次输入：
  graph = {A: {B: 1}, B: {}, C: {D: 1}, D: {}}
  start = "A"
  end = "D"

提示：右侧地图会显示真实路网，你的路径将显示在地图上。`,
    starterCode: `def solve(graph, start, end):
    pass
`,
    solutions: [
      {
        label: "Dijkstra",
        code: `import heapq

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
`,
      },
      {
        label: "BFS（无权图）",
        code: `from collections import deque

def solve(graph, start, end):
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
`,
      },
      {
        label: "A*",
        code: `import heapq
import math

def solve(graph, start, end):
    # 有 positions 时用欧氏距离启发，否则退化为 Dijkstra
    def h(u):
        try:
            if u in positions and end in positions:
                x1, y1 = positions[u]; x2, y2 = positions[end]
                return math.hypot(x2-x1, y2-y1) * 0.015
        except Exception:
            pass
        return 0
    dist = {n: float('inf') for n in graph}
    dist[start] = 0
    prev = {}
    pq = [(h(start), 0, start)]
    while pq:
        _, cost, u = heapq.heappop(pq)
        if cost > dist[u]:
            continue
        if u == end:
            break
        for v, w in graph[u].items():
            nd = dist[u] + w
            if nd < dist[v]:
                dist[v] = nd
                prev[v] = u
                heapq.heappush(pq, (nd + h(v), nd, v))
    if dist[end] == float('inf'):
        return []
    path, node = [], end
    while node in prev:
        path.append(node); node = prev[node]
    path.append(start); path.reverse()
    return path
`,
      },
      {
        label: "贪心最佳优先",
        code: `import heapq
import math

def solve(graph, start, end):
    # 只看启发值，不保证最优（无坐标时退化为 BFS）
    def h(u):
        try:
            if u in positions and end in positions:
                x1, y1 = positions[u]; x2, y2 = positions[end]
                return math.hypot(x2-x1, y2-y1)
        except Exception:
            pass
        return 0
    visited = set()
    prev = {}
    pq = [(h(start), start)]
    while pq:
        _, u = heapq.heappop(pq)
        if u in visited:
            continue
        visited.add(u)
        if u == end:
            break
        for v in graph[u]:
            if v not in visited:
                if v not in prev:
                    prev[v] = u
                heapq.heappush(pq, (h(v), v))
    if end not in prev and end != start:
        return []
    path, node = [], end
    while node in prev:
        path.append(node); node = prev[node]
    path.append(start); path.reverse()
    return path
`,
      },
      {
        label: "DFS",
        code: `def solve(graph, start, end):
    # 深度优先，找到一条路但不保证最短
    visited = set()
    prev = {}
    stack = [start]
    while stack:
        u = stack.pop()
        if u in visited:
            continue
        visited.add(u)
        if u == end:
            break
        for v in graph[u]:
            if v not in visited:
                prev[v] = u
                stack.append(v)
    if end not in prev and end != start:
        return []
    path, node = [], end
    while node in prev:
        path.append(node); node = prev[node]
    path.append(start); path.reverse()
    return path
`,
      },
    ],
    testCases: [
      {
        args: [{ A: { B: 1 }, B: {}, C: { D: 1 }, D: {} }, "A", "D"],
        expected: [],
        description: "不可达返回 []",
      },
      {
        args: [{ A: { B: 5 }, B: {} }, "A", "B"],
        expected: ["A", "B"],
        description: "直连路径",
      },
      {
        args: [{ A: { B: 2 }, B: { C: 3 }, C: {} }, "A", "C"],
        expected: ["A", "B", "C"],
        description: "链式路径",
      },
    ],
  },
  {
    id: "bearing-positioning",
    title: "定位分析",
    difficulty: "困难",
    description: `实现函数 solve(stations, measurements)，根据多个观测站的方位角测量值，求目标点经纬度。

stations: 观测站列表，每项为 {"id": str, "lng": float, "lat": float}
measurements: 测量列表，每项为 {"stationId": str, "bearingDeg": float}
  bearingDeg 为从正北方向顺时针的角度（0°=北，90°=东，180°=南，270°=西）

返回值：(lng, lat) 元组，表示目标点经纬度。

坐标系：lng 向东为正，lat 向北为正。
方位角公式：bearing = atan2(dlng, dlat)，其中 dlng=目标lng-站lng，dlat=目标lat-站lat

本次输入：
  stations = [
    {"id": "A", "lng": 116.350, "lat": 39.860},
    {"id": "B", "lng": 116.450, "lat": 39.860},
    {"id": "C", "lng": 116.420, "lat": 39.860}
  ]
  measurements = [
    {"stationId": "A", "bearingDeg": 51.34},
    {"stationId": "B", "bearingDeg": 308.66},
    {"stationId": "C", "bearingDeg": 333.43}
  ]

提示：可用最小二乘法联立多条方位线方程求解。
右侧面板会可视化观测站、方位线和你的解。`,
    starterCode: `def solve(stations, measurements):
    pass
`,
    solutions: [
      {
        label: "最小二乘法",
        code: `import math

def solve(stations, measurements):
    station_map = {s["id"]: (s["lng"], s["lat"]) for s in stations}
    A, b = [], []
    for m in measurements:
        slng, slat = station_map[m["stationId"]]
        theta = math.radians(m["bearingDeg"])
        cos_t = math.cos(theta)
        sin_t = math.sin(theta)
        A.append([cos_t, -sin_t])
        b.append(slng * cos_t - slat * sin_t)
    a00 = sum(r[0]*r[0] for r in A)
    a01 = sum(r[0]*r[1] for r in A)
    a11 = sum(r[1]*r[1] for r in A)
    b0  = sum(A[i][0]*b[i] for i in range(len(b)))
    b1  = sum(A[i][1]*b[i] for i in range(len(b)))
    det = a00*a11 - a01*a01
    if abs(det) < 1e-10:
        return (0.0, 0.0)
    lng = (a11*b0 - a01*b1) / det
    lat = (a00*b1 - a01*b0) / det
    return (lng, lat)
`,
      },
      {
        label: "直接交叉法（两站）",
        code: `import math

def solve(stations, measurements):
    station_map = {s["id"]: (s["lng"], s["lat"]) for s in stations}
    if len(measurements) < 2:
        return (0.0, 0.0)
    m1, m2 = measurements[0], measurements[1]
    lng1, lat1 = station_map[m1["stationId"]]
    lng2, lat2 = station_map[m2["stationId"]]
    t1 = math.radians(m1["bearingDeg"])
    t2 = math.radians(m2["bearingDeg"])
    d1x, d1y = math.sin(t1), math.cos(t1)
    d2x, d2y = math.sin(t2), math.cos(t2)
    denom = d1x*d2y - d1y*d2x
    if abs(denom) < 1e-10:
        return (0.0, 0.0)
    t = ((lng2-lng1)*d2y - (lat2-lat1)*d2x) / denom
    return (lng1 + t*d1x, lat1 + t*d1y)
`,
      },
      {
        label: "三站平均交叉",
        code: `import math

def solve(stations, measurements):
    # 对所有站对求交叉点，取平均
    station_map = {s["id"]: (s["lng"], s["lat"]) for s in stations}
    points = []
    ms = measurements
    for i in range(len(ms)):
        for j in range(i + 1, len(ms)):
            lng1, lat1 = station_map[ms[i]["stationId"]]
            lng2, lat2 = station_map[ms[j]["stationId"]]
            t1 = math.radians(ms[i]["bearingDeg"])
            t2 = math.radians(ms[j]["bearingDeg"])
            d1x, d1y = math.sin(t1), math.cos(t1)
            d2x, d2y = math.sin(t2), math.cos(t2)
            denom = d1x*d2y - d1y*d2x
            if abs(denom) < 1e-10:
                continue
            t = ((lng2-lng1)*d2y - (lat2-lat1)*d2x) / denom
            points.append((lng1 + t*d1x, lat1 + t*d1y))
    if not points:
        return (0.0, 0.0)
    return (sum(p[0] for p in points)/len(points),
            sum(p[1] for p in points)/len(points))
`,
      },
      {
        label: "梯度下降",
        code: `import math

def solve(stations, measurements):
    station_map = {s["id"]: (s["lng"], s["lat"]) for s in stations}
    # 最小化各方位线到点的距离平方和
    def loss_grad(lng, lat):
        loss, glng, glat = 0.0, 0.0, 0.0
        for m in measurements:
            slng, slat = station_map[m["stationId"]]
            theta = math.radians(m["bearingDeg"])
            # 法向量 (cos_t, -sin_t)，方位线方程: cos_t*(L-slng) - sin_t*(B-slat) = 0
            cos_t, sin_t = math.cos(theta), math.sin(theta)
            r = cos_t*(lng - slng) - sin_t*(lat - slat)
            loss += r * r
            glng += 2 * r * cos_t
            glat += 2 * r * (-sin_t)
        return loss, glng, glat
    # 初始点：所有站的重心
    lng = sum(s["lng"] for s in stations) / len(stations)
    lat = sum(s["lat"] for s in stations) / len(stations)
    lr = 0.0001
    for _ in range(2000):
        _, glng, glat = loss_grad(lng, lat)
        lng -= lr * glng
        lat -= lr * glat
        lr *= 0.9995
    return (lng, lat)
`,
      },
      {
        label: "加权最小二乘（距离权重）",
        code: `import math

def solve(stations, measurements):
    station_map = {s["id"]: (s["lng"], s["lat"]) for s in stations}
    # 迭代加权：距离越近权重越大
    lng = sum(s["lng"] for s in stations) / len(stations)
    lat = sum(s["lat"] for s in stations) / len(stations)
    for _ in range(10):
        A, b, w = [], [], []
        for m in measurements:
            slng, slat = station_map[m["stationId"]]
            theta = math.radians(m["bearingDeg"])
            cos_t, sin_t = math.cos(theta), math.sin(theta)
            dist = max(1e-6, math.hypot(lng - slng, lat - slat))
            weight = 1.0 / dist
            A.append([cos_t * weight, -sin_t * weight])
            b.append((slng * cos_t - slat * sin_t) * weight)
        a00 = sum(r[0]*r[0] for r in A)
        a01 = sum(r[0]*r[1] for r in A)
        a11 = sum(r[1]*r[1] for r in A)
        b0  = sum(A[i][0]*b[i] for i in range(len(b)))
        b1  = sum(A[i][1]*b[i] for i in range(len(b)))
        det = a00*a11 - a01*a01
        if abs(det) < 1e-10:
            break
        lng = (a11*b0 - a01*b1) / det
        lat = (a00*b1 - a01*b0) / det
    return (lng, lat)
`,
      },
    ],
    testCases: [
      {
        args: [
          [{ id: "A", lng: 116.350, lat: 39.860 }, { id: "B", lng: 116.450, lat: 39.860 }, { id: "C", lng: 116.420, lat: 39.860 }],
          [
            { stationId: "A", bearingDeg: 51.34 },
            { stationId: "B", bearingDeg: 308.66 },
            { stationId: "C", bearingDeg: 333.43 },
          ],
        ],
        expected: null,
        checkIsPosition: true,
        description: "返回一个经纬度位置 (lng, lat)",
      },
    ],
  },
];
