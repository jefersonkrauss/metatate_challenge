import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "@/context/AuthContext.tsx";
import {RouterPaths} from "@/constants/router-paths.ts";


const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Navigate to={RouterPaths.login} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
