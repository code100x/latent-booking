import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/logo.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const Sidebar = (props: DrawerContentComponentProps) => {
  const { navigation } = props;

  return (
    <View className="pt-16 px-6">
      <View className="mb-10">
        <Image source={Logo} className="w-28 h-11" />
      </View>
      <View className="border-b border-[#727272] pb-6">
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.8}
          className="flex flex-row items-center py-2 mb-3"
        >
          <FontAwesomeIcon name="user-circle" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StarsOfLatent')}
          activeOpacity={0.8}
          className="flex flex-row items-center py-2 mb-3"
        >
          <FontAwesomeIcon name="star-o" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Stars of Latent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Downloads')}
          className="flex flex-row items-center py-2 mb-3"
        >
          <FontAwesomeIcon name="download" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Downloads
          </Text>
        </TouchableOpacity>
      </View>
      <View className="pt-6">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SupportChat')}
          className="flex flex-row items-center py-2 mb-3"
        >
          <IonIcon name="chatbox-ellipses-outline" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Support Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Feedback')}
          className="flex flex-row items-center py-2 mb-3"
        >
          <MaterialIcon name="feedback" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Feedback
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex flex-row items-center py-2 mb-3"
        >
          <FontAwesomeIcon name="star-o" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">
            Rate Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex flex-row items-center py-2 mb-3"
        >
          <IonIcon name="share-social-outline" size={18} color="#DCDCDC" />
          <Text className="text-[#DCDCDC] font-medium text-xs ml-2">Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex flex-row items-center py-2 mb-3"
        >
          <MaterialIcon name="logout" size={18} color="#FF0000" />
          <Text className="text-[#FF0000] font-medium text-xs ml-2">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
