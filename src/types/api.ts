// 通用 API 响应包装
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 登录接口响应
export interface LoginApiResponse {
  token: string;
  tokenHead: string;
  adminInfo: {
    id: string;
    username: string;
    password: string;
    icon: string;
    email: string;
    nickName: string;
    note: string | null;
    createTime: string;
    loginTime: string | null;
    status: string;
  };
  menuInfo: Array<{
    id: string;
    parentId: string;
    createTime: string;
    title: string | null;
    level: number;
    sort: number | null;
    name: string;
    icon: string;
    hidden: number;
    component: string;
    route: string;
    type: string;
    label: string;
    status: boolean;
    children: unknown[];
  }>;
}

// 任务信息接口响应
export interface TaskInfoApiResponse {
  taskId: string;
  taskName: string;
  taskStatus: string;
  startTime: number[];
  endTime: number[];
  teamId: string;
  teamName: string;
  memberId: string;
  memberName: string;
  taskRoleId: string;
  taskRoleName: string | null;
  isComplete?: boolean;
}
