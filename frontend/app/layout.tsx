import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import { AppThemeProvider } from "@/components/AppThemeProvider";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { APP_BACKGROUND_GRADIENT } from "@/theme/colorTokens";

export const metadata: Metadata = {
  title: "Natality Stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box
        component="body"
        sx={{
          m: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: APP_BACKGROUND_GRADIENT,
          backgroundAttachment: "fixed",
        }}
      >
        <AppThemeProvider>
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {children}
          </Box>
          <AppFooter />
        </AppThemeProvider>
      </Box>
    </html>
  );
}
