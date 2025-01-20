import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import React, { FC } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { THEME } from "../utils/colors";
import { useUI } from "../context/UIContext";

interface CustomTextProps {
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?:number
}

const CustomText: FC<CustomTextProps> = ({ style, children,numberOfLines }) => {
  const { theme } = useUI();
  return (
    <Text
      style={[styles.defaultText, { color: THEME[theme].text.primary }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Manrope_400Regular",
    fontSize: RFValue(14),
    // textAlign: "left",
    // flexShrink:1
  },
});
