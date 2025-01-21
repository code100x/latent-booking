import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Gradient from '../assets/gradient.png';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import Star1 from '../assets/star1.png';
import Star2 from '../assets/star2.png';
import Star3 from '../assets/star3.png';
import Star4 from '../assets/star4.png';

type StarsOfLatentProps = DrawerScreenProps<DrawerParamList, 'StarsOfLatent'>;

const StarsOfLatent = ({ navigation }: StarsOfLatentProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-full pb-8 px-5">
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
        <View className="mt-24">
          <Text className="text-[#FFFFFF] font-medium text-2xl">
            Stars of Latent
          </Text>
          <View className="mt-6">
            <View className="flex flex-row items-center justify-between">
              <Image source={Star1} className="w-[166px] h-[166px]" />
              <Image source={Star2} className="w-[166px] h-[166px]" />
            </View>
            <View className="flex flex-row items-center justify-between">
              <Image source={Star3} className="w-[166px] h-[166px]" />
              <Image source={Star4} className="w-[166px] h-[166px]" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StarsOfLatent;
