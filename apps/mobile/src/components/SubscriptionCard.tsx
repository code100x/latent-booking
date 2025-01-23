import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import BronzeIcon from '../assets/bronze.png';

interface SubscriptionCardProps {
  color1: string;
  color2: string;
  borderColor: string;
  icon: string;
  title: string;
  description: string;
  originalPrice?: number;
  discountedPrice?: number;
}

const SubscriptionCard = ({
  color1,
  color2,
  borderColor,
  icon,
  title,
  description,
  originalPrice,
  discountedPrice,
}: SubscriptionCardProps) => {
  return (
    <LinearGradient
      colors={[color1, color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`rounded-md border border-[${borderColor}] mb-4`}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        className="flex flex-row items-start p-[14px]"
      >
        <Image source={icon || BronzeIcon} className="w-12 h-12 mr-2" />
        <View className="flex flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-[#F4F4F3] text-base font-bold mb-[6px]">
              {title}
            </Text>
            <Text className="text-[#FFFFFFB2] font-medium text-xs">
              {description}
            </Text>
            {originalPrice && discountedPrice && (
              <View className="flex flex-row space-x-2 mt-4">
                <Text className="text-[#F4F4F3] font-semibold text-lg opacity-50 line-through">
                  ₹{originalPrice}
                </Text>
                <Text className="text-[#F4F4F3] font-semibold text-lg">
                  ₹{discountedPrice}
                </Text>
              </View>
            )}
          </View>
          <View>
            <MaterialIcon name="chevron-right" size={24} color="#FFF" />
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SubscriptionCard;
