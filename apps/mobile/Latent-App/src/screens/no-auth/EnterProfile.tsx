import { View, Text, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { FC, useState } from 'react';
import { THEME } from '../../utils/colors';
import { useUI } from '../../context/UIContext';
import { LinearGradient } from 'expo-linear-gradient';
import { screenWidth } from '../../utils/util';
import CustomText from '../../components/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomInputTextField from '../../components/CustomInputTextField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const EnterProfile: FC = () => {
  const { theme } = useUI();
  const { navigate } = useNavigation<any>();
  const [name, setName] = useState<string>('');
  const { storeToken } = useAuth();
  const [errors, setErrors] = useState<{ name?: string } | null>(null);

  const validateInput = () => {
    const tempErrors: { name?: string } = {};
    console.log('name', name);

    const nameRegex = /^[a-zA-Z\s]{2,}$/;

    if (!name || !nameRegex.test(name.trim())) {
      tempErrors.name = 'Please enter a valid name';
    }

    setErrors(tempErrors);
    console.log('hello', tempErrors);

    return Object.keys(tempErrors).length > 0;
  };

  const handleNext = () => {
    if (validateInput()) {
      return;
    } else {
      // Keyboard.dismiss
      storeToken('mysecrettoken');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: THEME[theme].background, flex: 1, justifyContent: 'flex-end' }}>
          <View style={{}}>
            <LinearGradient colors={['#FDFFE0', '#F7CA7F', '#F4B45A']} style={styles.circle}>
              <Image source={require('../../assets/comedians/comedian4.png')} style={styles.image} resizeMode="cover" />
            </LinearGradient>
            <CustomText
              style={{
                fontSize: RFValue(12),
                backgroundColor: '#F5F5F5',
                color: THEME[theme].background,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
                position: 'absolute',
                zIndex: 1,
                top: 120,
                right: 75,
              }}>
              Make some noise for...?
            </CustomText>
          </View>
          <CustomText
            style={{
              textAlign: 'center',
              width: '80%',
              fontSize: RFValue(20),
              alignSelf: 'center',
            }}>
            What should we refer you as?{' '}
            <CustomText
              style={{
                color: '#A3A3A3',
                textAlign: 'center',
                width: '80%',
                fontSize: RFValue(20),
                alignSelf: 'center',
              }}>
              Make some noise for...
            </CustomText>
          </CustomText>
          <View style={{ padding: 16, paddingTop: 0, gap: 16 }}>
            <CustomInputTextField
              label=""
              placeholder=""
              value={name}
              onChangeText={setName}
              borderColor="transparent"
              errorMessage={errors?.name}
            />
          </View>
          <View style={{flex:1}}/>
          <View style={{justifyContent:'flex-end',padding:16}}>

            <CustomButton title="Next" loading={name?.length < 2} onPress={handleNext} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterProfile;

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '8%',
    alignSelf: 'center',
  },


  image: {
    width: 450,
    height: 400,
    resizeMode: 'cover',
    position: 'absolute',
    // overflow:'hidden',
    top: -50,
    right: -30,
  },
});
