import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { FavoritesProvider } from '../context/favorites-context';
import { LanguageProvider } from '../context/language-context';
import { ThemeProvider } from '../context/theme-context';
import { BookingsProvider } from '../context/bookings-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <BookingsProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
          </BookingsProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}