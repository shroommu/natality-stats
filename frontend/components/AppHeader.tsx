"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "VBAC", href: "/vbac" },
  { label: "Down Syndrome", href: "/down-syndrome" },
] as const;

export function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    const isDark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setMode(isDark ? "light" : "dark");
  };

  const isDarkActive = mounted && (mode === "dark" || (mode === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={[
          {
            gap: { xs: 1.25, sm: 2 },
            display: "flex",
            justifyContent: { xs: "space-between", sm: "flex-start" },
            px: { xs: 1.5, sm: 4 },
            py: { xs: 1.25, sm: 2 },
            backgroundColor: {
              xs: (theme) => theme.palette.primary.main,
              sm: "rgba(255, 255, 255, 0.92)",
            },
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(6px)",
          },
          theme => theme.applyStyles("dark", {
            backgroundColor: "rgba(20, 20, 30, 0.92)",
          }),
        ]}
      >
        <IconButton
          aria-label="Open navigation menu"
          onClick={drawerOpen ? closeDrawer : openDrawer}
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            color: { xs: "white", sm: "text.primary" },
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Link
          component={NextLink}
          href="/"
          sx={{
            color: "text.primary",
            textDecoration: "none",
            minWidth: 0,
            flexGrow: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.5rem" },
              color: { xs: "white", sm: "text.primary" },
              letterSpacing: { xs: "0.01em", sm: 0 },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Natality Stats
          </Typography>
        </Link>

        <Box
          component="nav"
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 1.25,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                component={NextLink}
                variant={isActive ? "contained" : "text"}
                size="small"
                href={item.href}
                sx={{
                  color: isActive ? "primary.contrastText" : "text.secondary",
                  fontWeight: isActive ? 600 : 500,
                  textTransform: "none",
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ flexGrow: { xs: 0, sm: 1 } }} />
        <IconButton
          onClick={toggleMode}
          aria-label="Toggle light or dark theme"
          sx={{
            color: { xs: "white", sm: "text.primary" },
          }}
        >
          {isDarkActive ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <Box
          sx={{
            width: 280,
            px: 2,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton
              aria-label="Close navigation menu"
              onClick={closeDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="nav"
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  component={NextLink}
                  variant={isActive ? "contained" : "text"}
                  href={item.href}
                  onClick={closeDrawer}
                  sx={{
                    justifyContent: "flex-start",
                    minHeight: 42,
                    borderRadius: 2,
                    color: isActive ? "primary.contrastText" : "text.primary",
                    fontWeight: isActive ? 600 : 500,
                    textTransform: "none",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
