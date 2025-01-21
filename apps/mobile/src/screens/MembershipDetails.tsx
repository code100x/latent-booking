import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Gradient from '../assets/gradient.png';
import BronzeIcon from '../assets/bronze.png';
import GoldIcon from '../assets/gold.png';
import YoutubeIcon from '../assets/youtube.png';

type MembershipDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MembershipDetails'
>;

const MembershipDetails = ({ navigation }: MembershipDetailsProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-full pb-8">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-5 z-10"
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Image source={Gradient} className="absolute -top-8 -left-52" />
        </View>
        <View className="px-6 mt-24">
          <Text className="text-[#FFF] text-2xl font-medium">
            Get Latent+ Membership
          </Text>
          <View className="bg-[#E0BB741F] p-[10px] rounded-lg my-5 space-y-3">
            <Text className="text-[#F4F4F3] font-semibold text-[13px]">
              This membership only works on the app, not YouTube
            </Text>
            <Text className="text-[#A2A0A2] font-normal text-xs">
              You will be able to watch all members-only content on the app, but
              buying the app membership doesn't make you a YouTube channel
              member.
            </Text>
          </View>
          <View className="space-y-3">
            <Text className="text-[#CCCED0] text-sm font-semibold">
              Access to Bonus Episodes
            </Text>
            <Text className="text-[#CCCED0] text-sm font-semibold">
              Community conversations
            </Text>
            <Text className="text-[#CCCED0] text-sm font-semibold">
              Exclusive Give-Aways
            </Text>
          </View>
          <View className="mt-7 space-y-4">
            <LinearGradient
              colors={['rgba(4, 143, 249, 0.8)', 'rgba(8, 121, 207, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-md border border-[#BDDBFB33]"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
                className="flex flex-row items-start p-[14px]"
              >
                <Image source={BronzeIcon} className="w-12 h-12 mr-2" />
                <View className="flex flex-1 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[#F4F4F3] text-base font-bold mb-[6px]">
                      Latent+ Monthly
                    </Text>
                    <Text className="text-[#FFFFFFB2] font-medium text-xs">
                      One month subscription
                    </Text>
                    <View className="flex flex-row space-x-2 mt-4">
                      <Text className="text-[#F4F4F3] font-semibold text-lg opacity-50">
                        ₹59
                      </Text>
                      <Text className="text-[#F4F4F3] font-semibold text-lg">
                        ₹49
                      </Text>
                    </View>
                  </View>
                  <View>
                    <MaterialIcon name="chevron-right" size={24} color="#FFF" />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#DCB856', '#E3A400']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-md border border-[#C6A95C]"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
                className="flex flex-row items-start p-[14px]"
              >
                <Image source={GoldIcon} className="w-12 h-12 mr-2" />
                <View className="flex flex-1 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[#F4F4F3] text-base font-bold mb-[6px]">
                      Latent+ Yearly
                    </Text>
                    <Text className="text-[#FFFFFFB2] font-medium text-xs">
                      One year subscription
                    </Text>
                    <View className="flex flex-row space-x-2 mt-4">
                      <Text className="text-[#F4F4F3] font-semibold text-lg opacity-50">
                        ₹499
                      </Text>
                      <Text className="text-[#F4F4F3] font-semibold text-lg">
                        ₹399
                      </Text>
                    </View>
                  </View>
                  <View>
                    <MaterialIcon name="chevron-right" size={24} color="#FFF" />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#EB0809', '#AD0E12']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-md border border-[#FFFFFF80]"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex flex-row items-start p-[14px]"
              >
                <Image source={YoutubeIcon} className="w-12 h-12 mr-2" />
                <View className="flex flex-1 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[#F4F4F3] text-base font-bold mb-[6px]">
                      Already a YouTube Member?
                    </Text>
                    <Text className="text-[#FFFFFFB2] font-medium text-xs">
                      Connect your YouTube account and {'\n'}get Latent+
                      membership on the app
                    </Text>
                  </View>
                  <View>
                    <MaterialIcon name="chevron-right" size={24} color="#FFF" />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MembershipDetails;
