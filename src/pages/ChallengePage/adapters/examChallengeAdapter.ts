import type { FeatureCollection } from 'geojson';

import type { StudentOperationCodeVo, StudentTrainingAssignmentVO } from '@/services/admin/types';
import type { PositioningData, ShortestPathResult } from '@/types';
import { mergePositioningDataById, generatePositioningData } from '@/utils/generatePositioning';
import { parseRoadNetwork, type RoadNetwork } from '@/utils/parseRoadNetwork';

// 后端尚未提供按 targetId 拉取定位场景的接口时，页面统一展示该提示。
const FALLBACK_SCENE_NOTICE = '定位分析考试场景接口暂未提供，当前先回退本地场景数据。';

export type ExamPositioningSceneResult = {
  positioningData: PositioningData | null;
  sceneNotice: string | null;
};

export function getOperationTypeByChallenge(isPositioningChallenge: boolean): string {
  return isPositioningChallenge ? '1' : '2';
}

export function getWorkTypeByChallenge(isPositioningChallenge: boolean): 4 | 5 {
  return isPositioningChallenge ? 4 : 5;
}

export function buildExamRoadNetwork(
  assignment: StudentTrainingAssignmentVO | null,
): { roadNetwork: RoadNetwork | null; sceneNotice: string | null } {
  if (!assignment?.roadNetworkGeoJson) {
    return { roadNetwork: null, sceneNotice: '当前考试未下发路网数据。' };
  }

  try {
    const geojson = JSON.parse(assignment.roadNetworkGeoJson) as FeatureCollection;
    const roadNetwork = parseRoadNetwork(geojson, {
      startCoord:
        assignment.startLongitude !== undefined && assignment.startLatitude !== undefined
          ? { lng: assignment.startLongitude, lat: assignment.startLatitude }
          : undefined,
      endCoord:
        assignment.targetLongitude !== undefined && assignment.targetLatitude !== undefined
          ? { lng: assignment.targetLongitude, lat: assignment.targetLatitude }
          : undefined,
    });

    return { roadNetwork, sceneNotice: null };
  } catch {
    return { roadNetwork: null, sceneNotice: '考试路网数据解析失败。' };
  }
}

export function buildExamPositioningScene(
  assignment: StudentTrainingAssignmentVO | null,
): ExamPositioningSceneResult {
  if (!assignment) {
    return { positioningData: null, sceneNotice: '当前考试作业信息未加载。' };
  }

  // 先生成本地样例场景，再用考试作业中的 targetId 覆盖目标身份，保持展示链路可用。
  const fallback = generatePositioningData();

  return {
    positioningData: mergePositioningDataById({
      stations: fallback.stations,
      measurements: fallback.stations.map((station) => ({
        stationId: station.id,
        bearingDeg: station.bearingDeg,
      })),
      trueTarget: fallback.trueTarget,
      targetId: assignment.targetId,
      source: 'fallback',
    }),
    sceneNotice: FALLBACK_SCENE_NOTICE,
  };
}

export async function fetchExamPositioningScene(
  assignment: StudentTrainingAssignmentVO,
): Promise<ExamPositioningSceneResult> {
  return buildExamPositioningScene(assignment);
}

export function getLatestHistoryCode(records: StudentOperationCodeVo[]): string | null {
  // 后端时间字段来源不统一，按可用时间倒序兜底选最近一次代码。
  const latestRecord = [...records].sort((left, right) => {
    const leftTime = Date.parse(left.updatedAt ?? left.submitTime ?? left.createdAt ?? '');
    const rightTime = Date.parse(right.updatedAt ?? right.submitTime ?? right.createdAt ?? '');
    return rightTime - leftTime;
  })[0];

  return latestRecord?.sourceCode ?? null;
}

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
