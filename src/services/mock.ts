import type { LoginRequest, LoginResponse, User } from '../types/auth';
import { PATHFINDING_TYPE, POSITIONING_TYPE } from '../constants/challenge';

// Mock 用户数据
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  user1: {
    password: '123456',
    user: {
      id: 'user001',
      username: '张三',
      role: POSITIONING_TYPE,
      team: {
        id: 'team001',
        name: '第一小队',
      },
      task: {
        id: 'task001',
        name: '城市定位任务',
        description: '使用方位角测量数据定位目标位置',
      },
    },
  },
  user2: {
    password: '123456',
    user: {
      id: 'user002',
      username: '李四',
      role: PATHFINDING_TYPE,
      team: {
        id: 'team002',
        name: '第二小队',
      },
      task: {
        id: 'task002',
        name: '路径规划任务',
        description: '在真实路网中找到最短路径',
      },
    },
  },
};

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  await delay(500); // 模拟网络延迟

  const userRecord = MOCK_USERS[request.username];

  if (!userRecord || userRecord.password !== request.password) {
    return {
      success: false,
      message: '用户名或密码错误',
    };
  }

  return {
    success: true,
    data: {
      token: `mock-jwt-token-${Date.now()}`,
      user: userRecord.user,
    },
  };
};
