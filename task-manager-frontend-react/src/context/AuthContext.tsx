import * as authService from '@/services/auth-service.ts';
import {UserSessionKeys} from '@/services/auth-service.ts';
import {User} from "@/domain/model/user.model.ts";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem(UserSessionKeys.authToken);
        setIsAuthenticated(!!token)
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            const user = authService.getUser()
            setUser(user);
        } else {
            setUser(null);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await authService.login({ email, password });
            setIsAuthenticated(true)
            setUser(data!);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null);
        authService.logout();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
