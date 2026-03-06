import { create } from 'zustand';

export type ThemeId = 'light' | 'dark-tech';

export const THEME_STORAGE_KEY = 'app_theme';

const DEFAULT_THEME_ID: ThemeId = 'light';

function isThemeId(value: unknown): value is ThemeId {
  return value === 'light' || value === 'dark-tech';
}

function applyTheme(themeId: ThemeId): void {
  document.documentElement.dataset.theme = themeId;
  document.documentElement.style.colorScheme = themeId === 'dark-tech' ? 'dark' : 'light';
}

function readStoredTheme(): ThemeId {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(value) ? value : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

type ThemeStore = {
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
  loadFromStorage: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeId: DEFAULT_THEME_ID,
  setTheme: (themeId) => {
    applyTheme(themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // ignore storage errors
    }
    set({ themeId });
  },
  loadFromStorage: () => {
    const themeId = readStoredTheme();
    applyTheme(themeId);
    set({ themeId });
  },
}));
