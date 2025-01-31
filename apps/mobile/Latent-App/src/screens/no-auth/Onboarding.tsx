import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { THEME } from '../../utils/colors';
import { useUI } from '../../context/UIContext';
import { LinearGradient } from 'expo-linear-gradient';
import { screenWidth } from '../../utils/util';
import CustomText from '../../components/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import Animated, { interpolate, withSpring, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import CustomInputTextField from '../../components/CustomInputTextField';

const Onboarding: FC = () => {
  const { theme } = useUI();
  const { navigate } = useNavigation<any>();
  const [startLogin, setStartLogin] = useState(false);
  const animatedImage = useSharedValue(0);
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState<{ input?: string } | null>(null);

  const top = Dimensions.get('window').height;

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedImage.value, [0, 1], [0, 1]),
      top: withSpring(interpolate(animatedImage.value, [0, 1], [top, 0]), { damping: 8 }),
    };
  });

  useEffect(() => {
    if (startLogin) {
      triggerAnimation();
    }
    return () => {
      animatedImage.value = 0;
    };
  }, [startLogin]);

  const validateInput = () => {
    let tempErrors: any = {};

    console.log('Input value:', input);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(input) && !phoneRegex.test(input)) {
      tempErrors.input = 'Enter a valid email or phone number';
    }

    setErrors(tempErrors);
    console.log('Validation Errors:', tempErrors);

    return Object.keys(tempErrors).length > 0;
  };

  const handleNext = () => {
    if (validateInput()) {
      return;
    } else {
      Keyboard.dismiss;
      navigate('ENTEROTP');
    }
  };

  const triggerAnimation = () => {
    animatedImage.value = withTiming(1, { duration: 1000 });
  };
  return (
    <View style={{ flex: 1, backgroundColor: THEME[theme].background, gap: 16 }}>
      {startLogin ? (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              style={[
                { backgroundColor: THEME[theme].background, flex: 1, justifyContent: 'flex-end' },
                animatedImageStyle,
              ]}>
              <View>
                <LinearGradient
                  colors={['#FDFFE0', '#F7CA7F', '#F4B45A']}
                  style={{
                    width: screenWidth * 0.5,
                    height: screenWidth * 0.5,
                    borderRadius: screenWidth * 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    marginVertical: '15%',
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={require('../../assets/comedians/comedian2.png')}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'cover',
                      position: 'absolute',
                      // overflow:'hidden',
                      top: 10,
                      left: 0,
                    }}
                    resizeMode="cover"
                  />
                </LinearGradient>
                <CustomText
                  style={{
                    fontSize: RFValue(12),
                    transform: [{ rotate: '-14deg' }],
                    backgroundColor: '#F5F5F5',
                    color: THEME[theme].background,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    position: 'absolute',
                    zIndex: 1,
                    top: 150,
                    right: 75,
                  }}>
                  Likho 98..
                </CustomText>
              </View>
              <CustomText
                style={{
                  textAlign: 'center',
                  width: '80%',
                  fontSize: RFValue(20),
                  alignSelf: 'center',
                }}>
                Enter your phone number or email,{' '}
                <CustomText
                  style={{
                    color: '#A3A3A3',
                    textAlign: 'center',
                    width: '80%',
                    fontSize: RFValue(20),
                    alignSelf: 'center',
                  }}>
                  we promise no spam.
                </CustomText>
              </CustomText>
              <View style={{ padding: 16 }}>
                <CustomInputTextField
                  label=""
                  placeholder=""
                  value={input}
                  onChangeText={setInput}
                  borderColor="transparent"
                  errorMessage={errors?.input}
                />
              </View>
              <View style={{ flex: 1 }} />
              <View style={{ justifyContent: 'flex-end', padding: 16 }}>
                <CustomButton title="Next" loading={input?.length < 2} onPress={handleNext} />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <>
          <LinearGradient colors={['#FDFFE0', '#F7CA7F', '#F4B45A']} style={styles.circle}>
            <Image source={require('../../assets/comedians/comedian1.png')} style={styles.image} resizeMode="cover" />
            <CustomText
              style={{
                fontSize: RFValue(12),
                backgroundColor: '#F5F5F5',
                color: THEME[theme].background,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
                position: 'absolute',
                bottom: 70,
                right: 25,
              }}>
              Wifi kyu lagaya hai?
            </CustomText>
          </LinearGradient>
          <View style={{ gap: 30, paddingHorizontal: 16, marginTop: 'auto', paddingBottom: '10%' }}>
            <CustomText style={{ fontSize: RFValue(24), textAlign: 'center' }}>
              Welcome to{'\n'}
              India’s Got Latent 👋
            </CustomText>
            {/* <CustomButton title="Get Started" onPress={() => navigate('PHONENUMBER')} /> */}
            <CustomButton title="Get Started" onPress={() => setStartLogin(!startLogin)} />
            <CustomText
              style={{
                color: '#A3A3A3',
                textAlign: 'center',
                width: '80%',
                alignSelf: 'center',
              }}>
              By starting the onboarding you agree to the{' '}
              <CustomText style={{ textDecorationLine: 'underline' }}>Terms of service</CustomText> &{' '}
              <CustomText style={{ textDecorationLine: 'underline' }}>Privacy Policy</CustomText>{' '}
            </CustomText>
          </View>
        </>
      )}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: '15%',
    alignSelf: 'center',
  },

  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
    position: 'absolute',
    top: 10,
    left: -60,
  },
});
