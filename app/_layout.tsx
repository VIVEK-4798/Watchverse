import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";

// sthings yet to do
// 1. add a  login screen 
// 2. add a logout screen
// 3. add a register screen
// 4. add a profile screen
// 5. add a settings screen
// 6. add a saved movies screen


export default function RootLayout() {
  return <>
        <StatusBar hidden={true}/>
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{headerShown: false}}  
      />
      <Stack.Screen
        name="login"
        options={{headerShown: false}}  
      />
      <Stack.Screen
        name="register"
        options={{headerShown: false}}  
      />
      <Stack.Screen
        name="movies/[id]"
        options={{headerShown: false}}  
      />
    </Stack>
  </>
}
