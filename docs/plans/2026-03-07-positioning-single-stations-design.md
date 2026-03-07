# 定位分析单参数 stations 设计

**目标**

- 将定位分析题目的实现函数从 `solve(stations, measurements)` 统一改为 `solve(stations)`。
- 统一定位分析运行时、题面、示例解法、测试用例和可视化逻辑，全部围绕单一 `stations` 数据模型展开。

## 设计结论

- `stations` 每项统一为 `{"id": str, "lng": float, "lat": float, "bearingDeg": float}`。
- 前端数据模型不再让运行时和 UI 直接依赖独立 `measurements`。
- 数据装配层仍保留“按 ID 合并”的职责，但合并结果直接作为标准 `stations` 暴露给题目与面板。

## 影响范围

- 题目描述、starter code、示例解法、测试用例
- 定位场景数据类型与本地数据生成逻辑
- Python 上下文注入逻辑
- Pyodide worker 对定位题的调用方式
- 地图面板与定位面板的方位线/标签渲染
- 考试模式定位场景 fallback 装配

## 数据模型

- 新的定位站点结构：
  - `id`
  - `lng`
  - `lat`
  - `bearingDeg`
  - `frequency?`
- `PositioningData` 以合并后的 `stations` 为核心。
- `mergePositioningDataById` 继续负责把原始 `stations + measurements` 通过 `stationId -> id` 合并为单列表。

## 运行时逻辑

- `buildPositioningSetup` 只向 Python 注入一个 `stations`。
- worker 只检查 `stations` 是否存在，并以 `solve(stations)` 调用。
- 这样练习与考试模式都共享同一套定位题调用约定。

## UI 逻辑

- `MapPanel` 和 `PositioningPanel` 直接从 `station.bearingDeg` 读取方位角。
- 不再在展示层临时构建 `measurementMap` 或按 `stationId` 回查。

## 验收标准

- 题面清晰展示单参数签名 `solve(stations)`。
- 所有示例解法在单参数模型下语义正确。
- worker 成功调用 `solve(stations)` 并返回定位结果。
- 地图面板和定位面板仍能展示观测站、方位线和方位角标签。
- `npm run lint` 和 `npm run build` 通过。
