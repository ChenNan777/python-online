export type ChallengeType = 'positioning' | 'pathfinding' | 'unassigned';
export type TaskProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ChallengePanelTab = 'map-debug' | 'positioning-debug';

// 调试面板 Tab
export const MAP_DEBUG_PANEL_TAB: ChallengePanelTab = 'map-debug';
export const POSITIONING_DEBUG_PANEL_TAB: ChallengePanelTab = 'positioning-debug';

// 挑战类型常量
export const POSITIONING_TYPE: ChallengeType = 'positioning';
export const PATHFINDING_TYPE: ChallengeType = 'pathfinding';
export const UNASSIGNED_TYPE: ChallengeType = 'unassigned';

// 任务状态常量定义
export const TASK_STATUS_READY = 0;
export const TASK_STATUS_START_TASK = 1;
export const TASK_STATUS_DRONE_LAUNCH = 2;
export const TASK_STATUS_SIGNAL_RECONNAISSANCE = 3;
export const TASK_STATUS_POSITIONING_ANALYSIS = 4;
export const TASK_STATUS_PATH_PLANNING = 5;
export const TASK_STATUS_RAID_CAPTURE = 6;
export const TASK_STATUS_END_TASK = 7;

// 后端角色 ID
export const POSITIONING_TASK_ROLE_ID = '2';
export const PATHFINDING_TASK_ROLE_ID = '3';

// 考试接口类型值（用于保存/提交时的 operationType/workType）
export const POSITIONING_OPERATION_TYPE = '1';
export const PATHFINDING_OPERATION_TYPE = '2';
export const POSITIONING_WORK_TYPE = 4 as const;
export const PATHFINDING_WORK_TYPE = 5 as const;

// 挑战 ID
export const POSITIONING_CHALLENGE_ID = 'bearing-positioning';
export const PATHFINDING_CHALLENGE_ID = 'shortest-path';
export const UNASSIGNED_CHALLENGE_ID = 'unassigned';
export type ChallengeId = typeof POSITIONING_CHALLENGE_ID | typeof PATHFINDING_CHALLENGE_ID | typeof UNASSIGNED_CHALLENGE_ID;

export type ExamChallengeMeta = {
  role: ChallengeType;
  operationType: typeof POSITIONING_OPERATION_TYPE | typeof PATHFINDING_OPERATION_TYPE;
  workType: typeof POSITIONING_WORK_TYPE | typeof PATHFINDING_WORK_TYPE;
};

export const EXAM_META_BY_CHALLENGE_ID: Record<ChallengeId, ExamChallengeMeta> = {
  [POSITIONING_CHALLENGE_ID]: {
    role: POSITIONING_TYPE,
    operationType: POSITIONING_OPERATION_TYPE,
    workType: POSITIONING_WORK_TYPE,
  },
  [PATHFINDING_CHALLENGE_ID]: {
    role: PATHFINDING_TYPE,
    operationType: PATHFINDING_OPERATION_TYPE,
    workType: PATHFINDING_WORK_TYPE,
  },
  unassigned: {
    role: UNASSIGNED_TYPE,
    operationType: "2",
    workType: 4
  }
};

const CHALLENGE_TYPE_TO_ID: Record<ChallengeType, ChallengeId> = {
  [POSITIONING_TYPE]: POSITIONING_CHALLENGE_ID,
  [PATHFINDING_TYPE]: PATHFINDING_CHALLENGE_ID,
  [UNASSIGNED_TYPE]: UNASSIGNED_CHALLENGE_ID,
};

// 在ROLE_LABEL_MAP中添加UNASSIGNED_TYPE的标签定义
export const ROLE_LABEL_MAP: Record<ChallengeType, string> = {
  [POSITIONING_TYPE]: '定位分析',
  [PATHFINDING_TYPE]: '路径规划',
  [UNASSIGNED_TYPE]: '未分配',
};

const ROLE_EXPECTED_STATUS_MAP: Record<ChallengeType, number> = {
  [POSITIONING_TYPE]: TASK_STATUS_POSITIONING_ANALYSIS,
  [PATHFINDING_TYPE]: TASK_STATUS_PATH_PLANNING,
  [UNASSIGNED_TYPE]: TASK_STATUS_READY,
};

