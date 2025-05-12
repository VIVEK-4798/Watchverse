import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ScrollView, Text, View } from "react-native";
import { Image } from "react-native";

export default function Index() {
  return (
    <View
       className="flex-1 bg-primary">
        <Image source={images.bg}
          className="absolute w-full z-0"/>

        <ScrollView className="flex-1 px-5">
          <Image source={icons.logo} 
                  className="w-24 h-16 mt-20 mx-auto"/>
        </ScrollView>

    </View>
  );
}
