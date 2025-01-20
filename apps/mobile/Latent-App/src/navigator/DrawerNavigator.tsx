import { View, Text, Image, Alert } from 'react-native';
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Home from '../screens/in-app/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AlignLeft, Bell, BellDot, BellDotIcon, Menu, MenuIcon, Trash } from 'lucide-react-native';
import { THEME } from '../utils/colors';
import { useUI } from '../context/UIContext';
import CustomerDrawerItem from '../components/CustomerDrawerItem';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { theme } = useUI();
  const {clearToken} = useAuth();
  const { navigate } = useNavigation<any>();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => <AlignLeft size={24} color="#ffffff" style={{ margin: 16 }} onPress={navigation.openDrawer} />,
        headerRight: () => <Bell style={{ transform: [{ rotate: '10deg' }], margin: 16 }} color={'#ffffff'} />,
        headerStyle:{
            backgroundColor:THEME[theme].background
        }
      })}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 0,
              backgroundColor: '#171717',
            }}
            showsVerticalScrollIndicator={false}
            >
            <View
              style={{
                flex: 1,
                paddingVertical: 0,
                margin: 0,
              }}>
              <Image source={require('../assets/logo.png')} resizeMode="contain" style={{ width: 150, height: 50 }} />
              <View style={{ marginTop: '20%', gap: 40,marginHorizontal:10,flexWrap:'wrap' }}>
                <CustomerDrawerItem
                  iconName="account-circle-outline"
                  label="Profile"
                  onPress={() => navigate('PROFILE')}
                />
                <CustomerDrawerItem
                  iconName="star-shooting-outline"
                  label="Stars of Latent"
                  onPress={() => navigate('STARSLATENT')}
                />
                <CustomerDrawerItem
                  iconName="folder-download-outline"
                  label="Downloads"
                  onPress={() => navigate('DOWNLOADS')}
                />
                </View>
                <View style={{ height: 0.4, backgroundColor: '#727272',width:'100%',marginVertical:'10%' }} />
              <View style={{ gap: 40,marginHorizontal:10,flexWrap:'wrap' }}>

                <CustomerDrawerItem
                  iconName="message-text-outline"
                  label="Support Chat"
                  onPress={() => navigate('SUPPORT')}
                />
                <CustomerDrawerItem
                  iconName="message-alert-outline"
                  label="Feedback"
                  onPress={() => navigate('FEEDBACK')}
                />
                <CustomerDrawerItem iconName="star-outline" label="Rate Us" onPress={() => Alert.alert('Rate Us')} />
                <CustomerDrawerItem
                  iconName="share-variant-outline"
                  label="Share"
                  onPress={() => Alert.alert('Share')}
                />
                <CustomerDrawerItem
                  iconName="logout"
                  label="Logout"
                  labelColor='red'
                  color='red'
                  onPress={() => clearToken()}
                />
                
              </View>
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: true, headerTitle: () => null }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