const TASK_STAGE_TEXT_MAP: Record<number, string> = {
  [TASK_STATUS_READY]: '准备就绪',
  [TASK_STATUS_START_TASK]: '开始任务',
  [TASK_STATUS_DRONE_LAUNCH]: '无人机放飞',
  [TASK_STATUS_SIGNAL_RECONNAISSANCE]: '信号侦察',
  [TASK_STATUS_POSITIONING_ANALYSIS]: '定位分析',
  [TASK_STATUS_PATH_PLANNING]: '路径规划',
  [TASK_STATUS_RAID_CAPTURE]: '奔袭捕获',
  [TASK_STATUS_END_TASK]: '结束任务',
};

const NOT_STARTED_TASK_STATUS_SET = new Set<number>([
  TASK_STATUS_READY,
  TASK_STATUS_START_TASK,
  TASK_STATUS_DRONE_LAUNCH,
  TASK_STATUS_SIGNAL_RECONNAISSANCE,
]);

const IN_PROGRESS_TASK_STATUS_SET = new Set<number>([
  TASK_STATUS_POSITIONING_ANALYSIS,
  TASK_STATUS_PATH_PLANNING,
  TASK_STATUS_RAID_CAPTURE,
]);

function parseTaskStatusNumber(taskStatus: string | undefined): number {
  return parseInt(taskStatus || '0', 10);
}

export function getChallengeIdByType(type: string | undefined): ChallengeId | null {
  // 未知类型返回 null
  if (type === POSITIONING_TYPE || type === PATHFINDING_TYPE) {
    return CHALLENGE_TYPE_TO_ID[type];
  }

  return null;
}

export function getRoleByTaskRoleId(taskRoleId: string): ChallengeType {
  // 2=定位，3=路径规划
  if (taskRoleId === POSITIONING_TASK_ROLE_ID) {
    return POSITIONING_TYPE;
  }

  if (taskRoleId === PATHFINDING_TASK_ROLE_ID) {
    return PATHFINDING_TYPE;
  }

  return UNASSIGNED_TYPE;
}

export function getRoleLabel(role: ChallengeType): string {
  return ROLE_LABEL_MAP[role];
}

export function getExpectedTaskStatusByRole(role: ChallengeType): number {
  return ROLE_EXPECTED_STATUS_MAP[role];
}

export function getTaskStageText(taskStatus: string): string {
  const statusNum = parseTaskStatusNumber(taskStatus);
  return TASK_STAGE_TEXT_MAP[statusNum] || '未知状态';
}

export function getTaskProgressStatus(taskStatus: string): TaskProgressStatus {
  const statusNum = parseTaskStatusNumber(taskStatus);

  if (NOT_STARTED_TASK_STATUS_SET.has(statusNum)) {
    return 'not_started';
  }

  if (IN_PROGRESS_TASK_STATUS_SET.has(statusNum)) {
    return 'in_progress';
  }

  if (statusNum === TASK_STATUS_END_TASK) {
    return 'completed';
  }

  return 'not_started';
}

export function getChallengeStartState(role: ChallengeType, taskStatus: string | undefined): {
  canStart: boolean;
  buttonText: string;
} {
  // Dashboard 按钮状态
  const taskStatusNum = parseTaskStatusNumber(taskStatus);
  const expectedStatus = getExpectedTaskStatusByRole(role);
  const roleText = getRoleLabel(role);
  const canStart = taskStatusNum === expectedStatus;

  if (canStart) {
    return {
      canStart,
      buttonText: `开始${roleText}作业`,
    };
  }

  if (taskStatusNum < expectedStatus) {
    return {
      canStart,
      buttonText: '未开始',
    };
  }

  return {
    canStart,
    buttonText: '已结束',
  };
}

export function getChallengePanelTab(challengeId: ChallengeId): ChallengePanelTab {
  // 路径规划显示地图调试
  if (challengeId === PATHFINDING_CHALLENGE_ID) {
    return MAP_DEBUG_PANEL_TAB;
  }

  return POSITIONING_DEBUG_PANEL_TAB;
}
