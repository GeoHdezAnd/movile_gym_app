import { useAuth } from "@/providers/AuthProvider";
import { Button, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

export default function MemberProfile() {
    const { signOut, member } = useAuth();
    const [showQR, setShowQR] = useState(false);
    
    // Datos del miembro (usando los datos que proporcionaste)
    const userData = {
        email: member?.email || "joaq@dos.com",
        name: member?.name || "Rodrigo Gomez Segundo cambio",
        phone: member?.phone || "1234562269",
        profile: {
            gender: member?.profile?.gender || "M",
            matricula: member?.profile?.matricula || "ROSE-2269"
        },
        role: member?.role || "member"
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Cliente</Text>
            
            {/* Tarjeta que gira para mostrar QR */}
            <TouchableOpacity 
                onPress={() => setShowQR(!showQR)}
                activeOpacity={0.8}
                style={styles.card}
            >
                {showQR ? (
                    <View style={styles.qrContainer}>
                        <QRCode 
                            value={userData.profile.matricula}
                            size={200}
                            color="black"
                            backgroundColor="white"
                        />
                        <Text style={styles.qrText}>Matrícula: {userData.profile.matricula}</Text>
                    </View>
                ) : (
                    <View style={styles.profileContainer}>
                        <Image
                            source={userData.profile.gender === "M" 
                                ? require('@/assets/images/male-avatar.png') 
                                : require('@/assets/images/female-avatar.png')}
                            style={styles.profileImage}
                        />
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.detail}>Email: {userData.email}</Text>
                        <Text style={styles.detail}>Teléfono: {userData.phone}</Text>
                        <Text style={styles.detail}>Género: {userData.profile.gender === "M" ? "Masculino" : "Femenino"}</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text style={styles.instruction}>
                {showQR ? "Toca para ver el perfil" : "Toca para ver tu QR de asistencia"}
            </Text>

            <View style={styles.logoutButton}>
                <Button title="Cerrar sesión" onPress={signOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
    },
    card: {
        width: '90%',
        backgroundColor: '#2d2d2d',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        aspectRatio: 1,
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#4a90e2',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
    detail: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 5,
        textAlign: 'center',
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrText: {
        marginTop: 15,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    instruction: {
        marginTop: 20,
        color: '#aaaaaa',
        fontStyle: 'italic',
    },
    logoutButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
});