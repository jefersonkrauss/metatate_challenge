import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {UserSessionKeys} from "@/services/auth-service.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    const token = localStorage.getItem(UserSessionKeys.authToken);

    if (token) {
        config.headers.Authorization = `${token}`;
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(UserSessionKeys.authToken);
            localStorage.removeItem(UserSessionKeys.user);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
