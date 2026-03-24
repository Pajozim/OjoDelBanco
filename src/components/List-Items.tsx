import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ListItem } from "../utils/list-items";
import { router, RelativePathString } from "expo-router";

export type iconNameProps = keyof typeof MaterialIcons.glyphMap;

type ItemCardProps = {
  label: string;
  icon: iconNameProps;
  link: RelativePathString;
};

type ItemProps = {
  id: string;
  label: string;
  icon: iconNameProps;
  href: RelativePathString;
};

export function ListItems() {
  const [data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    setData(ListItem as ItemProps[]);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item label={item.label} icon={item.icon} link={item.href} />}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        marginVertical: 8,
        paddingHorizontal: 18,
      }}
    />
  );
}

export function Item({ label, icon, link }: ItemCardProps) {
  return (
      <Pressable onPress={() => router.push(link)}>
        <View className="flex-col items-center gap-2">
          <View className="bg-nubank-gray h-24 w-24 items-center justify-center rounded-full">
            <MaterialIcons name={icon} size={24} color="white" />
          </View>
          <Text className="text-nubank-white max-w-24 text-center text-xl font-medium">
            {label}
          </Text>
        </View>
      </Pressable> 
  );
}