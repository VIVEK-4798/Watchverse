import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';
import { AuthProvider } from '../auth-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
