import { theme as antdTheme, type ThemeConfig } from 'antd';
import type { ThemeId } from '../store/useThemeStore';

export function getMonacoTheme(themeId: ThemeId): 'python-online-light' | 'python-online-dark-tech' {
  return themeId === 'dark-tech' ? 'python-online-dark-tech' : 'python-online-light';
}

export function getAntdTheme(themeId: ThemeId): ThemeConfig {
  if (themeId === 'dark-tech') {
    return {
      algorithm: antdTheme.darkAlgorithm,
      token: {
        colorPrimary: '#2dd4ff',
        colorInfo: '#2dd4ff',
        colorSuccess: '#33d17a',
        colorWarning: '#ffb347',
        colorError: '#ff6b7a',
        colorBgBase: '#08111f',
        colorTextBase: '#e6f0ff',
        colorBorder: '#1d3653',
        borderRadius: 10,
      },
      components: {
        Layout: {
          headerBg: '#0b1526',
          bodyBg: '#08111f',
        },
        Card: {
          colorBgContainer: '#101c31',
        },
      },
    };
  }

  return {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1677ff',
      colorInfo: '#1677ff',
      borderRadius: 10,
    },
  };
}
