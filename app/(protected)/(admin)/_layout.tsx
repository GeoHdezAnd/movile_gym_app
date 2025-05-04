import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
    const { user} = useAuth();
    console.log(user.role)
    if (user.role !== "admin") { 
        return <Redirect href={"/(protected)/(user)/home"} />;
    }
    return <Slot />;
}