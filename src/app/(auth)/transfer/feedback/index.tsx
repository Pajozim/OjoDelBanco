import { ScrollView, Text, View } from "react-native";
import { Header } from "../../../../components/Header";
import { Button } from "../../../../components/Button";
import { router } from "expo-router";

export default function Placeholder() {

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} className="bg-nubank-black">
      <View className="bg- h-44 w-full justify-between bg-nubank-purple-400 p-app-padding">
        <Header />

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-nubank-white">
            Transfer Feedback
          </Text>
          
          <Button
            label="Go back"
            size={"lg"}
            className="w-1/3 pl-4"
            labelClasses="text-nubank-white text-lg font-medium"
            variant="ghost"
            icon="chevron-left"
            iconPosition="left"
            onPress={() => router.push('/(auth)')}
          />
        </View>
      </View>

      <View className="gap-1">
        <Text className="text-xl font-medium text-nubank-white">
          Feedback Site from Transfer
        </Text>
      </View>
      
    </ScrollView>
  );
}

