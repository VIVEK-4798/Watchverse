import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    // Later: Add fetch to backend
    console.log("Register:", { name, email, password });
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary px-5">
      <Text className="text-white text-2xl font-bold mb-5">Register</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#ccc"
        className="bg-white w-full mb-4 px-4 py-2 rounded"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        className="bg-white w-full mb-4 px-4 py-2 rounded"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        className="bg-white w-full mb-4 px-4 py-2 rounded"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-500 px-6 py-2 rounded mb-4"
      >
        <Text className="text-white text-center font-semibold">Register</Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login/index')}>
        <Text className="text-white">Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
  );
}
