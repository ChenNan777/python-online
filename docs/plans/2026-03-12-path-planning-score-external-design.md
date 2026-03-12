# 路径规划计算与路程消耗对外说明设计

**日期**：2026-03-12  
**适用范围**：考试模式路径规划场景（对外系统对接）  
**文档目标**：说明当前已实现的路径规划计算与路程消耗口径，供外部系统消费与对齐。

## 1. 架构与职责边界

### 1.1 目标定义

- 仅说明“当前实现”的路径规划计算与路程消耗逻辑。
- 输出面向外部系统可用的规则、字段与示例。
- 不引入新评分公式，不修改现有前后端职责。

### 1.2 职责划分

- 前端负责：
  - 基于路网构建图并运行用户算法；
  - 计算并提交路径结果与 `totalDistance`（路程消耗输入值）；
  - 提供最优路径对比用于展示与校验。
- 后端负责：
  - 基于提交结果执行最终评分；
  - 产出评分字段（如 `distanceScore`、`complianceScore`、`totalScore`）。

### 1.3 非目标

- 不定义新的评分函数。
- 不新增或变更现有接口。
- 不展开练习模式 UI 细节。

## 2. 数据流与计算规则（现状口径）

### 2.1 输入数据

- 路网输入：GeoJSON（道路几何 + 可选 `weight` 因子）。
- 运行输入：`graph`、`positions`、`start`、`end` 注入 Python 上下文。

### 2.2 图构建规则

1. 遍历道路坐标段，使用 Haversine 计算每段地理距离（米）。
2. 计算边权重：`segmentWeight = distanceMeters * weightFactor`。
3. 其中 `weightFactor` 来自路段属性 `weight`，缺省值为 `1.0`。
4. 生成邻接表：`graph[u][v] = segmentWeight`。
5. 对非单行线道路生成双向边。

### 2.3 用户结果计算规则

- 若 `solve` 返回路径数组：
  - 前端按相邻节点在 `graph` 中查权重并累加，得到 `user_w`。
- 若 `solve` 返回数字：
  - 直接作为 `user_w`。
- 若 `solve` 返回对象：
  - 读取 `{ total_weight, path }`。
- 异常或无效结果：
  - `user_w = -1`，路径为空。

### 2.4 最优路径对比规则

- 系统内置最优解函数得到 `opt_path` 与 `opt_w`。
- 前端展示“用户权重 vs 最优权重”，用于可视化对比和有效性判断。
- 前端不在此阶段计算最终评分分值。

### 2.5 提交规则

1. 优先提交用户实际运行路径 `userPath`。
2. 若无 `userPath`，回退提交默认路径 `path`。
3. 提交字段中：
   - `planningResult.totalDistance = result.totalWeight`
   - `planningResult.waypoints[]` 为经纬度序列。

## 3. 字段契约与示例

### 3.1 关键字段定义

- `graph`：邻接表；键为节点 ID，值为相邻节点权重。
- `start` / `end`：路径规划起终点节点 ID。
- `planningResult.totalDistance`：路程消耗输入值（来自 `totalWeight`）。
- `planningResult.waypoints[]`：路径点集合，字段：
  - `longitude`：经度
  - `latitude`：纬度
  - `sequence`：路径顺序（从 1 开始）

### 3.2 有效性判定（对接建议）

- `waypoints` 非空且可按 `sequence` 还原路径顺序。
- `totalDistance >= 0` 视为有效结果。
- `totalDistance = -1` 或空路径视为无效结果。

### 3.3 提交示例

```json
{
  "planningResult": {
    "pathId": "path-1710000000000",
    "algorithmUsed": "python-user-solution",
    "totalDistance": 3287.42,
    "waypoints": [
      { "longitude": 113.0464, "latitude": 28.2504, "sequence": 1 },
      { "longitude": 113.0446, "latitude": 28.2519, "sequence": 2 },
      { "longitude": 113.0412, "latitude": 28.2551, "sequence": 3 }
    ]
  }
}
```

### 3.4 外部系统消费建议

- 以 `planningResult.totalDistance` 作为“路程消耗”输入值。
- 最终分数字段由后端评分服务计算并返回，外部系统按后端结果展示。

## 4. 异常处理与测试口径

### 4.1 异常场景

- 用户算法报错或无返回：视为无有效路径，不进入正常评分流程。
- 路径节点缺失坐标：坐标点过滤后若为空，不提交有效 `planningResult`。
- 提交前未生成有效路径：前端阻断提交并提示。

### 4.2 对接验证建议

建议外部系统至少覆盖以下校验：

1. **字段完整性**：`totalDistance`、`waypoints`、`sequence` 连续性。
2. **数值有效性**：`totalDistance` 非负、经纬度为可解析数值。
3. **顺序一致性**：按 `sequence` 还原路径后与业务预期一致。
4. **异常兼容性**：对空路径、`-1`、缺失字段的处理一致。

## 5. 对接结论

- 当前口径下，“路程消耗”由前端运行结果产生并提交；“最终得分”由后端计算。
- 外部系统应以提交结构和后端评分输出为准，不应自行引入新评分公式。
- 本文档用于跨系统对齐计算口径，后续若评分规则变化，应由后端契约版本统一发布。
