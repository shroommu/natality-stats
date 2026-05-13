"use client";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import type { CrossTabColumnMajor } from "@/hooks/useChartJson";

/** Matches single-series bar fill in existing charts. */
const HEATMAP_BASE = "rgb(136, 75, 215)";

export type ResponsiveHeatmapProps = {
  title: string;
  /** Column-major cross-tab from `DataFrame.to_json()` (orient=columns). */
  columnMajor: CrossTabColumnMajor;
  columnKeysInOrder: string[];
  rowKeysInOrder: string[];
  columnLabels: Record<string, string>;
  rowLabels: Record<string, string>;
  formatAnnotation: (value: number, columnKey: string) => string;
  formatTooltipBody?: (value: number, columnKey: string) => string;
  minWidth?: number;
  mobileHeight?: number;
  desktopHeight?: number;
};

function gatherValues(
  columnMajor: CrossTabColumnMajor,
  columnKeys: string[],
  rowKeys: string[],
): number[] {
  const out: number[] = [];
  for (const col of columnKeys) {
    const colMap = columnMajor[col];
    if (!colMap) continue;
    for (const row of rowKeys) {
      const v = colMap[row];
      if (typeof v === "number" && !Number.isNaN(v)) out.push(v);
    }
  }
  return out;
}

function normalize01(values: number[], v: number): number {
  if (values.length === 0) return 0.5;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return 0.5;
  return (v - min) / (max - min);
}

export default function ResponsiveHeatmap({
  title,
  columnMajor,
  columnKeysInOrder,
  rowKeysInOrder,
  columnLabels,
  rowLabels,
  formatAnnotation,
  formatTooltipBody,
  minWidth = 700,
  mobileHeight = 320,
  desktopHeight = 420,
}: ResponsiveHeatmapProps) {
  const flat = gatherValues(columnMajor, columnKeysInOrder, rowKeysInOrder);
  const nCols = columnKeysInOrder.length;
  const nRows = rowKeysInOrder.length;

  const gridTemplateColumns = `minmax(140px, 1.1fr) repeat(${nCols}, minmax(72px, 1fr))`;
  const gridTemplateRows = `auto repeat(${nRows}, minmax(44px, 1fr))`;

  return (
    <Box sx={{ width: "100%", overflowX: "auto", pb: 1 }}>
      <Box
        sx={{
          minWidth: { xs: `${minWidth}px`, md: "100%" },
          height: { xs: `${mobileHeight}px`, md: `${desktopHeight}px` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            textAlign: "center",
            mb: 1.5,
            flexShrink: 0,
          }}
        >
          {title}
        </Typography>
        <Box
          role="region"
          aria-label={title}
          sx={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns,
            gridTemplateRows,
            columnGap: 0.5,
            rowGap: 0.5,
            alignContent: "start",
          }}
        >
          <Box />
          {columnKeysInOrder.map((colKey) => (
            <Typography
              key={colKey}
              sx={{
                fontSize: 11,
                fontWeight: 600,
                textAlign: "center",
                alignSelf: "end",
                px: 0.5,
                lineHeight: 1.2,
              }}
            >
              {columnLabels[colKey] ?? colKey}
            </Typography>
          ))}
          {rowKeysInOrder.map((rowKey) => (
            <Box key={`row-${rowKey}`} sx={{ display: "contents" }}>
              <Typography
                sx={{
                  fontSize: 11,
                  pr: 1,
                  alignSelf: "center",
                  lineHeight: 1.2,
                }}
              >
                {rowLabels[rowKey] ?? rowKey}
              </Typography>
              {columnKeysInOrder.map((colKey) => {
                const colMap = columnMajor[colKey];
                const raw = colMap?.[rowKey];
                const value =
                  typeof raw === "number" && !Number.isNaN(raw) ? raw : 0;
                const t = normalize01(flat, value);
                const fillAlpha = 0.1 + 0.82 * t;
                const bg = alpha(HEATMAP_BASE, fillAlpha);
                const annotation = formatAnnotation(value, colKey);
                const tooltipPrimary = `${rowLabels[rowKey] ?? rowKey} · ${
                  columnLabels[colKey] ?? colKey
                }`;
                const tooltipSecondary =
                  formatTooltipBody?.(value, colKey) ?? annotation;

                return (
                  <Tooltip
                    key={`${rowKey}-${colKey}`}
                    title={
                      <Box component="span" sx={{ display: "block", py: 0.25 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {tooltipPrimary}
                        </Typography>
                        <Typography variant="body2">{tooltipSecondary}</Typography>
                      </Box>
                    }
                    arrow
                    enterDelay={200}
                  >
                    <Box
                      tabIndex={0}
                      role="gridcell"
                      aria-label={`${tooltipPrimary}, ${tooltipSecondary}`}
                      sx={{
                        bgcolor: bg,
                        borderRadius: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 0.5,
                        py: 0.5,
                        outline: "none",
                        "&:focus-visible": {
                          boxShadow: (theme) =>
                            `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${HEATMAP_BASE}`,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: t > 0.48 ? "common.white" : "text.primary",
                          textAlign: "center",
                          lineHeight: 1.15,
                          wordBreak: "break-word",
                        }}
                      >
                        {annotation}
                      </Typography>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
