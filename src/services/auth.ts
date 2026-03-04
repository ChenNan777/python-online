import type { LoginRequest, LoginResponse } from '../types/auth';
import { mockLogin } from './mock';

// 当前使用 Mock 数据，后续替换为真实 API
export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    // TODO: 替换为真实 API 调用
    // return axios.post('/api/auth/login', request);
    return mockLogin(request);
  },
};
