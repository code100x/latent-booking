import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Gradient from '../assets/gradient.png';
import OtpImage from '../assets/otp.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type OtpProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const Otp = ({ navigation }: OtpProps) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="h-full pb-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            className="absolute top-10 left-5 z-10"
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View>
            <Image source={Gradient} className="absolute -top-8 -left-52" />
          </View>
          <View
            className={`w-full ${isKeyboardOpen ? '-mt-12 -mb-16' : 'mt-20'}`}
          >
            <Image
              source={OtpImage}
              className={isKeyboardOpen ? 'scale-50' : 'scale-75'}
            />
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
              autoFocus={true}
              className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Name')}
              className={`bg-[#EDEAE2] rounded-lg py-3 ${
                isKeyboardOpen ? 'mt-4' : 'mt-12'
              }`}
            >
              <Text className="text-center text-[#0A0A0A] font-semibold text-base">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Otp;
