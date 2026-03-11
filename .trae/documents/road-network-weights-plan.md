# 路网权重支持开发计划

## 1. 目标
支持路网数据（GeoJSON）中携带的 `weight` 属性，并在路径规划算法中体现该权重的影响。

## 2. 核心变更
### 2.1 解析逻辑更新
- **文件**: `src/utils/parseRoadNetwork.ts`
- **变更点**:
  - 在遍历 GeoJSON Feature 时，读取 `feature.properties.weight`。
  - 修改边权重计算公式：`EdgeWeight = Distance * (WeightFactor ?? 1.0)`。
  - 确保权重因子被正确应用到该 Feature 下拆分出的所有细分边上。

### 2.2 类型定义
- 确认 `RoadNetwork` 类型无需变更（`graph` 结构存储的是最终数值权重，对消费者透明）。
- 确认 GeoJSON 的 `Feature` 类型是标准的，属性通常是 `any`，但在代码中应做安全访问。

## 3. 验证方案
- **单元测试/手动验证**:
  - 使用带有 `weight` 属性的模拟 GeoJSON 数据运行 `parseRoadNetwork`。
  - 验证生成的 `graph` 中，对应边的权重是否等于 `距离 * 权重`。
- **界面验证**:
  - 在 `RoadNetworkConfigPage` 中修改权重（目前仅修改了本地 state），若要验证算法效果，需确保 `RoadNetworkConfigPage` 或 `ChallengePage` 能加载带有权重的 GeoJSON。
  - (可选) 在 `RoadNetworkConfigPage` 增加一个“重新计算图”的逻辑来预览效果，或者仅确认代码逻辑正确。

## 4. 开发任务
1. [ ] **修改解析器**: 更新 `src/utils/parseRoadNetwork.ts`，集成权重计算逻辑。
2. [ ] **验证逻辑**: 检查生成的图数据是否包含预期的加权数值。
