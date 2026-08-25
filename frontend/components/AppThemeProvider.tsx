"use client";

import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { COLOR_TOKENS } from "@/theme/colorTokens";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: COLOR_TOKENS.lightPurple,
          contrastText: "#ffffff",
        },
        secondary: {
          main: COLOR_TOKENS.lightPink,
          contrastText: "#ffffff",
        },
        info: {
          main: COLOR_TOKENS.lightBlue,
          contrastText: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#9e8cfc",
          contrastText: "#121212",
        },
        secondary: {
          main: "#f582c3",
          contrastText: "#121212",
        },
        info: {
          main: "#7cb6ff",
          contrastText: "#121212",
        },
      },
    },
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
