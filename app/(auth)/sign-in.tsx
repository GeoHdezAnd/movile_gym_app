import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

import axios from "axios";
import { useEffect, useState } from "react";
import ErrorText from "../components/ErrorText";
import clientAxios from "@/config/axios";

const signInSchema = z.object({
    email: z
        .string({ message: "El email es requerido" })
        .email({ message: "El email no es valido" }),
    password: z.string({ message: "Contraseña requerida" }),
});

type SignInFields = z.infer<typeof signInSchema>;

export default function SignIn() {
    const [error, setError] = useState<string | undefined>(undefined);

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(signInSchema),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(undefined);
        }, 10000); // Cambia el tiempo según tus necesidades
    }, [error]);

    const { signIn, isAuthenticated } = useAuth();

    const handleLogin = async (data: SignInFields) => {
        try {
            const response = await clientAxios.post("/auth/sign-in", data);

            signIn(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error.message);
            } else {
                console.error("Error inesperado:", error);
            }
        }
    };

    const onSignIn = async (data: SignInFields) => {
        await handleLogin(data);
    };

    if (isAuthenticated) {
        return <Redirect href="/(protected)/(admin)/home" />;
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 items-center gap-2 justify-center bg-background "
        >
            <Text className="text-5xl font-bold text-text ">Login</Text>
            <View className="w-72">
                {error !== undefined && <ErrorText error={error} />}
                <Text className="left-0 text-white p-2 text-lg font-bold">
                    Email:
                </Text>

                <CustomInput
                    control={control}
                    name="email"
                    placeholder="eje@correo.com"
                    autoFocus
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />

                <Text className="left-0 text-white p-2 text-lg font-bold">
                    Password:
                </Text>
                <CustomInput
                    control={control}
                    name="password"
                    placeholder="******"
                    secureTextEntry
                />

                <CustomButton
                    text="Iniciar Sesión"
                    onPress={handleSubmit(onSignIn)}
                />
                <Link
                    className="text-blue-400 font-semibold py-4"
                    href="/sign-up"
                >
                    ¿Aún no tienes cuenta?
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}
