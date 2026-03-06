import type { ReactNode } from 'react';
import { BulbOutlined, MoonOutlined } from '@ant-design/icons';
import { Segmented, Tooltip } from 'antd';
import { useThemeStore, type ThemeId } from '../store/useThemeStore';

const OPTIONS: Array<{ label: string; value: ThemeId; icon: ReactNode }> = [
  { label: '亮色', value: 'light', icon: <BulbOutlined /> },
  { label: '暗黑科技', value: 'dark-tech', icon: <MoonOutlined /> },
];

export default function ThemeSwitcher() {
  const themeId = useThemeStore((state) => state.themeId);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleChange = (value: string | number) => {
    if (value === 'light' || value === 'dark-tech') {
      setTheme(value);
    }
  };

  return (
      <Segmented
      className="theme-switcher"
      options={OPTIONS.map((option) => ({
        label: (
          <Tooltip title={option.label} placement="bottom">
            <span className="theme-switcher__icon" aria-label={option.label}>
              {option.icon}
            </span>
          </Tooltip>
        ),
        value: option.value,
      }))}
      value={themeId}
      onChange={handleChange}
    />
  );
}
