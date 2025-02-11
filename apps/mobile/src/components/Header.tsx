import React from 'react';
import { View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }: any) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View className="flex flex-row items-center justify-between mt-7">
      <IonIcon name="menu" size={24} color="#FFF" onPress={toggleDrawer} />
      <IonIcon
        name="notifications"
        size={24}
        onPress={() => navigation.navigate('Notifications')}
        color="#FFF"
      />
    </View>
  );
};

export default Header;
