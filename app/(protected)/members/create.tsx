import CustomInput from "@/app/components/CustomInput";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    View,
    Modal,
    ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberCreateFields, memberCreateSchema } from "@/types/member";
import CustomButton from "@/app/components/CustomButton";
import axios from "axios";
import authAxios from "@/config/authAxios";

export default function CreateMember() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(memberCreateSchema),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors([]);
            setMessage(undefined);
        }, 10000);
        return () => clearTimeout(timer);
    }, [errors, message]);

    const onChangeDate = (event: any, selectedDate: Date) => {
        setOpen(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onSubmit = async (data: MemberCreateFields) => {
        try {
            const res = await authAxios.post("/member", data);
            if (res.status === 201) {
                setMessage(res.data.message);
                control._reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessages: string[] = [];
                // 1. Errores de express-validator
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((err: any) => {
                        errorMessages.push(err.msg);
                    });
                }
                // 2. Errores conocidos del servidor
                else if (error.response.data.error?.message) {
                    errorMessages.push(error.response.data.error.message);
                }
                setErrors(errorMessages);
            } else {
                console.error("Error inesperado:", error);
                setErrors(["Ocurrió un error inesperado"]);
            }
        }
    };

    return (
        <View className="flex-1 bg-background p-4">
            <Stack.Screen
                options={{
                    title: "Crear nuevo miembro",
                    headerTitleAlign: "center",
                }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex justify-between items-center mb-6"
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Mensaje de éxito */}
                    {message && (
                        <View className="mb-4 p-3 bg-green-500 rounded-md">
                            <Text className="text-white text-center">
                                {message}
                            </Text>
                        </View>
                    )}

                    {/* Errores del backend */}
                    {errors.length > 0 && (
                        <View className="mb-4 p-3 bg-red-500 rounded-md">
                            {errors.map((error, index) => (
                                <Text key={index} className="text-white">
                                    - {error}
                                </Text>
                            ))}
                        </View>
                    )}
                    <Text className="text-xl font-bold text-white my-4">
                        Llena el formulario con los datos del cliente
                    </Text>
                    <View className="m-2 p-6 bg-gray-900 w-full rounded-lg shadow-lg">
                        <Text className="text-white p-2 text-lg font-bold">
                            Nombre:
                        </Text>
                        <CustomInput
                            control={control}
                            name="name"
                            placeholder="Nombre usuario"
                            autoCapitalize="words"
                        />
                        <Text className="text-white p-2 text-lg font-bold">
                            Apellidos:
                        </Text>
                        <CustomInput
                            control={control}
                            name="last_name"
                            placeholder="Nombre usuario"
                            autoCapitalize="words"
                        />
                        <Text className="text-white p-2 text-lg font-bold">
                            Email:
                        </Text>
                        <CustomInput
                            control={control}
                            name="email"
                            placeholder="Email usuario"
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <Text className="text-white p-2 text-lg font-bold">
                            Telefono:
                        </Text>
                        <CustomInput
                            control={control}
                            name="phone"
                            placeholder="telefono usuario"
                            autoCapitalize="words"
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                        <Text className="text-white p-2 text-lg font-bold">
                            Genero (M o F):
                        </Text>
                        <CustomInput
                            control={control}
                            name="gender"
                            placeholder="Nombre usuario"
                            autoCapitalize="words"
                            maxLength={1}
                        />

                        <Text className="text-white p-2 text-lg font-bold">
                            Fecha de nacimiento:
                        </Text>
                        <Controller
                            control={control}
                            name="born_date"
                            render={({ field: { onChange } }) => (
                                <>
                                    <TouchableOpacity
                                        onPress={() => setOpen(true)}
                                        className="bg-gray-800 p-3 rounded-lg mb-4"
                                    >
                                        <Text className="text-white">
                                            {date.toLocaleDateString()}
                                        </Text>
                                    </TouchableOpacity>

                                    {Platform.OS === "android" && open && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                onChangeDate(
                                                    event,
                                                    selectedDate!
                                                );
                                                onChange(
                                                    selectedDate!.toISOString()
                                                );
                                            }}
                                        />
                                    )}

                                    {Platform.OS === "ios" && (
                                        <Modal
                                            visible={open}
                                            transparent
                                            animationType="slide"
                                        >
                                            <View className="flex-1 justify-end bg-black/50">
                                                <View className="bg-gray-900 p-4 rounded-t-lg">
                                                    <DateTimePicker
                                                        value={date}
                                                        mode="date"
                                                        display="spinner"
                                                        onChange={(
                                                            event,
                                                            selectedDate
                                                        ) => {
                                                            onChangeDate(
                                                                event,
                                                                selectedDate!
                                                            );
                                                            onChange(
                                                                selectedDate!.toISOString()
                                                            );
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setOpen(false)
                                                        }
                                                        className="bg-blue-500 p-3 rounded-lg my-4"
                                                    >
                                                        <Text className="text-white text-center ">
                                                            Seleccionar
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Modal>
                                    )}
                                </>
                            )}
                        />

                        <CustomButton
                            text="Enviar datos"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
