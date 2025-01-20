import 'react-native-gesture-handler';
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import { UIProvider } from './context/UIContext';
import AppNavigator from './navigator/AppNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }
  return (
    <UIProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </UIProvider>
  );
}

// --Hello--  Commited by samrat and himanshu