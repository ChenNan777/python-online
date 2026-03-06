import { httpClient } from '../utils/httpClient';
import {
  getRoleByTaskRoleId,
  getRoleLabel,
  getTaskProgressStatus,
  getTaskStageText,
} from '../constants/challenge';
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
  const role = getRoleByTaskRoleId(apiData.taskRoleId);

  // 复用统一 taskStatus 语义
  const taskStatus = getTaskProgressStatus(apiData.taskStatus);

  const startTime = parseTimeArray(apiData.startTime);
  const endTime = parseTimeArray(apiData.endTime);
  const stage = getTaskStageText(apiData.taskStatus);
  // 成员角色文案
  const memberRole = getRoleLabel(role);

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
      startTime,
      endTime,
      // 添加额外字段供页面使用
      stage,
      memberName: apiData.memberName,
      memberRole,
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
