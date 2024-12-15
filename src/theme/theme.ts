import { Theme } from '@mui/material';
import { shadTheme } from './shad-theme/shadTheme.ts';

const themeMap: { [key: string]: (mode: 'light' | 'dark') => Theme } = {
  shadTheme,
};

export const getThemeByName = (theme: string, mode: 'light' | 'dark') => {
  return themeMap[theme](mode);
};
