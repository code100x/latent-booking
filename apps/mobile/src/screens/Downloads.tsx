import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Gradient from '../assets/gradient.png';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import Thumbnail from '../assets/thumbnail.png';

type DownloadsProps = DrawerScreenProps<DrawerParamList, 'Downloads'>;

const Downloads = ({ navigation }: DownloadsProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pb-8 px-5">
        <View>
          <Image source={Gradient} className="absolute -top-8 left-0" />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-5 z-10"
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View className="pt-10">
          <Text className="text-[#D4D4D4] font-medium text-sm ml-2 text-center">
            Downloads
          </Text>
        </View>
        <View className="mt-10">
          <View className="flex flex-row items-start bg-[#262626] p-3 rounded-lg space-x-3">
            <Image
              source={Thumbnail}
              className="w-[100px] h-[70px] rounded-md"
            />
            <View className="flex-1 flex-col space-y-1">
              <Text
                numberOfLines={2}
                className="text-[#F5F5F5] text-sm font-medium"
              >
                INDIA'S GOT LATENT | EP 12 ft. Rakhi Sawant @ashishsolanki_1
                @ComedianMaheepSingh
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Icon name="trash-bin" size={16} color="#FAFAFA" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Downloads;
