import { StyleSheet, Text, View, Image } from 'react-native';
import React, { FC } from 'react';
import { screenWidth } from '../utils/util';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen: FC = () => {
  return (
    <View style={{ backgroundColor: '#000000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient colors={['#FDFFE0', '#F7CA7F', '#F4B45A']} style={styles.circle}>
        <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    alignSelf: 'center',
  },
});
