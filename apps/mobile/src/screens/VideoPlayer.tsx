import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator.types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Gradient from '../assets/gradient.png';

type VideoPlayerType = NativeStackScreenProps<
  RootStackParamList,
  'VideoPlayer'
>;

const VideoPlayer = ({ navigation, route }: VideoPlayerType) => {
  const { videoId } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-full pb-8 px-5">
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
        <View className="mt-24">
          <Text className="text-[#FAFAFA] text-center text-2xl font-medium">
            INDIAS GOT LATENT
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default VideoPlayer;
