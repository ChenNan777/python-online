export type ChallengeType = 'positioning' | 'pathfinding';
export type TaskProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ChallengePanelTab = 'map-debug' | 'positioning-debug';

// 调试面板 Tab
export const MAP_DEBUG_PANEL_TAB: ChallengePanelTab = 'map-debug';
export const POSITIONING_DEBUG_PANEL_TAB: ChallengePanelTab = 'positioning-debug';

// 挑战类型常量
export const POSITIONING_TYPE: ChallengeType = 'positioning';
export const PATHFINDING_TYPE: ChallengeType = 'pathfinding';

// 后端角色 ID
export const POSITIONING_TASK_ROLE_ID = '2';
export const PATHFINDING_TASK_ROLE_ID = '3';

// 挑战 ID
export const POSITIONING_CHALLENGE_ID = 'bearing-positioning';
export const PATHFINDING_CHALLENGE_ID = 'shortest-path';
export type ChallengeId = typeof POSITIONING_CHALLENGE_ID | typeof PATHFINDING_CHALLENGE_ID;

const CHALLENGE_TYPE_TO_ID: Record<ChallengeType, ChallengeId> = {
  [POSITIONING_TYPE]: POSITIONING_CHALLENGE_ID,
  [PATHFINDING_TYPE]: PATHFINDING_CHALLENGE_ID,
};

const ROLE_LABEL_MAP: Record<ChallengeType, string> = {
  [POSITIONING_TYPE]: '定位分析',
  [PATHFINDING_TYPE]: '路径规划',
};

const ROLE_EXPECTED_STATUS_MAP: Record<ChallengeType, number> = {
  [POSITIONING_TYPE]: 2,
  [PATHFINDING_TYPE]: 3,
};

const TASK_STAGE_TEXT_MAP: Record<number, string> = {
  0: '已创建',
  1: '准备就绪',
  2: '目标侦察阶段进行中',
  3: '路径规划阶段进行中',
  4: '目标捕获阶段进行中',
  5: '已完成',
  6: '已取消',
};

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

  return PATHFINDING_TYPE;
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

  // 0/1: 未开始
  if (statusNum < 2) {
    return 'not_started';
  }

  // 2~4: 进行中
  if (statusNum >= 2 && statusNum <= 4) {
    return 'in_progress';
  }

  return 'completed';
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
