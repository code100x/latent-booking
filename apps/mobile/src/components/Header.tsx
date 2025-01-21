import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }: any) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mt-7">
        <Icon
          name="menu"
          size={24}
          color="#FFF"
          onPress={() => navigation.toggleDrawer()}
        />
        <Icon name="notifications" size={24} color="#FFF" />
      </View>
    </View>
  );
};

export default Header;
