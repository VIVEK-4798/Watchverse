import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const genresList = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance', 'Horror', 'Thriller', 'Fantasy', 'Animation', 'Documentary'];

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

const handleRegister = async () => {
  if (selectedGenres.length < 3) {
    Toast.show({
      type: 'error',
      text1: 'Genre Selection',
      text2: 'Please select at least 3 genres.',
    });
    return;
  }

  try {
    const response = await fetch('http://192.168.191.237:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        genres: selectedGenres,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Toast.show({
        type: 'success',
        text1: 'Registration successful!',
        text2: 'Redirecting to login...',
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: data.message || 'Please try again.',
      });
    }

  } catch (error) {
    console.error('Error:', error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occurred. Please try again.',
    });
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
            <Text className="text-white text-3xl font-bold mb-2">Create Account</Text>
            <Text className="text-gray-400 text-base">Join our community today</Text>
          </View>

          {/* Form Section */}
          <View className="mb-8">
            {/* Name Input */}
            <View className="flex-row items-center bg-white/10 rounded-xl mb-4 px-4">
              <MaterialIcons name="person" size={20} color="#aaa" />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                className="flex-1 h-14 text-white text-base ml-3"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

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

            {/* Genres Section */}
            <Text className="text-white text-lg font-semibold mt-6 mb-2">Select Your Favorite Genres</Text>
            <Text className="text-gray-400 text-sm mb-4">Choose at least 3 for better recommendations</Text>
            
            <View className="flex-row flex-wrap">
              {genresList.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  onPress={() => toggleGenre(genre)}
                  className={`py-2 px-4 rounded-full border mr-2 mb-2 ${
                    selectedGenres.includes(genre)
                      ? 'bg-custom_purple_dark border-custom_purple_dark'
                      : 'border-custom_purple'
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    selectedGenres.includes(genre) ? 'text-white' : 'text-custom_purple'
                  }`}>
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              className="mt-8 rounded-xl overflow-hidden shadow-lg shadow-rose-600/30"
            >
              <LinearGradient
                colors={['#ab85db', '#d858a8']}
                className="py-4 items-center"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-lg font-bold">Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400 text-sm">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-custom_purple text-sm font-bold ml-1"> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}