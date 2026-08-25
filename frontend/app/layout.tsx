import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import { AppThemeProvider } from "@/components/AppThemeProvider";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { APP_BACKGROUND_GRADIENT } from "@/theme/colorTokens";
import { YearProvider } from "@/lib/yearContext";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export const metadata: Metadata = {
  title: "Natality Stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitColorSchemeScript attribute="class" />
      </head>
      <AppThemeProvider>
        <YearProvider>
          <Box
            component="body"
            sx={{
              m: 0,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              background: APP_BACKGROUND_GRADIENT,
              backgroundAttachment: "fixed",
              position: "relative",
              "&::before": {
                content: '""',
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0, 0, 0, 0)",
                zIndex: -1,
                pointerEvents: "none",
                transition: "background 0.3s ease",
              },
              ...theme => theme.applyStyles("dark", {
                "&::before": {
                  background: "rgba(10, 10, 20, 0.85)",
                }
              }),
            }}
          >
            <AppHeader />
            <Box
              component="main"
              sx={{
                mx: "auto",
                width: "100%",
                maxWidth: "1200px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                my: { sm: 0, md: 4 },
                py: 4,
                px: 3,
                borderRadius: { sm: 0, md: 2 },
                backgroundColor: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 10px 32px 0 rgba(31, 38, 135, 0.06)",
                ...theme => theme.applyStyles("dark", {
                  backgroundColor: "rgba(20, 20, 30, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }),
              }}
            >
              {children}
            </Box>
            <AppFooter />
          </Box>
        </YearProvider>
      </AppThemeProvider>
    </html>
  );
}
