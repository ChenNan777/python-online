import { create } from 'zustand';
import type { User } from '../types/auth';
import { authApi } from '../services/auth';
import { getTaskInfo } from '../services/task';
import { AUTH_TOKEN_KEY, USER_INFO_KEY } from '../constants/auth';

function saveAuthToStorage(token: string, user: User): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
}

function clearAuthStorage(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

function readAuthFromStorage(): { token: string | null; userStr: string | null } {
  return {
    token: localStorage.getItem(AUTH_TOKEN_KEY),
    userStr: localStorage.getItem(USER_INFO_KEY),
  };
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => Promise<void>;
  loadFromStorage: () => void;
  refreshTaskInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (token: string, user: User) => {
    saveAuthToStorage(token, user);
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    // 调用登出 API
    await authApi.logout();

    // 清除本地数据
    clearAuthStorage();
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const { token, userStr } = readAuthFromStorage();

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ token, user, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user info:', error);
        clearAuthStorage();
      }
    }
  },

  refreshTaskInfo: async () => {
    const state = useAuthStore.getState();
    if (!state.user) {
      return;
    }

    try {
      // 重新获取任务信息
      const updatedUser = await getTaskInfo(state.user.username, state.user.id);

      // 更新 store 和 localStorage
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(updatedUser));
      set({ user: updatedUser });
    } catch (error) {
      console.error('Failed to refresh task info:', error);
    }
  },
}));
