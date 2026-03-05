import { httpClient } from '../utils/httpClient';
import type { ApiResponse, TaskInfoApiResponse } from '../types/api';
import type { User } from '../types/auth';

/**
 * 将时间数组转换为 Date 对象
 */
function parseTimeArray(timeArray: number[]): Date {
  const [year, month, day, hour, minute, second] = timeArray;
  return new Date(year, month - 1, day, hour, minute, second);
}

/**
 * 获取任务阶段文本
 */
function getTaskStageText(taskStatus: string): string {
  const statusNum = parseInt(taskStatus, 10);
  const stageMap: Record<number, string> = {
    0: '已创建',
    1: '准备就绪',
    2: '目标侦察阶段进行中',
    3: '路径规划阶段进行中',
    4: '目标捕获阶段进行中',
    5: '已完成',
    6: '已取消',
  };
  return stageMap[statusNum] || '未知状态';
}

/**
 * 获取成员角色文本
 */
function getMemberRoleText(taskRoleId: string): string {
  return taskRoleId === '2' ? '定位分析' : '路径规划';
}

/**
 * 将 API 任务信息转换为应用 User 对象
 */
function adaptTaskInfoToUser(apiData: TaskInfoApiResponse, username: string, userId: string): User {
  // 根据 taskRoleId 判断角色
  const role = apiData.taskRoleId === '2' ? 'positioning' : 'pathfinding';

  // 根据 taskStatus 判断任务状态
  const taskStatusNum = parseInt(apiData.taskStatus, 10);
  let taskStatus: 'not_started' | 'in_progress' | 'completed';
  if (taskStatusNum < 2) {
    taskStatus = 'not_started';
  } else if (taskStatusNum >= 2 && taskStatusNum <= 4) {
    taskStatus = 'in_progress';
  } else {
    taskStatus = 'completed';
  }

  return {
    id: userId,
    username,
    role,
    team: {
      id: apiData.teamId,
      name: apiData.teamName,
    },
    task: {
      id: apiData.taskId,
      name: apiData.taskName,
      description: '', // 不再使用 description 字段
      status: taskStatus,
      startTime: parseTimeArray(apiData.startTime),
      endTime: parseTimeArray(apiData.endTime),
      // 添加额外字段供页面使用
      stage: getTaskStageText(apiData.taskStatus),
      memberName: apiData.memberName,
      memberRole: getMemberRoleText(apiData.taskRoleId),
      taskStatus: apiData.taskStatus, // 保留原始 taskStatus
    },
  };
}

/**
 * 获取任务信息
 */
export async function getTaskInfo(username: string, userId: string): Promise<User> {
  const response = await httpClient.get<ApiResponse<TaskInfoApiResponse>>('/workPlatform/task');

  if (response.data.code !== 200) {
    throw new Error(response.data.message || '获取任务信息失败');
  }

  return adaptTaskInfoToUser(response.data.data, username, userId);
}
