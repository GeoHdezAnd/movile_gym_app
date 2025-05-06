import { useState, useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import authAxios from "@/config/authAxios";

export default function QRScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isActive, setIsActive] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const isScanning = useRef(false); // Ref para controlar el estado de escaneo

    // Verificar permisos al montar el componente
    useEffect(() => {
        if (permission?.granted) {
            setIsActive(true);
        }
        return () => {
            setIsActive(false);
            isScanning.current = false;
        };
    }, [permission]);

    // Función para manejar el escaneo
    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (isScanning.current) return; // Evitar múltiples escaneos

        isScanning.current = true;
        setIsActive(false);
        setScannedData(data);

        const res = await makeAttendance(data);

        Alert.alert("QR Escaneado", `respuesta: ${res?.message}`, [
            {
                text: "OK",
                onPress: () => {
                    console.log("Datos a enviar:", data);
                    setScannedData(null);
                    isScanning.current = false; // Resetear para permitir nuevo escaneo
                },
            },
        ]);
    };

    // Solicitar permisos con feedback
    const handleRequestPermission = async () => {
        const { granted } = await requestPermission();
        if (!granted) {
            Alert.alert(
                "Permiso requerido",
                "Necesitas conceder permisos de cámara para usar el escáner QR"
            );
        } else {
            setIsActive(true);
        }
    };

    const makeAttendance = async (matricula: string) => {
        try {
            const res = await authAxios.post("/attendance/", { matricula });
            return {
                success: true,
                message: res.data.message,
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lector de QR para asistencia</Text>

            {permission?.granted ? (
                <>
                    <View style={styles.cameraContainer}>
                        {isActive ? (
                            <CameraView
                                ref={cameraRef}
                                style={StyleSheet.absoluteFill}
                                facing="back"
                                zoom={1} // Zoom al máximo (1)
                                barcodeScannerSettings={{
                                    barcodeTypes: ["qr"],
                                }}
                                onBarcodeScanned={({ data }) => {
                                    if (data) {
                                        setTimeout(async () => {
                                            handleBarcodeScanned({ data });
                                        }, 700);
                                    }
                                }}
                                onMountError={(error) => {
                                    console.error("Camera error:", error);
                                    Alert.alert(
                                        "Error",
                                        "No se pudo iniciar la cámara"
                                    );
                                }}
                            />
                        ) : (
                            <View style={styles.cameraPlaceholder}>
                                <Text style={styles.placeholderText}>
                                    {scannedData
                                        ? `Escaneado: ${scannedData}`
                                        : "Cámara apagada"}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.controls}>
                        <Pressable
                            style={[
                                styles.button,
                                isActive ? styles.buttonOff : styles.buttonOn,
                            ]}
                            onPress={() => {
                                setIsActive(!isActive);
                                if (!isActive) {
                                    isScanning.current = false; // Resetear al activar
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>
                                {isActive ? "Apagar Cámara" : "Encender Cámara"}
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        Necesitamos permisos para acceder a la cámara
                    </Text>
                    <Pressable
                        style={styles.button}
                        onPress={handleRequestPermission}
                    >
                        <Text style={styles.buttonText}>Conceder Permisos</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#14213d",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    cameraContainer: {
        width: "90%",
        aspectRatio: 1,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
        backgroundColor: "#2d2d2d",
    },
    cameraPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d2d2d",
    },
    placeholderText: {
        color: "#aaa",
        fontSize: 16,
        textAlign: "center",
        padding: 20,
    },
    controls: {
        width: "100%",
        alignItems: "center",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 8,
        minWidth: 200,
        alignItems: "center",
    },
    buttonOn: {
        backgroundColor: "#3B82F6",
    },
    buttonOff: {
        backgroundColor: "#ef4444",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    permissionContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    permissionText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        maxWidth: 300,
    },
});
