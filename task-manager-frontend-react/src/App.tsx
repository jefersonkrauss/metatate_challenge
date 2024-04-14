import '@/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {AlertProvider} from "@/context/AlertContext.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import {HomePage} from "@/pages/HomePage.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";

function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/home" element={<HomePage/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </AlertProvider>
    )
}

export default App
