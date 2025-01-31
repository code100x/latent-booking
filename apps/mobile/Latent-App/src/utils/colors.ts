export const THEME = {
    LIGHT: {
      text: {
        primary: "#ffffff",
        secondary: "#666666",
      },
      button: {
        secondary: "#F2F2F2",
      },
      moreOptions:'#2A3F54',
      bellBackground: "#E8E8E8",
      activeInputField:'#F8D48D',
      headerTextColor: "#666666",
      loginHeadingText:"#283F54",
      inputPlaceholderColor: "white",
      headerBackground:'#ECF6FB',
      inputTextColor: "#ffffff",
      actionCard:'#ffffff',
      background: "#000000",
      secondary: "#707070",
      descriptionTextColor: "#666666",
      actionBackground: "#00CED114",
      primary: "#006FAE",
      loadingIndicator:"#4CE3E4",
      inputTextFieldBorderColor: "#ffffff",
      disabled: "#E5E5E5",
      backgroundPlus: "#00CED1",
      green: "#27AE60",
      red: "#E65464",
      orange: "#F08D3B",
    },
    DARK: {
      text: {
        primary: "#ffffff",
        secondary: "#CCCCCC",
      },
      button: {
        secondary: "#0C2133",
      },
      actionCard:'#00CED114',
      descriptionTextColor: "#666666",
      activeInputField:'#F8D48D',
      inputTextFieldBorderColor:'#ffffff',
      loginHeadingText:"#ffffff",
      loadingIndicator:"#4CE3E4",
      actionBackground: "#00CED114",
      bellBackground: "#0C2133",
      moreOptions:'#0D1225',
      headerBackground:'#0D1225',
      disabled: "#E5E5E5",
      background: "#000000",
      inputPlaceholderColor: "#ffffff",
      inputTextColor: "#ffffff",
      loginFormBoxBackground: "#ffffff",
      loginFormLogoTextColor: "#ffffff",
      primary: "#0D1225",
      secondary: "#707070",
      backgroundPlus: "#00CED1",
      headerTextColor: "#ffffff",
      green: "#27AE60",
      red: "#E65464",
      orange: "#F08D3B",
    },
  };

  export type Theme = typeof THEME;
export type ThemeMode = keyof Theme;
export type ThemeConfig = Theme[ThemeMode];
  