# 考试模式定位场景切换到 UAV 接口计划

## Summary
- 目标：基于 [uav.ts](file:///d:/Project/private/web/python-online/src/services/uav.ts) 替换**定位分析链路**（非路径规划）中的天线数据来源。
- 范围：仅考试模式（`ExamChallengePage`），练习模式保持现状。
- 策略：不重写定位算法，仅替换输入数据；失败时按你的要求“直接报错阻断”（不再回退本地场景）。

## Current State Analysis
- 当前考试定位场景由 `buildExamPositioningScene` 生成本地 fallback 数据，核心来源是 `generatePositioningData`：  
  [examChallengeAdapter.ts](file:///d:/Project/private/web/python-online/src/pages/ChallengePage/adapters/examChallengeAdapter.ts#L75-L105)  
  [generatePositioning.ts](file:///d:/Project/private/web/python-online/src/utils/generatePositioning.ts#L59-L75)
- `fetchExamPositioningScene` 目前只是同步返回 fallback 场景：  
  [examChallengeAdapter.ts](file:///d:/Project/private/web/python-online/src/pages/ChallengePage/adapters/examChallengeAdapter.ts#L108-L112)
- `sceneQuery.data` 不存在时，页面会再次回退本地场景：  
  [ExamChallengePage.tsx](file:///d:/Project/private/web/python-online/src/pages/ChallengePage/ExamChallengePage.tsx#L115-L121)
- UAV 接口已具备独立客户端与服务封装：  
  [httpClient.ts](file:///d:/Project/private/web/python-online/src/utils/httpClient.ts) 中 `uavHttpClient`  
  [uav.ts](file:///d:/Project/private/web/python-online/src/services/uav.ts#L5-L30)
- 现有定位运行链路在 `positioningData` 为 `null` 时不会注入 stations，提交会因无 `positioningResult` 被阻断：  
  [positioningSetup.ts](file:///d:/Project/private/web/python-online/src/pages/ChallengePage/domain/positioningSetup.ts#L4-L11)  
  [ExamChallengePage.tsx](file:///d:/Project/private/web/python-online/src/pages/ChallengePage/ExamChallengePage.tsx#L272-L276)

## Assumptions & Decisions
- 已确认决策：
  - 替换范围：定位分析链路。
  - 生效范围：仅考试模式。
  - 算法目标：只改数据源，不重写定位解算算法。
  - `uavId` 来源：`assignment.targetId`。
  - 失败策略：接口失败直接报错阻断，不回退本地场景。
  - 站点标识：按设备名生成（`station.id = deviceName`）。
- 约束：
  - 不改路径规划建图/最短路逻辑（`parseRoadNetwork`、`pathfindingSetup` 不动）。
  - 不调整练习模式数据源。

## Proposed Changes

### 1) 适配层：改造考试定位场景构建逻辑
- 文件：`src/pages/ChallengePage/adapters/examChallengeAdapter.ts`
- 变更：
  - 新增“UAV 响应 -> PositioningData”适配函数（内部私有函数）：
    - 输入：`deviceListInfo` + `smodeByUavId` + `assignment.targetLongitude/targetLatitude`。
    - 输出：`PositioningData`（`stations`、`trueTarget`、`targetId`、`source: 'exam'`）。
  - `fetchExamPositioningScene` 改为真实异步流程：
    1. 校验 `assignment.targetId` 可转为数值 `uavId`，否则抛错。
    2. 调用 `getUavSignalDeviceListInfo()` 与 `getUavSignalSmodeByUavId(uavId)`。
    3. 合并为 `PositioningData`：
       - `station.id` 使用 `deviceName`。
       - 以 `smode` 为测向主数据（`aoa -> bearingDeg`）。
       - 站点经纬度优先取 `smode.localLongitude/localLatitude`，缺失时回退到设备列表同端口坐标。
       - 如果必须字段不足（如无有效测向记录），抛错。
    4. 成功返回 `{ positioningData, sceneNotice: null }`。
  - 保留 `buildExamPositioningScene` 供其他流程使用，但**考试主链路不再回退到它**。

### 2) 页面层：移除考试定位的 fallback，显式阻断
- 文件：`src/pages/ChallengePage/ExamChallengePage.tsx`
- 变更：
  - `positioningScene` 计算逻辑改为：
    - 有 `sceneQuery.data` 用 query 数据。
    - `sceneQuery.error` 时返回 `positioningData: null` + 错误文案（不调用 `buildExamPositioningScene`）。
    - 首次加载中保持 `null` 并展示“定位场景加载中”。
  - `sceneNotice` 优先展示 `sceneQuery.error` 的业务错误文案。
  - 结果：考试定位模式在 UAV 接口失败时，无法形成可运行场景与可提交结果，符合“直接报错阻断”。

### 3) 服务层：保持 `uav.ts` 为唯一接口入口（只做小幅补强）
- 文件：`src/services/uav.ts`（按需）
- 变更：
  - 维持当前 `uavHttpClient` 调用方式。
  - 如需要，在服务层补一层返回值校验（空数组/无 data 时抛语义错误），便于适配层统一处理。

### 4) 类型层：复用现有 UAV 类型，不新增协议字段
- 文件：`src/types/uav.ts`
- 变更：
  - 继续使用现有 `UavSignalDeviceInfo`、`UavSignalSmodeRecord`。
  - 不改接口协议字段，仅在适配层完成字段映射与缺省处理。

## Edge Cases / Failure Modes
- `targetId` 为空或非数字：直接抛错，页面显示“uavId 无效”。
- `getSmodeByUavId` 返回业务码 `1001`：通过现有 httpClient 业务错误链路抛错，页面阻断。
- `smode` 数据为空：抛错并阻断。
- 设备经纬度为空且 smode 也无坐标：该记录不纳入 stations；若全部无效则抛错。
- 多条 smode 同端口：取最新 `createTime/toaDatetime` 记录作为该站当前 bearing。

## Verification Steps
- 静态检查：
  - `npx tsc -p tsconfig.app.json --noEmit`
  - `npm run lint`
- 构建验证：
  - `npm run build`
- 场景验证（本地）：
  - 考试定位题 + 可用 `targetId`：应成功显示站点与测向线，`sceneNotice` 无 fallback 提示。
  - 模拟 `getSmodeByUavId` 失败（如 `uavId=9999`）：页面显示错误提示，且不再回退本地场景。
  - 练习模式：行为不变（继续使用本地样例）。
