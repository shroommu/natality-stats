"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "@emotion/react";

const NAV_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "VBAC Predictor", href: "/vbac" },
] as const;

export function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        sx={{
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
        }}
      >
        <IconButton
          aria-label="Open navigation menu"
          onClick={drawerOpen ? closeDrawer : openDrawer}
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Link
          href="/"
          sx={{
            color: "black",
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
              color: { xs: "white", sm: "black" },
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
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="contained"
              size="small"
              href={item.href}
            >
              {item.label}
            </Button>
          ))}
        </Box>
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
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.href}
                variant="contained"
                href={item.href}
                onClick={closeDrawer}
                sx={{
                  justifyContent: "flex-start",
                  minHeight: 42,
                  borderRadius: 2,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
