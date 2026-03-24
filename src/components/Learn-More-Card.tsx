import { FlatList, Image, ImageSourcePropType, Text, View } from "react-native";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { LearnMoreCardListProps, listCards } from "../utils/list-cards";

type LearnMoreCardProps = {
  img: ImageSourcePropType;
  label: string;
  text: string;
};

export function LearnMoreCardList() {
  const [data, setData] = useState<LearnMoreCardListProps[]>([]);

  useEffect(() => {
    setData(listCards as LearnMoreCardListProps[]);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <LearnMoreCard img={item.img} label={item.label} text={item.text} />
      )}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        marginVertical: 16,
      }}
    />
  );
}

export function LearnMoreCard({ img, label, text }: LearnMoreCardProps) {
  return (
    <View className="bg-nubank-gray h-96 w-80 flex-col gap-2 overflow-hidden rounded-xl">
      <Image className="h-36 w-full object-cover" source={img} />
      <View className="flex-1 justify-between p-4">
        <View className="flex-col gap-2">
          <Text className="text-nubank-white text-lg font-medium">{label}</Text>
          <Text
            className="text-lg text-zinc-400"
            numberOfLines={2}
            lineBreakMode="tail"
          >
            {text}
          </Text>
        </View>
        <Button
          label="Learn more"
          size={"lg"}
          className="bg-nubank-purple-400 w-2/3 rounded-3xl"
          labelClasses="text-nubank-white text-lg font-medium"
        />
      </View>
    </View>
  );
}
