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
      <body
        style={{
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
              my: 4,
              py: 4,
              px: 3,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {children}
          </Box>
        </AppThemeProvider>
      </body>
    </html>
  );
}
