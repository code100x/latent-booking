import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { FC } from "react";
import { THEME } from "../utils/colors";
import { useUI } from "../context/UIContext";
import { LinearGradient } from "expo-linear-gradient";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  loading?:boolean;
  iconSize?: number;
  textSize?: number;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  color,
  style,
  icon,
  textColor,
  textSize,
  iconColor,
  loading,
  iconSize,
  textStyle,
  ...rest
}) => {
  const { theme } = useUI();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      
      {...rest}
    >
      <LinearGradient colors={loading?[THEME[theme].disabled,THEME[theme].disabled]:['#AA823D','#EFE288','#D1B85A']} style={[
        {
          paddingVertical: 0,
          // paddingHorizontal: "12%",
          borderRadius: 12,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: loading?THEME[theme].disabled:(color || THEME[theme].primary),
          flexDirection: "row",
          gap: 8,
        },
        style,
      ]}>

      {icon && (
        <MaterialCommunityIcons
        style={{ top: 1 }}
        name={icon}
        color={iconColor}
        size={iconSize}
        />
      )}
      <Text
        style={[
          {
            fontFamily: "Manrope_600SemiBold",
            fontSize: RFValue(textSize || 16),
            color: textColor || "#00000",
            margin: 0,
            // textAlign: "center",
          },
          textStyle,
        ]}
        >
        {title}
      </Text>
        </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

