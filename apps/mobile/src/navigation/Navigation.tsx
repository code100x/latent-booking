import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigator.types';
import * as Screens from '../screens';
import MyDrawer from '../drawer/Drawer';
import Notifications from '../screens/Notifications';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: 'black' },
        }}
      >
        <Stack.Screen name="Welcome" component={Screens.Welcome} />
        <Stack.Screen name="Email" component={Screens.Email} />
        <Stack.Screen name="Otp" component={Screens.Otp} />
        <Stack.Screen name="Name" component={Screens.Name} />
        <Stack.Screen
          name="MembershipDetails"
          component={Screens.MembershipDetails}
        />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
