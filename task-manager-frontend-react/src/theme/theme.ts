import { createTheme } from '@mui/material/styles';

export enum ThemeMode {
    Dark = 'dark',
    Light = 'light'
}


const theme = (mode = ThemeMode.Dark) => createTheme({
    palette: {
        mode: mode,
    },
});

export default theme;
