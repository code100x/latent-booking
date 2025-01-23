import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../navigation/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SamayImage from '../assets/samay.png';
import Gradient from '../assets/gradient.png';

type NotificationsProps = NativeStackScreenProps<
  RootStackParamList,
  'Notifications'
>;

const Notifications = ({ navigation }: NotificationsProps) => {
  return (
    <View className="h-full pb-8 px-5">
      <View>
        <Image source={Gradient} className="absolute -top-8 -left-40" />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-5 z-10"
      >
        <IonIcon name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <View className="pt-10">
        <Text className="text-[#D4D4D4] font-medium text-sm ml-2 text-center">
          Notifications
        </Text>
      </View>
      <View className="flex items-center justify-center mt-auto mb-auto">
        <Image source={SamayImage} className="w-32 h-32" />
        <Text className="max-w-[200px] text-[#737373] font-medium text-base text-center mt-3">
          You have no notifications at the moment
        </Text>
      </View>
    </View>
  );
};

export default Notifications;
