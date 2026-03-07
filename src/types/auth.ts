import type { TaskInfo } from './task';
import type { ChallengeType } from '../constants/challenge';

export interface User {
  id: string;
  username: string;
  role: ChallengeType | null;
  team: Team;
  task: TaskInfo | null;
}

export interface Team {
  id: string;
  name: string;
}

// 重新导出 TaskInfo 以保持向后兼容
export type { TaskInfo };

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
}
