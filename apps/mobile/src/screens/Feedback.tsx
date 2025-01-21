import React from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Gradient from '../assets/gradient.png';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type FeedbackProps = DrawerScreenProps<DrawerParamList, 'Feedback'>;

const Feedback = ({ navigation }: FeedbackProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-full pb-8 px-5">
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
            Feedback
          </Text>
        </View>
        <View className="mt-6">
          <TextInput
            multiline
            numberOfLines={5}
            placeholder="Write your review"
            placeholderTextColor={'#A3A3A3'}
            className="h-[180px] bg-[#262626] p-3 text-[#A3A3A3] border border-[#F8D48D40] rounded-lg pr-3"
            style={{ textAlignVertical: 'top' }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            className="bg-[#EDEAE2] rounded-lg py-3 mt-6"
          >
            <Text className="text-center text-[#0A0A0A] font-semibold text-base">
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Feedback;
