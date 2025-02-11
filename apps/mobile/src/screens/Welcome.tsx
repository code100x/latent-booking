import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator.types';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeImage from '../assets/welcome.png';
import Gradient from '../assets/gradient.png';

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: WelcomeProps) => {
  return (
    <View className="h-full px-6 pb-8">
      <View>
        <Image source={Gradient} className="absolute -top-8 -left-40" />
      </View>
      <View className="w-full mx-auto mt-20">
        <Image source={WelcomeImage} className="mx-auto w-80 h-80" />
      </View>
      <View className="mt-auto">
        <Text className="text-[#F5F5F5] text-center text-2xl font-medium mb-10">
          Welcome to {'\n'} India's Got Latent 👋
        </Text>
        <LinearGradient
          colors={['#AA823D', '#EFE288', '#D1B85A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-lg mb-6"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Email')}
            className="py-2 rounded-md text-center"
            activeOpacity={0.8}
          >
            <Text className="text-[#0A0A0A] text-base font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text className="text-[#A3A3A3] text-center">
          By starting the onboarding you agree to the{'\n'}
          <Text className="text-white underline">Terms of service</Text> &{' '}
          <Text className="text-white underline">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
