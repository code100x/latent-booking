import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import Thumbnail from '../assets/thumbnail.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export interface VideoCardProps {
  item: {
    id: number;
    title: string;
    thumbnail: string;
    locked: boolean;
  };
  navigation: {
    navigate: (screen: string, params: { id: string | number }) => void;
  };
}

const VideoCard = ({ item, navigation }: VideoCardProps) => {
  const thumbnail = item?.thumbnail ? item.thumbnail : Thumbnail;

  return (
    <TouchableOpacity
      className="relative w-48 mr-4"
      activeOpacity={0.8}
      onPress={
        item?.locked
          ? () => {}
          : () => navigation.navigate('VideoPlayer', { id: item.id })
      }
    >
      {item?.locked && (
        <View className="absolute top-12 left-20 z-50">
          <MaterialIcon name="lock" size={24} color="#F8D48D" />
        </View>
      )}

      <View
        className={`relative rounded-lg ${
          item?.locked ? 'border border-[#F8D48D40]' : 'border-none'
        }`}
      >
        <Image
          source={thumbnail}
          className="w-full h-32 border border-[#F8D48D40] rounded-lg"
          style={{ resizeMode: 'cover' }}
        />
        {item?.locked && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 rounded-lg" />
        )}
      </View>

      <Text
        className="text-[#F5F5F5] font-medium text-xs pt-2"
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default VideoCard;
