import { icons } from '@/constants/icons';
import { View, Text } from 'react-native'
import { Image } from 'react-native';

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex-col items-center justify-center flex-1 gap-10'>
        <Image source={icons.person}
            className='size-10'
            tintColor="#fff"/>
          <Text className='text-gray-500 text-base'>Profile</Text>
      </View>
    </View>
  )
}

export default profile