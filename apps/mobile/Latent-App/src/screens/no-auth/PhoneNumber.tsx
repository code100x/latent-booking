import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import React, { FC, useState } from 'react';
import { THEME } from '../../utils/colors';
import { useUI } from '../../context/UIContext';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '../../components/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenWidth } from '../../utils/util';
import CustomInputTextField from '../../components/CustomInputTextField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const PhoneNumber: FC = () => {
  const { theme } = useUI();
  const { navigate } = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errors, setErrors] = useState<{ phoneNumber?: string } | null>(null);

  const validateInput = () => {
    let tempErrors: any = {};
    console.log('phone', phoneNumber);
    if (!phoneNumber.startsWith('0')) {
      tempErrors.phoneNumber = 'Phone number should start with zero';
    }
    setErrors(tempErrors);
    console.log('hello', tempErrors);
    return Object.keys(tempErrors).length > 0;
  };

  const handleNext = () => {
    if (validateInput()) {
      return;
    } else {
      navigate('ENTEROTP');
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: THEME[theme].background, flex: 1, justifyContent: 'flex-end' }}>
          <View style={{}}>
            <LinearGradient colors={['#FDFFE0', '#F7CA7F', '#F4B45A']} style={styles.circle}>
              <Image source={require('../../assets/comedians/comedian2.png')} style={styles.image} resizeMode="cover" />
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
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              maxLength={11}
              borderColor="transparent"
              errorMessage={errors?.phoneNumber}
            />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ justifyContent: 'flex-end', padding: 16 }}>
            <CustomButton title="Next" loading={phoneNumber?.length < 11} onPress={handleNext} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: '15%',
    alignSelf: 'center',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    position: 'absolute',
    // overflow:'hidden',
    top: 10,
    left: 0,
  },
});
