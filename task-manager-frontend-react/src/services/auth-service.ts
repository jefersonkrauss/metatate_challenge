import {User} from "@/domain/model/user.model.ts";
import axiosInstance from "@/utils/http-client.ts";
import {camelizeKeys} from "humps";
import {BeResponse} from "@/dto/be-response.dto.ts";

export enum UserSessionKeys {
    authToken = "authToken",
    user = "user",
}

interface LoginData {
    email: string;
    password: string;
}

interface Data {
    user: LoginData
}

export const login = async (loginData: LoginData) => {
    try {
        const data: Data = { user: loginData }
        const response = await axiosInstance.post<BeResponse<User>>(`/login`, data);

        if (response.status === 200) {
            localStorage.setItem(UserSessionKeys.authToken, JSON.stringify(response.headers.authorization));
            localStorage.setItem(UserSessionKeys.user, JSON.stringify(response.data));
        }
        return camelizeKeys<User>(response.data.data) as User;
    } catch (error) {
        console.log(error);
        throw error
    }
};

export const logout = () => {
    localStorage.removeItem(UserSessionKeys.authToken);
    localStorage.removeItem(UserSessionKeys.user);
};
