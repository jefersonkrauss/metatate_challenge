import './i18n/i18n';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material/styles";
import theme, {ThemeMode} from "@/theme/theme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme(ThemeMode.Dark)}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
)
