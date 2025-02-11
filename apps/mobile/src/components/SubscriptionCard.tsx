import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface SubscriptionCardProps {
  color1: string;
  color2: string;
  borderColor: string;
  icon: any;
  title: string;
  description: string;
  originalPrice?: number;
  discountedPrice?: number;
  onPress?: () => void;
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
  onPress,
}: SubscriptionCardProps) => {
  return (
    <>
      <LinearGradient
        colors={[color1, color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: borderColor,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}
          onPress={onPress}
        >
          <Image
            source={icon}
            style={{ width: 48, height: 48, marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#F4F4F3',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 6,
              }}
            >
              {title}
            </Text>
            <Text style={{ color: '#FFFFFFB2', fontSize: 12 }}>
              {description}
            </Text>
            {originalPrice && discountedPrice && (
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Text
                  style={{
                    color: '#F4F4F3',
                    fontSize: 16,
                    textDecorationLine: 'line-through',
                    opacity: 0.5,
                  }}
                >
                  ₹{originalPrice}
                </Text>
                <Text style={{ color: '#F4F4F3', fontSize: 16, marginLeft: 8 }}>
                  ₹{discountedPrice}
                </Text>
              </View>
            )}
          </View>
          <MaterialIcon name="chevron-right" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default SubscriptionCard;
