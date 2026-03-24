import { ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { TextCard } from "../../../components/Text-Card";
import { useBalance } from "../../../context/fake_balance";
import { TextInputItems } from "../../../components/Text-Input-Items";

export default function Transfer() {

  const { balance } = useBalance()

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} className="bg-nubank-black">
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

      <TextCard label="Account" chevronRight={false} isBorderBottom={true}>
        <Text className="text-xl font-medium text-nubank-white pl-4">
          {balance}
        </Text>
      </TextCard>

      <TextCard label="" chevronRight={false} isBorderBottom={false}>
        <TextInputItems />
      </TextCard>
      
    </ScrollView>
  );
}

