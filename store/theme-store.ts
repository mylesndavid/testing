import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { colors } from '@/constants/colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeType;
  colors: typeof colors.light;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light' as ThemeType,
      colors: colors.light,
      isDark: false,
      setTheme: (theme: ThemeType) => {
        const isDark = theme === 'dark' || (theme === 'system' && false); // We would check system theme here
        set({
          theme,
          colors: isDark ? colors.dark : colors.light,
          isDark,
        });
      },
    }),
    {
      name: 'bookish-theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);