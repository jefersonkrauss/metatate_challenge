import {PaletteMode} from "@mui/material";
import {ThemeMode} from "@/theme/theme.ts";

export enum ThemeLocalStorageKeys {
    mode = "themeMode",
}

export const currentMode = (): ThemeMode => {
    const mode = localStorage.getItem(ThemeLocalStorageKeys.mode);
    return mode == ThemeMode.Light ? ThemeMode.Light : ThemeMode.Dark;
}

export const setCurrentMode = (mode: PaletteMode) => {
    localStorage.setItem(ThemeLocalStorageKeys.mode, mode);
};

export const toggleCurrentMode = () => {
    const mode = currentMode() == ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    setCurrentMode(mode);
};
