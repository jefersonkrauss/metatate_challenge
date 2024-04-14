import '@/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {AlertProvider} from "@/context/AlertContext.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";
import Layout from "@/components/Layout.tsx";

function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/admin/*" element={<Layout/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </AlertProvider>
    )
}

export default App
