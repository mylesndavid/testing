import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useThemeStore } from "@/store/theme-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { colors } = useThemeStore();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="book/[id]" 
        options={{ 
          title: "Book Details",
          presentation: Platform.OS === 'ios' ? 'card' : 'transparentModal',
        }} 
      />
      <Stack.Screen 
        name="book-club/[id]" 
        options={{ 
          title: "Book Club",
        }} 
      />
      <Stack.Screen 
        name="add-book" 
        options={{ 
          title: "Add Book",
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="add-review" 
        options={{ 
          title: "Write Review",
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="create-challenge" 
        options={{ 
          title: "Create Challenge",
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="create-book-club" 
        options={{ 
          title: "Create Book Club",
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
        }} 
      />
    </Stack>
  );
}