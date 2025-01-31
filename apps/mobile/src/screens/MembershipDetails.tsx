import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator.types';
import Gradient from '../assets/gradient.png';
import BronzeIcon from '../assets/bronze.png';
import GoldIcon from '../assets/gold.png';
import YoutubeIcon from '../assets/youtube.png';
import SubscriptionCard from '../components/SubscriptionCard';

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
          <IonIcon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Image source={Gradient} className="absolute -top-8 -left-40" />
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
          <View className="mt-7">
            <SubscriptionCard
              color1="rgba(4, 143, 249, 0.8)"
              color2="rgba(8, 121, 207, 0.8)"
              borderColor="#BDDBFB33"
              icon={BronzeIcon}
              title="Latent+ Monthly"
              description="One month subscription"
              originalPrice={59}
              discountedPrice={49}
            />
            <SubscriptionCard
              color1="#DCB856"
              color2="#E3A400"
              borderColor="#C6A95C"
              icon={GoldIcon}
              title="Latent+ Yearly"
              description="One year subscription"
              originalPrice={499}
              discountedPrice={399}
            />
            <SubscriptionCard
              color1="#EB0809"
              color2="#AD0E12"
              borderColor="#FFFFFF80"
              icon={YoutubeIcon}
              title="Already a YouTube Member?"
              description={`Connect your YouTube account and ${'\n'}get Latent+ membership on the app`}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MembershipDetails;
