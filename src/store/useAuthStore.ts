import { create } from 'zustand';
import type { User } from '../types/auth';
import { authApi } from '../services/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => Promise<void>;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (token: string, user: User) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    // 调用登出 API
    await authApi.logout();

    // 清除本地数据
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user_info');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ token, user, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user info:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      }
    }
  },
}));
