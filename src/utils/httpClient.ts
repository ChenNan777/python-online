import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message, Modal } from 'antd';
import { AUTH_TOKEN_KEY, USER_INFO_KEY } from '../constants/auth';
import { LOGIN_PATH } from '../constants/routes';

export type CustomRequestOptions = AxiosRequestConfig;

type BusinessResponseBody = {
  code?: number;
  message?: string;
  msg?: string;
  success?: boolean;
};

// 避免并发 401 重复弹出登录确认框。
let isLoginExpiredModalOpen = false;

function getStoredAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function clearStoredAuthInfo(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

function redirectToLoginIfNeeded(): void {
  if (window.location.pathname !== LOGIN_PATH) {
    window.location.href = LOGIN_PATH;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasOwnProperty(target: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, key);
}

function getBusinessResponseBody(payload: unknown): BusinessResponseBody | null {
  if (!isPlainObject(payload)) {
    return null;
  }

  return payload as BusinessResponseBody;
}

function getBusinessErrorMessage(payload: unknown): string {
  const body = getBusinessResponseBody(payload);

  if (body?.message) {
    return body.message;
  }

  if (body?.msg) {
    return body.msg;
  }

  return '请求失败，请稍后重试';
}

// 后端同时存在 success 包装和 code 包装时，优先以 success 语义判定是否成功。
function isBusinessRequestSuccessful(payload: unknown): boolean | null {
  const body = getBusinessResponseBody(payload);

  if (!body) {
    return null;
  }

  if (hasOwnProperty(body as Record<string, unknown>, 'success')) {
    return body.success === true;
  }

  if (hasOwnProperty(body as Record<string, unknown>, 'code')) {
    return body.code === 200;
  }

  return null;
}

function showLoginExpiredConfirm(): void {
  if (isLoginExpiredModalOpen) {
    return;
  }

  isLoginExpiredModalOpen = true;
  clearStoredAuthInfo();

  Modal.confirm({
    title: '登录已过期',
    content: '是否重新登录?',
    okText: '重新登录',
    cancelText: '取消',
    onOk: () => {
      redirectToLoginIfNeeded();
    },
    afterClose: () => {
      isLoginExpiredModalOpen = false;
    },
  });
}

function handleHttpStatusError(status: number): void {
  switch (status) {
    case 401:
      showLoginExpiredConfirm();
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

function createHttpClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 3000000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = getStoredAuthToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => {
      const requestSucceeded = isBusinessRequestSuccessful(response.data);

      if (requestSucceeded === false) {
        message.error(getBusinessErrorMessage(response.data));
        return Promise.reject(
          new AxiosError(
            getBusinessErrorMessage(response.data),
            undefined,
            response.config,
            response.request,
            response,
          ),
        );
      }

      return response.data;
    },
    (error: AxiosError) => {
      if (!error.response) {
        message.error('网络连接失败，请检查网络设置');
        return Promise.reject(error);
      }

      handleHttpStatusError(error.response.status);
      return Promise.reject(error);
    },
  );

  return client;
}

export const httpClient = createHttpClient('/api');
export const uavHttpClient = createHttpClient('/uav-api');
