import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/components/mui/AppAppBar';
import Hero from '@/components/mui/Hero';
import Features from '@/components/mui/Features';
import FAQ from '@/components/mui/FAQ';
import theme, {ThemeMode} from "@/theme/theme.ts";
import {useState} from "react";
import {currentMode, toggleCurrentMode} from "@/services/theme-service.ts";

const LandingPage = () => {
  const [mode, setMode] = useState<ThemeMode>(currentMode());

  const toggleColorMode = () => {
    setMode((prev) => (prev === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark));
    toggleCurrentMode()
  };

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Features />
        <Divider />
        <Divider />
        <FAQ />
      </Box>
    </ThemeProvider>
  );
};
export default LandingPage
