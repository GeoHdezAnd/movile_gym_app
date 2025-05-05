import { Button, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/providers/AuthProvider";
export default function HomeAdmin() {
    const { signOut } = useAuth();
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <View style={style.header} >
            <Button title="Cerrar sesión"  onPress={signOut} />

            </View>
            <Text className="text-white font-bold">Paco me la chupas? </Text>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        top: 0,
        
    }
})