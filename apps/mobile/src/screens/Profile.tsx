import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Gradient from '../assets/gradient.png';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type ProfileProps = DrawerScreenProps<DrawerParamList, 'Profile'>;

const Profile = ({ navigation }: ProfileProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-full pb-8">
        <View>
          <Image source={Gradient} className="absolute -top-8 -left-52" />
        </View>
        <View className="flex flex-row items-center justify-between px-6 pt-10">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <FontAwesomeIcon name="pencil" size={12} color="#D4D4D4" />
            <Text className="text-[#D4D4D4] font-medium text-sm ml-2">
              Edit
            </Text>
          </View>
        </View>
        <View className="px-6 mt-24 space-y-6">
          <View>
            <Text className="text-sm text-[#D4D4D4] font-medium mb-2">
              Name
            </Text>
            <TextInput
              placeholder=""
              placeholderTextColor={'#fff'}
              className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
            />
          </View>
          <View>
            <Text className="text-sm text-[#D4D4D4] font-medium mb-2">
              Phone Number
            </Text>
            <TextInput
              placeholder=""
              placeholderTextColor={'#fff'}
              className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
            />
          </View>
          <View>
            <Text className="text-sm text-[#D4D4D4] font-medium mb-2">
              Email
            </Text>
            <TextInput
              placeholder=""
              placeholderTextColor={'#fff'}
              className="w-full bg-[#262626] p-3 border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-base"
            />
          </View>
          {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          className="bg-[#EDEAE2] rounded-lg py-3 mt-12"
        >
          <Text className="text-center text-[#0A0A0A] font-semibold text-base">
            Save
          </Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
