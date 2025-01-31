import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Gradient from '../assets/gradient.png';
import OtpImage from '../assets/otp.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator.types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type OtpProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const Otp = ({ navigation }: OtpProps) => {
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
          <Image source={OtpImage} className="scale-75" />
        </View>
        <View className="px-6">
          <Text className="text-[#FAFAFA] text-center text-2xl font-medium">
            Enter your OTP
          </Text>
          <Text className="text-[#A3A3A3] text-center text-2xl font-medium mb-6 underline">
            RESEND?
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="OTP"
            placeholderTextColor={'#fff'}
            // autoFocus={true}
            className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Name')}
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

export default Otp;
