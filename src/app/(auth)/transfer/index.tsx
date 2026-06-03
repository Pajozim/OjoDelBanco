import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { TextCard } from "../../../components/Text-Card";
import { useBalance } from "../../../context/fake_balance";
import { TransferInputItems } from "../../../components/Text-Input-Items";
import DisplayImg from "../../../components/ImgDisplay";

export default function Transfer() {
  const scrollViewRef = useRef<ScrollView>(null);  // ← Create reference
  const { balance } = useBalance()

  const [imageURI, setImageURI] = React.useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} className="bg-nubank-black" nestedScrollEnabled={true} ref={scrollViewRef} keyboardShouldPersistTaps="handled">
        <View className="bg- h-44 w-full justify-between bg-nubank-purple-400 p-app-padding">
          <Header />

          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-nubank-white">
              Transfer
            </Text>
            
              <Button
                label="Go back"
                size={"lg"}
                className="w-1/3 pl-4"
                labelClasses="text-nubank-white text-lg font-medium"
                variant="ghost"
                icon="chevron-left"
                iconPosition="left"
                onPress={() => router.back()}
              />
          </View>
        </View>

        <TextCard label="Account" chevronRight={false} isBorderBottom={true} className="flex flex-row justify-start">
          <View className="flex-row items-center justify-start w-full">
            <Text className="text-xl font-medium text-nubank-white pl-4 w-auto">
              {balance[0]}
            </Text>
            <Text className="text-xl font-medium text-rose-400 pl-4 w-auto">
              ( {balance[1] > 0 ? (balance[0] - balance[1]).toFixed(2) : 0} )
            </Text>
          </View>
        </TextCard>

          <ScrollView>

            <DisplayImg imageURI={imageURI}/>

            <TextCard label="" chevronRight={false} isBorderBottom={true} className="flex items-center-safe justify-center">
              <TransferInputItems className="w-full" setImageURI={setImageURI} />
            </TextCard>
          </ScrollView>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


