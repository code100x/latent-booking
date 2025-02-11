import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from './drawer.types';
import * as Screens from '../screens';
import Sidebar from '../components/Sidebar';

const Drawer = createDrawerNavigator<DrawerParamList>();

const MyDrawer = () => {
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
      <Drawer.Screen name="Home" component={Screens.Home} />
      <Drawer.Screen name="Profile" component={Screens.Profile} />
      <Drawer.Screen name="StarsOfLatent" component={Screens.StarsOfLatent} />
      <Drawer.Screen name="SupportChat" component={Screens.SupportChat} />
      <Drawer.Screen name="Feedback" component={Screens.Feedback} />
      <Drawer.Screen name="Downloads" component={Screens.Downloads} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
