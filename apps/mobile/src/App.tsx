import { SafeAreaView } from 'react-native';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
