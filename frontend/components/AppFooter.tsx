import { Box, Typography } from "@mui/material";

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mx: "auto",
        mt: "auto",
        width: "100%",
        maxWidth: "1200px",
        px: 3,
        py: 2,
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        {`Natality Stats © ${year}`}
      </Typography>
    </Box>
  );
}
