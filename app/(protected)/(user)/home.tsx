import { useAuth } from "@/providers/AuthProvider";
import { Button, Text, View } from "react-native";

export default function HomeAdmin() {
    const { signOut } = useAuth();
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <View className="top-0">
                <Button title="Cerrar sesión" onPress={signOut} />
            </View>
            <Text className="text-white font-bold">Hello to MEMBER home </Text>
        </View>
    );
}
