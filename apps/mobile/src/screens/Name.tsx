import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Gradient from '../assets/gradient.png';
import NameImage from '../assets/name.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator.types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type NameProps = NativeStackScreenProps<RootStackParamList, 'Name'>;

const Name = ({ navigation }: NameProps) => {
  return (
    <KeyboardAwareScrollView
      bottomOffset={100}
      showsVerticalScrollIndicator={false}
      className="flex-1 mb-10"
    >
      <View className="h-full pb-8">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-5 z-10"
        >
          <IonIcon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Image source={Gradient} className="absolute -top-8 -left-40" />
        </View>
        <View className="w-full mt-10">
          <Image source={NameImage} className="scale-75" />
        </View>
        <View className="px-6">
          <Text className="text-[#FAFAFA] text-center text-2xl font-medium">
            What should we refer you as?
          </Text>
          <Text className="text-[#A3A3A3] text-center text-2xl font-medium mb-6">
            Make some noise for...
          </Text>
          <TextInput
            placeholder=""
            placeholderTextColor={'#fff'}
            // autoFocus={true}
            className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MyDrawer')}
            className="bg-[#EDEAE2] rounded-lg py-3 mt-8"
          >
            <Text className="text-center text-[#0A0A0A] font-semibold text-base">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Name;
