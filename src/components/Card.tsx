import { View } from "react-native";
import { cn } from "../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn("bg-nubank-gray w-full rounded-2xl px-6 py-4", className)}
    >
      {children}
    </View>
  );
}
