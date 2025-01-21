import React from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { View, Text } from 'react-native';
import Gradient from '../assets/gradient.png';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type SupportChatProps = DrawerScreenProps<DrawerParamList, 'SupportChat'>;

const SupportChat = ({ navigation }: SupportChatProps) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
            Support Chat
          </Text>
        </View>
        <View className="mt-auto">
          <View className="flex flex-row items-center justify-between bg-[#262626] border border-[#F8D48D40] rounded-lg pr-3">
            <TextInput
              placeholder="Type your message here"
              placeholderTextColor={'#A3A3A3'}
              className="flex-1 bg-[#262626] p-3 text-[#A3A3A3]"
            />
            <Icon name="send" size={16} color="#FAFAFA" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SupportChat;
