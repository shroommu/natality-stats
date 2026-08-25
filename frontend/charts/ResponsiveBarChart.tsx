"use client";

import type { ChartData, ChartOptions } from "chart.js";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material";
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
  const { mode, systemMode } = useColorScheme();
  const activeMode = mode === "system" ? systemMode : mode;
  const isDark = activeMode === "dark";

  const textColor = isDark ? "rgba(255, 255, 255, 0.87)" : "rgba(23, 23, 23, 0.87)";
  const secondaryColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(150, 150, 150, 0.15)";

  const enhancedOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...options?.plugins,
      title: {
        ...options?.plugins?.title,
        color: textColor,
      },
      legend: {
        ...options?.plugins?.legend,
        labels: {
          ...options?.plugins?.legend?.labels,
          color: secondaryColor,
        },
      },
    },
    datasets: {
      bar: {
        borderRadius: 6,
      },
    },
    scales: {
      ...options?.scales,
      x: {
        ...options?.scales?.x,
        grid: {
          display: false,
        },
        ticks: {
          ...options?.scales?.x?.ticks,
          color: secondaryColor,
        },
        title: {
          ...options?.scales?.x?.title,
          color: textColor,
        },
      },
      y: {
        ...options?.scales?.y,
        grid: {
          color: gridColor,
          borderDash: [5, 5],
        },
        ticks: {
          ...options?.scales?.y?.ticks,
          color: secondaryColor,
        },
        title: {
          ...options?.scales?.y?.title,
          color: textColor,
        },
      },
    },
  };

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
          options={enhancedOptions}
        />
      </Box>
    </Box>
  );
}