import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { THEME, ThemeMode } from "../utils/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";

type UIContextType = {
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  fullscreenLoading: boolean;
  setFullscreenLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      success: boolean;
      title: string;
      message: string;
      duration: number;
      onClose: () => void;
      canClose: boolean;
    }>
  >;
};

const UIContext = createContext<UIContextType | null>(null);

const FullViewLoader = ({ show }: { show: boolean }) => {
  return (
    show && (
      <View style={styles.overlay}>
        <ActivityIndicator size={30} color={"#ffffff"} />
      </View>
    )
  );
};

interface ToastMessageProps {
  visible: boolean;
  theme?: ThemeMode;
  success: boolean;
  title: string;
  message: string;
  duration: number;
  onClose: ()=>void;
  canClose: boolean;
}

const ToastMessage: FC<ToastMessageProps> = ({
  theme,
  visible = true,
  success,
  title,
  message,
  duration = 1200,
  onClose=()=>{},
  canClose = false,
}) => {

  if (!theme) {
    return null;
  }
  useEffect(() => {
    if (visible && !canClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, canClose,onClose]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={canClose ? onClose : ()=>{}}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.68)",
        }}
      >
        <TouchableOpacity
          onPress={canClose ? onClose : () => {}}
          activeOpacity={canClose ? 0.7 : 1}
        >
          <View
            style={{
              width: 340,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffffff",
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: 5,
              marginHorizontal: 40,
              marginBottom: 40,
              borderLeftWidth: 6,
              borderLeftColor: "#2980b9",
            }}
          >
            {canClose && (
              <MaterialCommunityIcons
                name="close"
                size={12}
                style={{ position: "absolute", right: 10, top: 10 }}
                color={"#2980b9"}
                onPress={onClose}
              />
            )}
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: "#F0F0F0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={success ? "check-circle-outline" : "alert-outline"}
                size={16}
                color={success ? "#4CE3E4" : "#FF6C00"}
              />
            </View>
            <View
              style={{
                paddingLeft: 12,
                width: 240,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#2980b9",
                    fontFamily: "WorkSans_400Regular",
                    fontSize: RFValue(14),
                    marginBottom: 4,
                  }}
                >
                  {title}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: THEME[theme].secondary,
                    fontFamily: "WorkSans_400Regular",
                    fontSize: RFValue(12),
                    lineHeight: 16,
                  }}
                >
                  {message}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('DARK');

  useEffect(() => {
    setTheme(deviceTheme === "light" ? "LIGHT" : "DARK");
  }, [deviceTheme]);
  const [fullscreenLoading, setFullscreenLoading] = useState(false);
  const [toast, showToast] = useState({
    visible: false,
    success: true,
    title: "",
    message: "",
    duration: 0,
    onClose: () => {},
    canClose: false,
  });

  return (
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        fullscreenLoading,
        setFullscreenLoading,
        showToast,
      }}
    >
      {children}
      <FullViewLoader show={fullscreenLoading} />
      <ToastMessage
        theme={theme}
        visible={toast.visible}
        success={toast.success}
        title={toast.title}
        message={toast.message}
        duration={toast.duration}
        canClose={toast.canClose}
        onClose={() => {
          showToast({
            ...toast,
            visible: false,
          });
          toast.onClose && toast.onClose();
        }}
      />
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
