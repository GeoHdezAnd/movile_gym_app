import { useAuth } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Index() {
    const  {isAuthenticated, signOut} = useAuth();
    return (
        <View style={style.container}>
            <Text style={style.title}>Bienvenido a este sistema {":)"}</Text>
            <Text>{isAuthenticated ? "Está autenticado": "No está autenticado"}</Text>
            <Button title="Cerrar sesión" onPress={signOut}/>
            <Link style={style.link} href="/sign-in">
                Ir a inicio de sesión
            </Link>

            <Link style={style.link} href="/sign-up">
                Ir a crear cuenta
            </Link>
            <Link style={style.link} href="/(protected)/(tabs)/home">
                Ir a rutas protegidas
            </Link>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    link: {
        fontSize: 20,
        fontWeight: "medium",
    },
});
