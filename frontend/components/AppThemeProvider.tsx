"use client";

import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { COLOR_TOKENS } from "@/theme/colorTokens";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.01)",
          borderRadius: 12,
          ...theme.applyStyles("dark", {
            backgroundColor: "rgba(30, 30, 45, 0.45)",
            borderColor: "rgba(255, 255, 255, 0.06)",
          }),
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.01)",
          borderRadius: 12,
          margin: "12px 0",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "12px 0",
          },
          ...theme.applyStyles("dark", {
            backgroundColor: "rgba(30, 30, 45, 0.45)",
            borderColor: "rgba(255, 255, 255, 0.06)",
          }),
        }),
      },
    },
  },
});

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
