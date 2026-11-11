
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

const themeColors = {
  light: {
    background: '#F3F5FA',
    card: '#FFFFFF',
    cardLight: '#E8ECF4',
    gold: '#B88620',
    text: '#17233D',
    muted: '#68758D',
    border: '#D5DCE8',
    green: '#159B70',
    dark: '#E1E6EF',
  },

  dark: {
    background: '#091735',
    card: '#172D5B',
    cardLight: '#203967',
    gold: '#FFD66B',
    text: '#FFFFFF',
    muted: '#AAB7D0',
    border: '#30466F',
    green: '#39D99A',
    dark: '#071329',
  },
};

type ThemeContextType = {
  theme: ThemeMode;
  activeTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  colors: typeof themeColors.dark;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeMode>('system');

  const activeTheme =
    theme === 'system'
      ? systemTheme === 'light'
        ? 'light'
        : 'dark'
      : theme;

  const colors = themeColors[activeTheme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        activeTheme,
        setTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useAppTheme must be used inside ThemeProvider'
    );
  }

  return context;
}
