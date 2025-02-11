import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Navigation from './navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <KeyboardProvider>
      <SafeAreaView className="flex-1 bg-black">
        <Navigation />
      </SafeAreaView>
    </KeyboardProvider>
  );
};

export default App;
