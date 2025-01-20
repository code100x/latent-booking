import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useUI } from '../../context/UIContext';
import { THEME } from '../../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { screenWidth } from '../../utils/util';
import CustomText from '../../components/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const EnterOTP: FC = () => {
  const { theme } = useUI();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<any>([]);
  const [isFocusedIndex, setIsFocusedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<any>({});
  const { navigate } = useNavigation<any>();
  const [timer, setTimer] = useState<number>(10);

  const handleOTPChange = (value: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otp.join('').length === 6) {
      handleValidateOTP();
    }
  }, [otp]);

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const validateInput = () => {
    let errors: any = {};
    if (otp.join('').length !== 6) {
      errors.otp = 'OTP must be 6 digits long';
    }
    setErrors(errors);
    return errors;
  };

  const handleValidateOTP = async () => {
    if (!validateInput()) {
      return;
    } else {
      Keyboard.dismiss
      navigate('ENTERPROFILE');
    }
  };

  const handleResendOTP = () => {
    setTimer(10);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: THEME[theme].background, flex: 1,justifyContent:'flex-end' }}>
          <View style={{}}>
            <LinearGradient colors={['#FDFFE0', '#F7CA7F', '#F4B45A']} style={styles.circle}>
              <Image source={require('../../assets/comedians/comedian3.png')} style={styles.image} resizeMode="cover" />
            </LinearGradient>
            <CustomText
              style={{
                fontSize: RFValue(12),
                //   transform: [{ rotate: '-14deg' }],
                backgroundColor: '#F5F5F5',
                color: THEME[theme].background,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
                position: 'absolute',
                zIndex: 1,
                top: 170,
                right: 75,
              }}>
              Kahin toh consent le rahe hai
            </CustomText>
          </View>
          <CustomText
            style={{
              textAlign: 'center',
              width: '80%',
              fontSize: RFValue(20),
              alignSelf: 'center',
            }}>
            Enter your OTP
          </CustomText>
          {timer > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 12,
              }}>
              <CustomText>Resend OTP in</CustomText>
              <CustomText style={{ color: '#F8D48D' }}>00:{String(timer).padStart(2, '0')}</CustomText>
            </View>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <CustomText
                style={{
                  color: '#A3A3A3',
                  textAlign: 'center',
                  width: '80%',
                  fontSize: RFValue(20),
                  textDecorationLine: 'underline',
                  alignSelf: 'center',
                }}>
                Resend?
              </CustomText>
            </TouchableOpacity>
          )}

          <View style={{ padding: 16, paddingTop: 0, gap: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '10%',
              }}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    {
                      borderColor: isFocusedIndex === index ? '#F8D48D' : 'transparent',
                    },
                  ]}
                  onFocus={() => setIsFocusedIndex(index)}
                  onBlur={() => setIsFocusedIndex(null)}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ padding: 16, justifyContent: 'flex-end' }}>
            <CustomButton title="Next" loading={otp.join('').length < 6} onPress={handleValidateOTP} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '15%',
    alignSelf: 'center',
  },

  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#262626',
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },

  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    position: 'absolute',
    // overflow:'hidden',
    top: -10,
    left: -60,
  },
});
