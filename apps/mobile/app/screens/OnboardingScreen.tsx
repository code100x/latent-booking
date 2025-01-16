import { FC, useEffect, useRef, useState } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { Header, Screen, Text, TextField } from "@/components"
import { IS_ANDROID } from "@/constants"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

type OnboardingStep = "email" | "otp" | "name"

const STEP_FLOW: Record<OnboardingStep, OnboardingStep | "complete"> = {
  email: "otp",
  otp: "name",
  name: "complete",
}

const GradientButton = ({
  text,
  onPress,
  isDisabled,
  containerStyle,
}: {
  text: string
  onPress: () => void
  isDisabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
}) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.9}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyle}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={isDisabled ? ["#EDEAE2", "#EDEAE2"] : ["#AA823D", "#EFE288", "#D1B85A"]}
        style={themed($button)}
      >
        <Text weight="semiBold" text={text} style={themed($buttonText)} />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export const Landing = ({ onPress }: { onPress: () => void }) => {
  const { themed } = useAppTheme()
  return (
    <>
      <Image
        style={themed($heroImage)}
        source={require("../../assets/images/landing.png")}
        resizeMode="cover"
      />
      <View style={themed($contentContainer)}>
        <Text preset="subheading" text="Welcome to" />
        <Text preset="subheading" text="India’s Got Latent 👋" />
        <GradientButton text="Get Started" onPress={onPress} containerStyle={$styles.fullWidth} />
        <Text style={$styles.textCenter}>
          By starting the onboarding you agree to the{" "}
          <Text>
            <Text weight="bold" text="Terms of service" /> &{" "}
            <Text weight="bold" text="Privacy Policy" />
          </Text>
        </Text>
      </View>
    </>
  )
}

export const EmailInput = ({
  userData,
  setUserData,
}: {
  userData: { email: string; otp: string; name: string }
  setUserData: (data: { email: string; otp: string; name: string }) => void
}) => {
  const { themed, theme } = useAppTheme()
  const { colors } = theme
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Image
        style={themed($emailHeroImage)}
        source={require("../../assets/images/email-hero.png")}
        resizeMode="cover"
      />
      <View style={themed($contentContainer)}>
        <Text size="xl">
          Enter your phone number or email,
          <Text size="xl" style={{ color: colors.textDim }}>
            {" "}
            we promise no spam.
          </Text>
        </Text>
        <TextField
          ref={inputRef}
          placeholder="Enter your email"
          inputWrapperStyle={themed($emailInput)}
          value={userData.email}
          autoCapitalize="none"
          maxLength={50}
          onChangeText={(email) => setUserData({ ...userData, email })}
        />
      </View>
    </>
  )
}

export const OtpInput = ({
  userData,
  setUserData,
}: {
  userData: { email: string; otp: string; name: string }
  setUserData: (data: { email: string; otp: string; name: string }) => void
}) => {
  const CELL_COUNT = 4

  const { themed, theme } = useAppTheme()
  const { colors } = theme

  const ref = useBlurOnFulfill({ value: userData.otp, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: userData.otp,
    setValue: (otp) => setUserData({ ...userData, otp }),
  })

  return (
    <>
      <Image
        style={themed($emailHeroImage)}
        source={require("../../assets/images/otp-hero.png")}
        resizeMode="cover"
      />
      <View style={themed($contentContainer)}>
        <Text size="xl" text="Enter your OTP" />
        <TouchableOpacity activeOpacity={0.8}>
          <Text text="Resend?" size="lg" style={{ color: colors.textDim }} />
        </TouchableOpacity>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={userData.otp}
          onChangeText={(otp) => setUserData({ ...userData, otp })}
          cellCount={CELL_COUNT}
          rootStyle={themed($codeFieldRoot)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={IS_ANDROID ? "sms-otp" : "one-time-code"}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[themed($codeFieldCell), isFocused && themed($codeFieldCellFocused)]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
    </>
  )
}

export const NameInput = ({
  userData,
  setUserData,
}: {
  userData: { email: string; otp: string; name: string }
  setUserData: (data: { email: string; otp: string; name: string }) => void
}) => {
  const { themed, theme } = useAppTheme()
  const { colors } = theme
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Image
        style={themed($emailHeroImage)}
        source={require("../../assets/images/name-hero.png")}
        resizeMode="cover"
      />
      <View style={themed($contentContainer)}>
        <Text size="xl" style={$styles.textCenter}>
          What should we refer you as?
          <Text size="xl" style={{ color: colors.textDim }}>
            {" "}
            Make some noise for...
          </Text>
        </Text>
        <TextField
          ref={inputRef}
          placeholder="Enter your name"
          inputWrapperStyle={themed($emailInput)}
          value={userData.name}
          onChangeText={(name) => setUserData({ ...userData, name })}
        />
      </View>
    </>
  )
}

