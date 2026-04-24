import type { Metadata } from "next";
import "./globals.css";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { AppThemeProvider } from "@/components/AppThemeProvider";
import { APP_BACKGROUND_GRADIENT } from "@/theme/colorTokens";

export const metadata: Metadata = {
  title: "Natality",
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
          <AppBar position="static">
            <Toolbar
              sx={{
                gap: 2,
                display: "flex",
                px: 4,
                py: 2,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Link
                href="/"
                sx={{
                  mr: 2,
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600 }}
                  color="inherit"
                >
                  Natality Stats
                </Typography>
              </Link>
              <Button variant="contained" size="small" href="/">
                Overview
              </Button>
              <Button variant="contained" size="small" href="/vbac">
                VBAC Predictor
              </Button>
            </Toolbar>
          </AppBar>
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
