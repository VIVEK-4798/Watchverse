import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuth } from '../../auth-context';
import { FontAwesome } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const redirectUri = AuthSession.makeRedirectUri({ useProxy: true } as any);
const redirectUri = AuthSession.makeRedirectUri({});
console.log('Redirect URxxI:', redirectUri);
  // const redirectUri = 'https://auth.expo.io/@vivek4798/watchverse'


  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '297110802841-4its0ejjhc70k169dateedukpq49kemp.apps.googleusercontent.com',
    androidClientId: '297110802841-m8gigon5o7jton66t6ksludbgmecdmm0.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle login here with authentication.accessToken if needed
      login();
      Toast.show({
        type: 'success',
        text1: 'Google Sign-In successful!',
      });
      router.replace('/(tabs)');
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://192.168.191.237:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
          text2: 'Redirecting to Home Page...',
        });
        login();
        setTimeout(() => router.push('/(tabs)'), 1000);
      } else {
        Toast.show({ type: 'error', text1: 'Login Failed', text2: data.message });
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong.' });
      console.error(err);
    }
  };

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 mt-16">
          <View className="items-center pt-16 pb-8">
            <Text className="text-white text-3xl font-bold mb-2">Welcome Back</Text>
            <Text className="text-gray-400 text-base">Sign in to continue</Text>
          </View>

          <View className="mb-8">
            <View className="flex-row items-center bg-white/10 rounded-xl mb-4 px-4">
              <MaterialIcons name="email" size={20} color="#aaa" />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#aaa"
                className="flex-1 h-14 text-white text-base ml-3"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center bg-white/10 rounded-xl mb-4 px-4">
              <MaterialIcons name="lock" size={20} color="#aaa" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                className="flex-1 h-14 text-white text-base ml-3"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-2">
                <MaterialIcons
                  name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="items-end mb-6">
              <Text className="text-custom_purple text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="rounded-xl overflow-hidden shadow-lg shadow-rose-600/30"
            >
              <LinearGradient
                colors={['#ab85db', '#d858a8']}
                className="py-4 items-center"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-lg font-bold">Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-600" />
              <Text className="text-gray-400 mx-4">OR</Text>
              <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Google Sign In Button */}
              <TouchableOpacity
                disabled={!request}
                onPress={() => promptAsync()}
                className="bg-white/10 flex-row items-center justify-center py-3 rounded-xl mb-6"
              >
                <FontAwesome name="google" size={24} color="#db4437" />
                <Text className="text-white text-base ml-2">Sign in with Google</Text>
              </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-gray-400 text-sm">Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-custom_purple text-sm font-bold ml-1"> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
