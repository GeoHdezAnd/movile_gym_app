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
    phone: string;
    role: string;
};

export type MemberAuthType = {
    name: string;
    email: string;
    phone: string;
    role: string;
    profile: {
        matricula: string;
        gender: string;
    };
};
const AuthContext = createContext({
    isAuthenticated: false,
    user: { name: "", email: "", phone: "", role: "" },
    member: {
        name: "",
        email: "",
        phone: "",
        role: "",
        profile: { matricula: "", gender: "" },
    },
    signIn: (token: string) => {},
    signOut: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<AuthType>({
        name: "",
        email: "",
        phone: "",
        role: "",
    });
    const [member, setMember] = useState<MemberAuthType>({
        name: "",
        email: "",
        phone: "",
        role: "",
        profile: { matricula: "", gender: "" },
    });
    const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(
        undefined
    );
    const signIn = async (token: string) => {
        try {
            await SecureStore.setItemAsync("auth_token", token);
            const res = await authAxios.get("/auth/user");
            if (res.data.role.name === "member") {
                setMember({
                    name: `${res.data.name} ${res.data.lastName}`,
                    email: res.data.email,
                    phone: res.data.phone,
                    role: res.data.role.name,
                    profile: {
                        matricula: res.data.memberProfile.matricula,
                        gender: res.data.memberProfile.gender,
                    },
                });
                setAuthenticated(true);
                return;
            }
            setUser({
                name: `${res.data.name} ${res.data.lastName}`,
                email: res.data.email,
                phone: res.data.phone,
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
                if (res.data.role.name === "member") {
                    setMember({
                        name: `${res.data.name} ${res.data.lastName}`,
                        email: res.data.email,
                        phone: res.data.phone,
                        role: res.data.role.name,
                        profile: {
                            matricula: res.data.memberProfile.matricula,
                            gender: res.data.memberProfile.gender,
                        },
                    });
                    setAuthenticated(true);
                    return;
                }
                setUser({
                    name: `${res.data.name} ${res.data.lastName}`,
                    phone: res.data.phone,
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
        setUser({ name: "", email: "", phone: "", role: "" });
        setMember({
            name: "",
            email: "",
            phone: "",
            role: "",
            profile: { matricula: "", gender: "" },
        });
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
            value={{ isAuthenticated, user, member, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
