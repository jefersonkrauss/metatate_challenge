import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useFormInput } from '../hooks/useFormInput';
import {useAlert} from "@/context/AlertContext.tsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const { login } = useAuth();
    const email = useFormInput('');
    const password = useFormInput('');
    const { showAlert } = useAlert()
    const { t} = useTranslation()
    const [ error, setError ] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            if (!email.value) return;
            if (!password.value) return;

            await login(email.value, password.value);
            navigate('/home');
        } catch (error) {
            setError(true)
            showAlert(t('incorrectUserOrPassword'), 'warning', 3000)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField error={error} fullWidth label="E-mail" variant="outlined" margin="normal" autoComplete="email" required type="email" {...email} />
                    <TextField error={error} fullWidth label="Password" variant="outlined" margin="normal" required type="password" {...password} />
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
