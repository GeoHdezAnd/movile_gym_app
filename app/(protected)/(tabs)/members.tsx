import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import authAxios from "@/config/authAxios";
import axios from "axios";
import { Link, router } from "expo-router";

type Member = {
    user: {
        id: string;
        name: string;
        lastName: string;
        email: string;
        phone: string;
        confirmed: boolean;
        profile?: {
            gender: string;
            birthDate: string;
            matricula: string;
        }; // Cambia 'any' por el tipo correcto si lo conoces
    };
};

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
        const getMembers = async () => {
            try {
                const res = await authAxios.get("/member");
                setMembers(res.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.error.message);
                } else {
                    setError("Error inesperado al cargar los clientes");
                }
            } finally {
                setLoading(false);
            }
        };
        getMembers();
    }, []);

    useEffect(() => {
        if (message || error) {
            setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 8000); // Oculta el mensaje después de 8 segundos
        }
    }, [message, error]);

    const handleDelete = async (id: string) => {
        try {
            const res = await authAxios.delete(`/member/${id}`);
            setMembers((prevMembers) =>
                prevMembers.filter((member) => member.user.id !== id)
            );
            setMessage(res.data.message);
        } catch (error) {
            console.log("Error al eliminar el cliente:", error);
        }
    };

    return (
        <View className="flex-1 pt-20 bg-background p-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-white">
                    Clientes registrados
                </Text>

                <Link
                    className="p-3 rounded-full bg-blue-500"
                    href="/(protected)/members/create"
                >
                    <MaterialIcons name="person-add" size={24} color="white" />
                </Link>
            </View>
            {/* Estado de carga */}
            {loading && (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#3b82f6" />
                </View>
            )}

            {/* Mensaje de error */}
            {error && (
                <View className="bg-red-100 p-4 rounded-lg mb-4">
                    <Text className="text-red-800">{error}</Text>
                </View>
            )}

            {message && (
                <View className=" p-4 rounded-lg mb-4">
                    <Text className="text-green-500 font-bold">{message}</Text>
                </View>
            )}

            {/* Listado de Clientes */}
            <FlatList
                data={members}
                keyExtractor={(item) => item.user.id}
                renderItem={({ item }) => (
                    <View className="bg-gray-800 p-4 rounded-lg mb-3">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <Text className="text-white text-lg font-semibold">
                                    {item.user.name} {item.user.lastName}
                                </Text>
                                <Text className="text-gray-400">
                                    Email: {item.user.email}
                                </Text>
                                <Text className="text-gray-400">
                                    Teléfono: {item.user.phone}
                                </Text>
                                <Text className="text-gray-400">
                                    Estado:{" "}
                                    {item.user.confirmed
                                        ? "Confirmado"
                                        : "Pendiente"}
                                </Text>
                                {/* Si necesitas mostrar datos del perfil */}
                                {item.user.profile && (
                                    <Text className="text-gray-400">
                                        Matricula: {item.user.profile.matricula}
                                    </Text>
                                )}
                            </View>

                            {/* Botones de Acción */}
                            <View className="flex-row gap-2 m-auto">
                                <Link
                                    className="bg-yellow-500 p-2 rounded-full"
                                    href={{
                                        pathname: "/(protected)/members/[id]",
                                        params: { id: item.user.id },
                                    }}
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={18}
                                        color="white"
                                    />
                                </Link>

                                <TouchableOpacity
                                    className="bg-red-500 p-2 rounded-full"
                                    onPress={() => handleDelete(item.user.id)}
                                >
                                    <MaterialIcons
                                        name="delete"
                                        size={18}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <Ionicons
                            name="people-outline"
                            size={50}
                            color="#6b7280"
                        />
                        <Text className="text-gray-500 mt-4 text-center">
                            No hay clientes registrados aún
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
