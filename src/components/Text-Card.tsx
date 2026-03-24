import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type TextCardProps = {
  label: string;
  children: React.ReactNode;
  className?: string | null;
  isBorderTop?: boolean;
  isBorderBottom?: boolean;
  chevronRight?: boolean;
};

export function TextCard({
  label,
  children,
  className="",
  isBorderTop,
  isBorderBottom,
  chevronRight=true,
}: TextCardProps) {
 
  const IconComponent = chevronRight ? <MaterialIcons name="chevron-right" size={22} color="gray" /> : null;
  const LabelComponent = label === "" ? null : <Text className="text-nubank-white text-xl font-medium">{label}</Text>;
  const ViewComponent = label!=="" || chevronRight ? <View className="w-full flex-row items-center justify-between">{LabelComponent}{IconComponent}</View> : null;

  return (
    <View
      className={`flex-col gap-3 px-6 py-3 ${isBorderTop ? "border-t border-zinc-700" : ""} ${isBorderBottom ? "border-b border-zinc-700" : ""} ${className} `}
    >
      {ViewComponent}
      {children}
    </View>
  );
}
