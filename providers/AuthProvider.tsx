import authAxios from "@/config/authAxios";
import * as SecureStore from "expo-secure-store";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
export type AuthType = {
    name: string;
    email: string;
    role: string;
};
const AuthContext = createContext({
    isAuthenticated: false,
    user: {name: "", email: "", role: ""},
    signIn: (token: string) => {},
    signOut: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<AuthType>({
        name: "",
        email: "",
        role: "",
    });
    const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(
        undefined
    );
    const signIn = async (token: string) => {
        try {
            await SecureStore.setItemAsync("auth_token", token);
            const res = await authAxios.get("/auth/user");
                setUser({
                    name: `${res.data.name} ${res.data.lastName}`,
                    email: res.data.email,
                    role: res.data.role.name,
                });
            setAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await SecureStore.getItemAsync("auth_token");
                if (!token) {
                    setAuthenticated(false);
                    return;
                }
                // Verificar token válido con el backend
                const res = await authAxios.get("/auth/user");
                setUser({
                    name: `${res.data.name} ${res.data.lastName}`,
                    email: res.data.email,
                    role: res.data.role.name,
                });
                setAuthenticated(true);
            } catch (error) {
                console.error("Error de autenticación:", error);
                await SecureStore.deleteItemAsync("auth_token");
                setAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const signOut = async () => {
        await SecureStore.deleteItemAsync("auth_token");
        setAuthenticated(false);
        setUser({ name: "", email: "", role: "" });
    };
    if (isAuthenticated === undefined) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
