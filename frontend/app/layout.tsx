import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import { AppThemeProvider } from "@/components/AppThemeProvider";
import { AppHeader } from "@/components/AppHeader";
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
        </AppThemeProvider>
      </Box>
    </html>
  );
}
