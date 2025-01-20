import { Dimensions, Platform } from "react-native"

export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
export const HIT_SLOP_5 = { top: 5, bottom: 5, left: 5, right: 5 }
export const HIT_SLOP_10 = { top: 10, bottom: 10, left: 10, right: 10 }
export const IS_IOS = Platform.OS === "ios"
export const IS_ANDROID = Platform.OS === "android"
export const BOTTOM_BAR_HEIGHT = 60
