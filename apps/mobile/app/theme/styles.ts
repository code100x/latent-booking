import { TextStyle, ViewStyle } from "react-native"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,
  fullWidth: { width: "100%" } as ViewStyle,
  textCenter: { textAlign: "center" } as TextStyle,
  mh16: { marginHorizontal: 16 } as ViewStyle,
  z2: { zIndex: 2 } as ViewStyle,
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
}