import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export function Header() {
  return (
    <View className="flex-row items-center justify-between">
      <Avatar className="h-12 w-12">
        <AvatarImage
          source={{
            uri: "https://mighty.tools/mockmind-api/content/human/65.jpg",
          }}
        />
        <AvatarFallback className="bg-nubank-purple-200">
          <MaterialIcons name="add-photo-alternate" size={22} color="white" />
        </AvatarFallback>
      </Avatar>

      <View className="flex-row items-center gap-6">
        <Ionicons name="eye-outline" size={22} color="white" />
        <MaterialIcons name="help-outline" size={22} color="white" />
        <Ionicons name="person" size={22} color="white" />
      </View>
    </View>
  );
}
