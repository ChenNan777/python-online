import type { FeatureCollection } from 'geojson';

import type { StudentOperationCodeVo, StudentTrainingAssignmentVO } from '@/services/admin/types';
import type { PositioningData, ShortestPathResult } from '@/types';
import {
  PATHFINDING_OPERATION_TYPE,
  PATHFINDING_WORK_TYPE,
  POSITIONING_OPERATION_TYPE,
  POSITIONING_WORK_TYPE,
} from '@/constants/challenge';
import { mergePositioningDataById, generatePositioningData } from '@/utils/generatePositioning';
import { parseRoadNetwork, type RoadNetwork } from '@/utils/parseRoadNetwork';

/**
 * 考试页适配层：集中处理“后端作业数据/历史记录/运行结果”到前端模型与提交 payload 的转换，
 * 避免页面里散落 JSON 解析、兜底文案、字段拼装等逻辑。
 */

/** 后端尚未提供按 targetId 拉取定位场景的接口时，页面统一展示该提示。 */
const FALLBACK_SCENE_NOTICE = '定位分析考试场景接口暂未提供，当前先回退本地场景数据。';

export type ExamPositioningSceneResult = {
  positioningData: PositioningData | null;
  sceneNotice: string | null;
};

/** 考试接口类型值：用于保存/提交时的 operationType（定位/路径规划）。 */
export function getOperationTypeByChallenge(isPositioningChallenge: boolean): string {
  return isPositioningChallenge ? POSITIONING_OPERATION_TYPE : PATHFINDING_OPERATION_TYPE;
}

/** 考试接口类型值：用于提交时的 workType（定位/路径规划）。 */
export function getWorkTypeByChallenge(isPositioningChallenge: boolean) {
  return isPositioningChallenge ? POSITIONING_WORK_TYPE : PATHFINDING_WORK_TYPE;
}

/** 把后端下发的路网 GeoJSON 解析为前端可用 RoadNetwork，并附带“场景提示”用于 UI 展示。 */
export function buildExamRoadNetwork(
  args: {
    assignment: StudentTrainingAssignmentVO | null;
    roadNetworkGeoJson: string | null;
  },
): { roadNetwork: RoadNetwork | null; sceneNotice: string | null } {
  const { assignment, roadNetworkGeoJson } = args;
  const startCoord =
    assignment?.startLongitude !== undefined && assignment.startLatitude !== undefined
      ? { lng: assignment.startLongitude, lat: assignment.startLatitude }
      : undefined;
  const endCoord =
    assignment?.targetLongitude !== undefined && assignment.targetLatitude !== undefined
      ? { lng: assignment.targetLongitude, lat: assignment.targetLatitude }
      : undefined;

  if (!roadNetworkGeoJson) {
    return { roadNetwork: null, sceneNotice: '当前考试未下发路网数据。' };
  }

  try {
    const geojson = JSON.parse(roadNetworkGeoJson) as FeatureCollection;
    const roadNetwork = parseRoadNetwork(geojson, {
      startCoord,
      endCoord,
    });

    return { roadNetwork, sceneNotice: null };
  } catch {
    return { roadNetwork: null, sceneNotice: '考试路网数据解析失败。' };
  }
}

/**
 * 构建定位题的考试场景数据。
 * 当前后端接口未就绪，因此使用本地样例数据兜底，并用 assignment.targetId 覆盖目标身份。
 */
export function buildExamPositioningScene(
  assignment: StudentTrainingAssignmentVO | null,
): ExamPositioningSceneResult {
  if (assignment == null) {
    return { positioningData: null, sceneNotice: '当前考试作业信息未加载。' };
  }

  /** 先生成本地样例场景，再用考试作业中的 targetId 覆盖目标身份，保持展示链路可用。 */
  const fallback = generatePositioningData();

  const hasTrueTarget =
    assignment.targetLongitude !== undefined && assignment.targetLatitude !== undefined;
  const trueTarget = hasTrueTarget
    ? { lng: assignment.targetLongitude!, lat: assignment.targetLatitude! }
    : fallback.trueTarget;

  const targetId = assignment?.targetId;
  return {
    positioningData: mergePositioningDataById({
      stations: fallback.stations,
      measurements: fallback.stations.map((station) => ({
        stationId: station.id,
        bearingDeg: station.bearingDeg,
      })),
      trueTarget,
      targetId,
      source: hasTrueTarget ? 'exam' : 'fallback',
    }),
    sceneNotice: FALLBACK_SCENE_NOTICE,
  };
}

/** 预留的异步接口形态：后续若接入真实“按 targetId 拉取定位场景”的接口，只需替换这里的实现。 */
export async function fetchExamPositioningScene(
  assignment: StudentTrainingAssignmentVO,
): Promise<ExamPositioningSceneResult> {
  return buildExamPositioningScene(assignment);
}

/** 从历史记录里取“最新一条”的 sourceCode，用于编辑器初始化/恢复。 */
export function getLatestHistoryCode(records: StudentOperationCodeVo[]): string | null {
  let latestRecord: StudentOperationCodeVo | null = null;
  let latestTime = Number.NEGATIVE_INFINITY;

  for (const record of records) {
    const timeText = record.updatedAt ?? record.submitTime ?? record.createdAt ?? '';
    const parsed = Date.parse(timeText);
    const recordTime = Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
    if (latestRecord === null || recordTime > latestTime) {
      latestRecord = record;
      latestTime = recordTime;
    }
  }

  return latestRecord?.sourceCode ?? null;
}

/** 把 Python 运行出的路径规划结果转换成提交接口需要的 payload（经纬度 waypoints）。 */
export function buildPathPlanningSubmitPayload(args: {
  result: ShortestPathResult | null;
  roadNetwork: RoadNetwork | null;
}) {
  const { result, roadNetwork } = args;
  if (!result || !roadNetwork) {
    return null;
  }

  // 优先提交用户实际运行出的路径，没有时再回退到算法默认路径。
  const selectedPath = result.userPath && result.userPath.length > 0 ? result.userPath : result.path;
  if (!selectedPath || selectedPath.length === 0) {
    return null;
  }

  const waypoints = selectedPath
    .map((nodeId, index) => {
      const coord = roadNetwork.positions[nodeId];
      if (!coord) {
        return null;
      }

      return {
        longitude: coord[0],
        latitude: coord[1],
        sequence: index + 1,
      };
    })
    .filter((waypoint): waypoint is { longitude: number; latitude: number; sequence: number } => waypoint !== null);

  if (waypoints.length === 0) {
    return null;
  }

  return {
    planningResult: {
      pathId: `path-${Date.now()}`,
      algorithmUsed: 'python-user-solution',
      totalDistance: result.totalWeight,
      estimatedDuration: undefined,
      waypoints,
    },
  };
}