export const OnboardingScreen: FC<OnboardingScreenProps> = () => {
  const { themed } = useAppTheme()

  const [step, setStep] = useState<"email" | "otp" | "name" | "landing">("landing")
  const [userData, setUserData] = useState<{
    email: string
    otp: string
    name: string
  }>({
    email: "",
    otp: "",
    name: "",
  })

  const renderStep = () => {
    switch (step) {
      case "landing":
        return <Landing onPress={() => setStep("email")} />
      case "email":
        return <EmailInput userData={userData} setUserData={setUserData} />
      case "otp":
        return <OtpInput userData={userData} setUserData={setUserData} />
      case "name":
        return <NameInput userData={userData} setUserData={setUserData} />
    }
  }

  const handleNext = () => {
    const nextStep = STEP_FLOW[step as OnboardingStep]
    if (nextStep === "complete") {
      console.log("Onboarding complete!", userData)
      return
    }
    setStep(nextStep)
  }

  const handleBack = () => {
    switch (step) {
      case "otp":
        setStep("email")
        break
      case "name":
        setStep("otp")
        break
      case "email":
        setStep("landing")
        break
    }
  }

  const getButtonAttributes = () => {
    const buttonConfig: Record<OnboardingStep, { text: string; validate: () => boolean }> = {
      email: {
        text: "Next",
        validate: () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const numberRegex = /^\d+$/
          return emailRegex.test(userData.email) || numberRegex.test(userData.email)
        },
      },
      otp: {
        text: "Next",
        validate: () => userData.otp.length === 4,
      },
      name: {
        text: "Next",
        validate: () => userData.name.trim().length >= 2,
      },
    }

    const config = buttonConfig[step as OnboardingStep]
    return {
      text: config.text,
      isDisabled: !config.validate(),
    }
  }

  return (
    <Screen
      style={$styles.flex1}
      contentContainerStyle={$styles.flex1}
      safeAreaEdges={["bottom"]}
      keyboardShouldPersistTaps="always"
    >
      <Image source={require("../../assets/images/header-light.png")} style={themed($topImage)} />
      {step === "landing" ? (
        <>
          <Header />
          <Animated.View
            key={step}
            style={$styles.flex1}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            {renderStep()}
          </Animated.View>
        </>
      ) : (
        <>
          <Header
            backgroundColor="transparent"
            leftIcon="back"
            containerStyle={$styles.z2}
            onLeftPress={handleBack}
          />
          <Animated.View
            key={step}
            style={$styles.flex1}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            {renderStep()}
          </Animated.View>
          <GradientButton
            text={getButtonAttributes().text}
            onPress={handleNext}
            isDisabled={getButtonAttributes().isDisabled}
            containerStyle={$styles.mh16}
          />
        </>
      )}
    </Screen>
  )
}

const $topImage: ImageStyle = {
  height: 100,
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
}

const $heroImage: ImageStyle = {
  height: 330,
  width: 330,
  alignSelf: "center",
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  padding: spacing.md,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  borderRadius: spacing.xs,
  marginTop: 40,
  marginBottom: 28,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
})

const $emailHeroImage: ImageStyle = {
  height: 180,
  width: 180,
  alignSelf: "center",
}

const $emailInput: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginTop: spacing.lg,
})

const $codeFieldRoot: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginTop: spacing.lg,
})

const $codeFieldCell: ThemedStyle<TextStyle> = ({ spacing }) => ({
  width: 68,
  height: 48,
  lineHeight: 44,
  fontSize: 24,
  borderWidth: 2,
  borderColor: "#F8D48D40",
  textAlign: "center",
  backgroundColor: "#262626",
  borderRadius: spacing.xs,
})

const $codeFieldCellFocused: ThemedStyle<TextStyle> = () => ({
  borderColor: "#F8D48D",
})
