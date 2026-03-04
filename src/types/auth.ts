export interface User {
  id: string;
  username: string;
  role: 'positioning' | 'pathfinding';
  team: Team;
  task: TaskInfo;
}

export interface Team {
  id: string;
  name: string;
}

export interface TaskInfo {
  id: string;
  name: string;
  description: string;
}

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
