import { Button } from "@/src/components/Button";
import { useAuth } from "@/src/context/auth.context";
import { Alert, Image, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Authentication() {
  const { setIsAuthenticated } = useAuth();

  async function verifyAvailableAuthentication() {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    // console.log(isAvailable);
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // console.log(
    //   types.map((type) => LocalAuthentication.AuthenticationType[type]),
    // );
  }

  async function handleAuthentication() {

    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      return Alert.alert("Login", "Biometric authentication is not enrolled");
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access the application",
      // Fallback label
      fallbackLabel: "Biometric authentication not recognized",
    });

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  return (
    <View className="flex-1 items-center justify-end bg-nubank-purple-400 px-5 py-4">
      <Image
        source={require("../../assets/images/nubank_logo.png")}
        className="absolute top-1/2 h-36 w-36 -translate-y-1/2"
      />
      <Button
        /* onPress={handleAuthentication} */
        onPress={() => router.push("./(auth)")}
        label="Use your mobile phone password"
        className="h-16 w-full rounded-full bg-nubank-white"
        labelClasses="text-zinc-800"
        size={"lg"}
      />
    </View>
  );
}

