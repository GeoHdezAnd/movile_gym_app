import authAxios from "@/config/authAxios";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type PlansType = {
    id: string;
    name: string;
    description: string;
    price: number;
    benefits: string[];
    durationDays: number;
    createdAt: string;
    updatedAt: string;
};

export default function Plans() {
    const [planes, setPlanes] = useState<PlansType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPlanes = async () => {
            try {
                const res = await authAxios.get("/plan");
                setPlanes(res.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.error.message);
                } else {
                    setError("Error inesperado al cargar los planes");
                }
            } finally {
                setLoading(false);
            }
        };
        getPlanes();
    }, []);

    return (
        <View className="flex-1 pt-20 bg-background p-4">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-white">
                    Planes registrados
                </Text>
                <TouchableOpacity
                    className="bg-blue-500 p-3 rounded-full"
                    onPress={() => console.log("Navegar a registro")}
                >
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
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

            <FlatList
                data={planes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-gray-800 p-4 rounded-lg mb-3">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <Text className="text-white text-lg font-semibold">
                                    {item.name}
                                </Text>
                                <Text className="text-gray-400">
                                    Descripción: {item.description}
                                </Text>
                                <Text className="text-gray-400">
                                    Precio: ${item.price}
                                </Text>
                                <Text className="text-gray-400">
                                    Duración días: {item.durationDays}
                                </Text>
                                <Text className="text-gray-400">
                                    Beneficios:{" "}
                                    <Text className="flex-col">
                                        {item.benefits.map((benefit, index) => (
                                            <Text className="p-2" key={index}>
                                                {index > 0 ? ", " : ""}
                                                {benefit}
                                            </Text>
                                        ))}
                                    </Text>
                                </Text>
                            </View>
                            {/* Botones de Acción */}
                            <View className="flex-row gap-2 m-auto">
                                <TouchableOpacity
                                    className="bg-yellow-500 p-2 rounded-full"
                                    onPress={() =>
                                        console.log("Editar", item.id)
                                    }
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={18}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="bg-red-500 p-2 rounded-full"
                                    onPress={() =>
                                        console.log("Eliminar", item.id)
                                    }
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
            />
        </View>
    );
}
