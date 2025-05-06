import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberOperationLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.backButtonContainer}>
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#007AFF" // Azul estándar de iOS
                            />
                            <Text style={styles.backText}>Atrás</Text>
                        </View>
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#000", // Negro para el título
                },
                headerStyle: {
                    backgroundColor: "#FFF", // Fondo blanco
                },
                headerTitleAlign: "center",
            }}
        />
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 15,
        borderRadius: 20,
        paddingVertical: 5,
        paddingRight: 10,
    },
    backButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    backText: {
        fontSize: 16,
        marginLeft: 4,
        color: "#007AFF", // Mismo azul que el ícono
    },
});
