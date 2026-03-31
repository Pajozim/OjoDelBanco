import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { TextCard } from "../../../components/Text-Card";
import { useBalance } from "../../../context/fake_balance";
import { TransferInputItems } from "../../../components/Text-Input-Items";

export const [amount, setAmount] = React.useState<number>(0);

export default function Transfer() {

  const scrollViewRef = useRef<ScrollView>(null);  // ← Create reference
  const { balance } = useBalance()

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
              {balance}
            </Text>
            <Text className="text-xl font-medium text-rose-400 pl-4 w-auto">
              ( {amount > 0 ? balance - amount : ""} )
            </Text>
          </View>
        </TextCard>

          <TextCard label="" chevronRight={false} isBorderBottom={true} className="flex items-center-safe justify-center">
            <TransferInputItems variant="ghost" size="lg" className="w-full" amount={amount} setAmount={setAmount} />
          </TextCard>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

