import React from "react";
import { ScrollView, Image } from "react-native";
import { TextCard } from "./Text-Card";

export default function DisplayImg({ imageURI }: { imageURI: string }) {
    if (!imageURI) {
        return null;
    }

    return (
        <ScrollView>
            <TextCard label="Foto" chevronRight={false} isBorderBottom={true} >
                <Image
                    source={{ uri: imageURI }}
                    style={{ width: '100%', minHeight: 100 }}
                    resizeMode="contain"
                />
            </TextCard>
        </ScrollView>
    );
}