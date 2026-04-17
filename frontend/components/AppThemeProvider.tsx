"use client";

import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
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
