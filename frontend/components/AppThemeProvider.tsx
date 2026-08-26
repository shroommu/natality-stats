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
          light: "#c4b5fd",
          contrastText: "#121212",
        },
        secondary: {
          main: "#f582c3",
          light: "#f9a8d4",
          contrastText: "#121212",
        },
        info: {
          main: "#7cb6ff",
          contrastText: "#121212",
        },
        text: {
          primary: "#f2f2f8",
          secondary: "#c3c3d4",
        },
        divider: "rgba(255, 255, 255, 0.14)",
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
            backgroundColor: "rgba(24, 24, 36, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.12)",
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
            backgroundColor: "rgba(24, 24, 36, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }),
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.applyStyles("dark", {
            color: "var(--mui-palette-text-secondary)",
            borderColor: "rgba(255, 255, 255, 0.23)",
            "&.Mui-selected": {
              color: "var(--mui-palette-primary-contrastText)",
              backgroundColor: "var(--mui-palette-primary-main)",
              "&:hover": {
                backgroundColor: "var(--mui-palette-primary-light)",
              },
            },
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
