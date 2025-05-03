import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
    email: z
        .string({ message: "El email es requerido" })
        .email({ message: "El email no es valido" }),
    password: z
        .string({ message: "Contraseña requerida" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type SignInFields = z.infer<typeof signInSchema>;

export default function Index() {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(signInSchema),
    });

    const onSignIn = (data: SignInFields) => {
        console.log("Pressed...", data);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 items-center gap-2 justify-center bg-background "
        >
            <Text className="text-5xl font-bold text-text ">Login</Text>
            <View className="w-72">
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
            </View>
        </KeyboardAvoidingView>
    );
}
