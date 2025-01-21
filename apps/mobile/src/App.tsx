import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Welcome from './screens/Welcome';
import Email from './screens/Email';
import Otp from './screens/Otp';
import Name from './screens/Name';
import Home from './screens/Home';
import MembershipDetails from './screens/MembershipDetails';
import Sidebar from './components/Sidebar';
import Profile from './screens/Profile';
import StarsOfLatent from './screens/StarsOfLatent';
import SupportChat from './screens/SupportChat';
import Feedback from './screens/Feedback';
import Downloads from './screens/Downloads';

export type RootStackParamList = {
  Welcome: undefined;
  Email: undefined;
  Otp: undefined;
  Name: undefined;
  MembershipDetails: undefined;
  MyDrawer: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  StarsOfLatent: undefined;
  SupportChat: undefined;
  Feedback: undefined;
  Downloads: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'black' },
        drawerStyle: { backgroundColor: '#171717' },
        drawerStatusBarAnimation: 'slide',
      }}
      drawerContent={props => <Sidebar {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="StarsOfLatent" component={StarsOfLatent} />
      <Drawer.Screen name="SupportChat" component={SupportChat} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Downloads" component={Downloads} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: 'black' },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Name" component={Name} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="MembershipDetails" component={MembershipDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
