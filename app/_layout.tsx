import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
