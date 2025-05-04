import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/sign-in" />;
    }
    console.log(user.role)
    return (
        <>
            <Slot />
        </>
    );
}
