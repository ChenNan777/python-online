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
  } else if (taskStatusNum === 2) {
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
      description: `任务成员: ${apiData.memberName}`,
      status: taskStatus,
      startTime: parseTimeArray(apiData.startTime),
      endTime: parseTimeArray(apiData.endTime),
    },
  };
}

/**
 * 获取任务信息
 */
export async function getTaskInfo(username: string, userId: string): Promise<User> {
  const response = await httpClient.get<ApiResponse<TaskInfoApiResponse>>('/workPlatform/list');

  if (response.data.code !== 200) {
    throw new Error(response.data.message || '获取任务信息失败');
  }

  return adaptTaskInfoToUser(response.data.data, username, userId);
}
