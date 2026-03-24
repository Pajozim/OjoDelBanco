import { ScrollView, Text, View } from "react-native";
import { Header } from "../../../components/Header";
import { useBalance } from "../../../context/fake_balance";

export default function Placeholder() {

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} className="bg-nubank-black">
      <View className="bg- h-44 w-full justify-between bg-nubank-purple-400 p-app-padding">
        <Header />

        <Text className="text-xl font-semibold text-nubank-white">
          Placeholder
        </Text>
      </View>

      <View className="gap-1">
        <Text className="text-xl font-medium text-nubank-white">
          text
        </Text>
      </View>
      
    </ScrollView>
  );
}

