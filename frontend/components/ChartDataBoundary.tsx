"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type ChartDataBoundaryProps = {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
};

export function ChartDataBoundary({
  loading,
  error,
  children,
}: ChartDataBoundaryProps) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress aria-label="Loading chart data" />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" role="alert">
        {error}
      </Typography>
    );
  }
  return <>{children}</>;
}
