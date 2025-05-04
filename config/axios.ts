import axios from "axios";

const clientAxios = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_REST}`
})

export default clientAxios;