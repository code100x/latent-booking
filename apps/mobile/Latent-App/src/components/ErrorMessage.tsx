import {  View } from "react-native";
import React, { FC } from "react";
import CustomText from "./CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ErrorMessageProp {
  message: string;
}
const ErrorMessage: FC<ErrorMessageProp> = ({ message }) => {
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={20}
        color={"red"}
      />
      <CustomText style={{color:'red',fontSize:12}}>{message}</CustomText>
    </View>
  );
};

export default ErrorMessage;