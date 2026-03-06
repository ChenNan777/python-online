import axios, { AxiosError } from 'axios';
import { message } from 'antd';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

function getStoredAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function clearStoredAuthInfo(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

function redirectToLoginIfNeeded(): void {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

function handleHttpStatusError(status: number): void {
  switch (status) {
    case 401:
      clearStoredAuthInfo();
      message.error('登录已过期，请重新登录');
      redirectToLoginIfNeeded();
      break;
    case 403:
      message.error('权限不足，无法访问');
      break;
    case 404:
      message.error('请求的资源不存在');
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      message.error('服务器错误，请稍后重试');
      break;
    default:
      message.error('请求失败，请稍后重试');
  }
}

// 创建 axios 实例
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:28888',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：注入 token
httpClient.interceptors.request.use(
  (config) => {
    const token = getStoredAuthToken();
    if (token) {
      // token 已经包含 "Bearer " 前缀，直接使用
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一错误处理
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 网络错误
    if (!error.response) {
      message.error('网络连接失败，请检查网络设置');
      return Promise.reject(error);
    }

    // HTTP 错误状态码处理
    handleHttpStatusError(error.response.status);

    return Promise.reject(error);
  }
);
