import type { ChartData, ChartOptions } from "chart.js";
import Box from "@mui/material/Box";
import { Bar } from "react-chartjs-2";

type ResponsiveBarChartProps = {
  data: ChartData<"bar", number[], string>;
  options: ChartOptions<"bar">;
  minWidth?: number;
  mobileHeight?: number;
  desktopHeight?: number;
};

export default function ResponsiveBarChart({
  data,
  options,
  minWidth = 700,
  mobileHeight = 320,
  desktopHeight = 420,
}: ResponsiveBarChartProps) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto", pb: 1 }}>
      <Box
        sx={{
          minWidth: { xs: `${minWidth}px`, md: "100%" },
          height: { xs: `${mobileHeight}px`, md: `${desktopHeight}px` },
        }}
      >
        <Bar
          data={data}
          options={{
            ...options,
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Box>
    </Box>
  );
}