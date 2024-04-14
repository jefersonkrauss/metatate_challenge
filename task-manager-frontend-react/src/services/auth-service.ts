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

        const beResponse = response.data;
        let user = undefined

        if (response.status === 200) {
            user = camelizeKeys<User>(beResponse.data) as User;
            localStorage.setItem(UserSessionKeys.authToken, JSON.stringify(response.headers.authorization));
            localStorage.setItem(UserSessionKeys.user, JSON.stringify(user));
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error
    }
};

export const isAuthenticated = () => !!localStorage.getItem(UserSessionKeys.authToken)

export const logout = () => {
    localStorage.removeItem(UserSessionKeys.authToken);
    localStorage.removeItem(UserSessionKeys.user);
};