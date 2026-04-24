"use client";

import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { COLOR_TOKENS } from "@/theme/colorTokens";

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_TOKENS.lightPurple,
    },
    secondary: {
      main: COLOR_TOKENS.lightPink,
    },
    info: {
      main: COLOR_TOKENS.lightBlue,
    },
  },
  colorSchemes: {
    dark: true,
  },
});

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
