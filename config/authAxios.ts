import axios from "axios";
import * as SecureStore from "expo-secure-store";

const authAxios = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_REST}`
});

authAxios.interceptors.request.use(async (config) => {
    try {
        const token = await SecureStore.getItemAsync("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No se encontró token en SecureStore");
        }
        return config;
    } catch (error) {
        console.error("Error al obtener el token:", error);
        return Promise.reject(error);
    }
});

export default authAxios;
