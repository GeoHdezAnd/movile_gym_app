import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function UpdateMember() {
    const { id } = useLocalSearchParams();
    console.log(useLocalSearchParams());
    return (
        <View className="flex-1 bg-background p-4">
            <Stack.Screen
                options={{
                    title: "Actualizar miembro",
                    headerTitleAlign: "center",
                }}
            />
            <View>
                <Text className="text-white">
                    Actualizando miembro con ID: {id}
                </Text>
            </View>
        </View>
    );
}
