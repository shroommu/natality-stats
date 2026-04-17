import type { Metadata } from "next";
import "./globals.css";
import { Box, Button, Link, Typography } from "@mui/material";
import { AppThemeProvider } from "@/components/AppThemeProvider";

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
      <body>
        <AppThemeProvider>
          <header>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Link href="/">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginRight: 2 }}
                  gutterBottom
                >
                  Natality
                </Typography>
              </Link>
              <Button variant="outlined" size="small" href="/vbac">
                VBAC Explorer
              </Button>
            </Box>
          </header>
          <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 md:p-10">
            {children}
          </main>
        </AppThemeProvider>
      </body>
    </html>
  );
}
