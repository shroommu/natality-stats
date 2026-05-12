"use client";

import type { MouseEvent } from "react";

import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import {
  AVAILABLE_YEARS,
  useSelectedYear,
  type DataYear,
} from "@/lib/yearContext";

export function YearToggle() {
  const { year, setYear } = useSelectedYear();

  const handleYear = (_: MouseEvent<HTMLElement>, value: DataYear | null) => {
    if (value !== null) setYear(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography component="span" variant="body2" color="text.secondary">
        Data year
      </Typography>
      <ToggleButtonGroup
        value={year}
        exclusive
        onChange={handleYear}
        aria-label="Select natality data year"
        size="small"
      >
        {AVAILABLE_YEARS.map((y) => (
          <ToggleButton key={y} value={y} aria-label={`Year ${y}`}>
            {y}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
