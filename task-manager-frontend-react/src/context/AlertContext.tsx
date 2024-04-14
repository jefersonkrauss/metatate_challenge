import Alert from '@mui/material/Alert';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface AlertContextType {
    showAlert: (message: string, severity: 'success' | 'error' | 'warning' | 'info', dismiss?: number) => void;
    hideAlert: () => void;
    alertProps: AlertProps | null;
}

interface AlertProps {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    dismiss?: number;
}

interface AlertProviderProps {
    children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({children}: AlertProviderProps) => {
    const [alertProps, setAlertProps] = useState<AlertProps | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (alertProps?.dismiss) {
            timer = setTimeout(() => {
                setAlertProps(null);
            }, alertProps.dismiss);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [alertProps]);

    const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info', dismiss?: number) => {
        setAlertProps({ message, severity, dismiss });
    };

    const hideAlert = () => {
        setAlertProps(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, alertProps }}>
            {children}
            {alertProps && (
                <Alert
                    severity={alertProps.severity}
                    onClose={hideAlert}
                    style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, width: 'auto', maxWidth: '90%' }}
                >
                    {alertProps.message}
                </Alert>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
