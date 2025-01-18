import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';

const Banner: FC = () => {
  return (
    <Image
      source={require('../assets/images/banner.png')}
      resizeMode="contain"
      style={{ width: '100%', height: 250, alignSelf: 'center' }}
    />
  );
};

export default Banner;
