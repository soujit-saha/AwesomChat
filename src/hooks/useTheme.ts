/**
 * Custom hook for theme management
 */

import { useColorScheme } from 'react-native';
import { getTheme } from '../theme/colors';
import { Theme, ThemeMode } from '../types';

export const useTheme = (): { theme: Theme; themeMode: ThemeMode } => {
  const colorScheme = useColorScheme();
  const themeMode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light';
  const theme = getTheme(themeMode);

  return { theme, themeMode };
};
