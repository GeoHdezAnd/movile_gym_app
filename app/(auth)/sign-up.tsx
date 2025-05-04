import { KeyboardAvoidingView, Platform, Text } from "react-native";

export default function SignUp() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 items-center gap-2 justify-center bg-background "
        >
            <Text className="text-white">Pantalla de registro</Text>
        </KeyboardAvoidingView>
    );
}
