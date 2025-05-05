import { useAuth } from "@/providers/AuthProvider";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Profile() {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que quieres cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Cerrar sesión",
                    onPress: () => signOut(),
                },
            ]
        );
    };

    return (
        <View className="flex-1 pt-20 bg-background p-4">
            <Text style={styles.title}>Mi Perfil</Text>

            <View style={styles.profileInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>
                        {user?.name || "No disponible"}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>
                        {user?.phone || "No disponible"}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>
                        {user?.email || "No disponible"}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Rol:</Text>
                    <Text style={styles.value}>
                        {user?.role || "No disponible"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
            >
                <Text style={styles.signOutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

/* Usamos estilos de StyleSheet para tener más control sobre ellos */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color:"white",
    },
    profileInfo: {
        backgroundColor: "#1f2937",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    label: {
        fontSize: 16,
        color: "white",
        fontWeight: "500",
    },
    value: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
    signOutButton: {
        backgroundColor: "#e74c3c",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    signOutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
