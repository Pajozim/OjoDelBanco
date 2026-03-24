import { ScrollView, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { ListItems } from "../../components/List-Items";
import { Card } from "../../components/Card";
import { TextCard } from "../../components/Text-Card";
import { useBalance } from "../../context/fake_balance";
import {
  LearnMoreCard,
  LearnMoreCardList,
} from "../../components/Learn-More-Card";

export default function Index() {

  const { balance } = useBalance()

  return (
    <ScrollView style={{ flex: 1 }} className="bg-nubank-black">
      <View className="bg- h-44 w-full justify-between bg-nubank-purple-400 p-app-padding">
        <Header />

        <Text className="text-xl font-semibold text-nubank-white">
          Hi, John
        </Text>
      </View>

      <View className="mt-1 items-start gap-1 p-app-padding">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-xl font-medium text-nubank-white">Account</Text>
          <MaterialIcons name="chevron-right" size={22} color="gray" />
        </View>
        <Text className="text-xl font-medium text-nubank-white">
          {balance}
        </Text>
      </View>

      <ListItems />

      <View className="gap-4 p-app-padding">
        <Card>
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="credit-card" size={22} color="white" />
            <Text className="text-xl font-medium text-nubank-white">
              My credit cards
            </Text>
          </View>
        </Card>

        <Card>
          <View className="flex-row items-center justify-between">
            <Text className="max-w-72 text-xl font-medium text-nubank-white">
              Pay bills in up to 12x, directly in the app.
            </Text>
            {/* <View className="h-16 w-16 items-center justify-center rounded-full bg-nubank-black">
              <MaterialIcons name="smartphone" size={22} color="white" />
            </View> */}
          </View>
        </Card>
      </View>

      <TextCard label="Credit card" isBorderTop={true}>
        <View className="gap-1">
          <Text className="text-xl text-zinc-300">Current balance</Text>
          <Text className="text-xl font-medium text-nubank-white">
            $1,000.00
          </Text>
        </View>
        <Text className="mt-2 text-lg text-zinc-500">
          Available credit limit of $5,000.00
        </Text>
      </TextCard>

      <TextCard label="Installment" isBorderBottom={true} isBorderTop={true}>
        <Text className="text-lg text-zinc-500">
          Want to pay your bills in up to 12x? You can anticipate up to 12
          installments of your annual salary.
        </Text>
      </TextCard>

      <TextCard label="Next payment" isBorderBottom={true}>
        <Text className="text-xl text-nubank-white">Next Monday, 1 Jan</Text>
      </TextCard>

      <View className="p-app-padding">
        <Text className="mt-1 text-2xl font-medium text-nubank-white">
          Discover more
        </Text>
        <LearnMoreCardList />
      </View>
    </ScrollView>
  );
}

