import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

const handleLogin = async () => {
  try {
    const response = await fetch('http://192.168.191.237:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
        text2: 'Redirecting to Home Page...',
      });

      setTimeout(() => {
        router.push('/(tabs)'); 
      }, 1000);

    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: data.message,
      });
    }

  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong. Please try again.',
    });
    console.error(error);
  }
};

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 mt-16">
          {/* Header Section */}
          <View className="items-center pt-16 pb-8">
            <Text className="text-white text-3xl font-bold mb-2">Welcome Back</Text>
            <Text className="text-gray-400 text-base">Sign in to continue</Text>
          </View>

          {/* Form Section */}
          <View className="mb-8">
            {/* Email Input */}
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

            {/* Password Input */}
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
              <TouchableOpacity 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="p-2"
              >
                <MaterialIcons 
                  name={isPasswordVisible ? "visibility" : "visibility-off"} 
                  size={20} 
                  color="#aaa" 
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="items-end mb-6">
              <Text className="text-custom_purple text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
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

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-600" />
              <Text className="text-gray-400 mx-4">OR</Text>
              <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Social Login Options */}
            <View className="flex-row justify-center space-x-4 mb-6">
              <TouchableOpacity className="bg-white/10 p-3 rounded-full">
                <MaterialIcons name="facebook" size={24} color="#5588F3" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/10 p-3 rounded-full">
                <MaterialIcons name="language" size={24} color="#ab85db" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/10 p-3 rounded-full">
                <MaterialIcons name="apple" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Register Link */}
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