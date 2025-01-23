import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/navigator.types';
import { DrawerParamList } from '../drawer/drawer.types';
import Header from '../components/Header';
import HeroImage from '../assets/hero.png';
import Gradient from '../assets/gradient.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { videos } from '../data';
import VideoCard from '../components/VideoCard';
import IonIcon from 'react-native-vector-icons/Ionicons';

type HomeProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Home = ({ navigation }: HomeProps) => {
  const lockedVideos = videos && videos.filter(video => video.locked);
  const publicVideos = videos && videos.filter(video => !video.locked);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-5">
        <View>
          <Image source={Gradient} className="absolute -top-8 -left-40" />
        </View>
        <Header navigation={navigation} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MembershipDetails')}
          className="my-8"
        >
          <Image
            source={HeroImage}
            className="w-full h-60"
            style={{ resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[#F8D48D] font-bold text-xl">
              Latent+ Episodes
            </Text>
            <MaterialIcon name="chevron-right" size={24} color="#FFF" />
          </View>
          <FlatList
            data={lockedVideos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            className="mt-4"
            renderItem={({ item }) => <VideoCard item={item} />}
          />
        </View>
        <View className="mt-10">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[#F8D48D] font-bold text-xl">
              All Episodes
            </Text>
            <MaterialIcon name="chevron-right" size={24} color="#FFF" />
          </View>
          <FlatList
            data={publicVideos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            className="mt-4"
            renderItem={({ item }) => <VideoCard item={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
