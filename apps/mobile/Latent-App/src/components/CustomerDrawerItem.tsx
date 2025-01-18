import { TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import CustomText from './CustomText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../utils/colors';

interface CustomerDrawerItemProps {
  label: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  labelColor?:string
}

const CustomerDrawerItem: FC<CustomerDrawerItemProps> = ({
  label,
  iconName,
  onPress,
  size = 24,
  labelColor='#ffffff',
  color = '#ffffff',
}) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} onPress={onPress}>
      <MaterialCommunityIcons size={size} name={iconName} color={color} />
      <CustomText style={{color:labelColor}}>{label}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomerDrawerItem;
