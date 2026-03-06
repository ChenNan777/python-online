import type { LoginRequest, LoginResponse } from '../types/auth';
import { mockLogin } from './mock';
import { httpClient } from '../utils/httpClient';
import { encryptPassword } from '../utils/crypto';
import type { ApiResponse, LoginApiResponse } from '../types/api';
import { AUTH_TOKEN_KEY } from '../constants/auth';
import { getTaskInfo } from './task';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

function buildFullToken(tokenHead: string, token: string): string {
  return `${tokenHead}${token}`;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

/**
 * 登录接口
 */
async function loginWithApi(request: LoginRequest): Promise<LoginResponse> {
  try {
    // 加密密码
    const encryptedPassword = encryptPassword(request.password);

    // 调用登录接口
    const response = await httpClient.post<ApiResponse<LoginApiResponse>>('/admin/login', {
      username: request.username,
      password: encryptedPassword,
    });

    if (response.data.code !== 200) {
      return {
        success: false,
        message: response.data.message || '登录失败',
      };
    }

    const loginData = response.data.data;

    // 临时保存 token 以便后续请求使用
    const fullToken = buildFullToken(loginData.tokenHead, loginData.token);
    localStorage.setItem(AUTH_TOKEN_KEY, fullToken);

    // 获取任务信息
    const user = await getTaskInfo(
      loginData.adminInfo.nickName || loginData.adminInfo.username,
      loginData.adminInfo.id
    );

    return {
      success: true,
      data: {
        token: fullToken,
        user,
      },
    };
  } catch (error: unknown) {
    // 清除临时 token
    localStorage.removeItem(AUTH_TOKEN_KEY);

    return {
      success: false,
      message: getErrorMessage(error, '登录失败'),
    };
  }
}

/**
 * 登出接口
 */
async function logoutWithApi(): Promise<void> {
  try {
    await httpClient.post('/admin/logout');
  } catch (error) {
    console.error('Logout API error:', error);
    // 即使 API 调用失败，也继续清除本地数据
  }
}

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      return mockLogin(request);
    }
    return loginWithApi(request);
  },

  logout: async (): Promise<void> => {
    if (!USE_MOCK) {
      await logoutWithApi();
    }
  },
};
