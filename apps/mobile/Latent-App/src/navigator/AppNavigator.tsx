import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '../screens/no-auth/Onboarding';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import PhoneNumber from '../screens/no-auth/PhoneNumber';
import EnterOTP from '../screens/no-auth/EnterOTP';
import { THEME } from '../utils/colors';
import { useUI } from '../context/UIContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EnterProfile from '../screens/no-auth/EnterProfile';
import { useAuth } from '../context/AuthContext';
import DrawerNavigator from './DrawerNavigator';
import Home from '../screens/in-app/Home';
import SplashScreen from '../components/SplashScreen';
import Profile from '../screens/in-app/Profile';
import StarsLatent from '../screens/in-app/StarsLatent';
import Downloads from '../screens/in-app/Downloads';
import Feedback from '../screens/in-app/Feedback';
import Support from '../screens/in-app/Support';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useUI();
  const { token,loading } = useAuth();
  if(loading){
    return <SplashScreen/>
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" translucent={true} backgroundColor="transparent" />

      <View style={{ height: 30, alignItems: 'center' }}>
        <RadialGradient
          style={{ width: '100%', height: 200, top: -140 }}
          colors={['#DCA339CC', '#000000']}
          stops={[0.4, 1]}
          center={[200, 0]}
          radius={182}></RadialGradient>
      </View>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {token ? (
          <Stack.Group>
            <Stack.Screen name="DRAWER" component={DrawerNavigator} />
            <Stack.Screen name="PROFILE" component={Profile} />
            <Stack.Screen name="STARSLATENT" component={StarsLatent} />
            <Stack.Screen name="DOWNLOADS" component={Downloads} />
            <Stack.Screen name="SUPPORT" component={Support} />
            <Stack.Screen name="FEEDBACK" component={Feedback} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="ONBOARDING" component={Onboarding} />
            <Stack.Screen name="PHONENUMBER" component={PhoneNumber} />
            <Stack.Group
              screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: { backgroundColor: THEME[theme].background },
                headerBackImage: () => (
                  <MaterialCommunityIcons size={25} color={THEME[theme].text.primary} name="arrow-left" />
                ),
              }}>
              <Stack.Screen name="ENTEROTP" component={EnterOTP} />
              <Stack.Screen name="ENTERPROFILE" component={EnterProfile} />
            </Stack.Group>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
