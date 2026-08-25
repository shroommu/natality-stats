"use client";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import type { CrossTabColumnMajor } from "@/hooks/useChartJson";

/** Base color used for cell fill; intensity scales with the cell's normalized value. */
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
  /** Fixed pixel height per data row; the chart is intrinsically sized by `nRows * rowHeight + header`. */
  rowHeight?: number;
  /** Optional axis label rendered above the column headers, spanning the data columns. */
  xAxisLabel?: string;
  /** Optional axis label rendered to the left of the row labels, vertically rotated (reads bottom-to-top). */
  yAxisLabel?: string;
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
  minWidth = 560,
  rowHeight = 45,
  xAxisLabel,
  yAxisLabel,
}: ResponsiveHeatmapProps) {
  const flat = gatherValues(columnMajor, columnKeysInOrder, rowKeysInOrder);
  const nCols = columnKeysInOrder.length;
  const nRows = rowKeysInOrder.length;

  const hasYAxis = Boolean(yAxisLabel);
  const hasXAxis = Boolean(xAxisLabel);
  const rowLabelCol = hasYAxis ? 2 : 1;
  const dataColStart = hasYAxis ? 3 : 2;
  const headerRow = hasXAxis ? 2 : 1;
  const dataRowStart = hasXAxis ? 3 : 2;

  const gridTemplateColumns = `${hasYAxis ? "auto " : ""}auto repeat(${nCols}, minmax(56px, 1fr))`;
  const gridTemplateRows = `${hasXAxis ? "auto " : ""}auto repeat(${nRows}, ${rowHeight}px)`;

  return (
    <Box
      sx={[
        {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: 1,
          boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.02)",
          p: { xs: 1.5, sm: 2 },
        },
        theme => theme.applyStyles("dark", {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.05)",
        }),
      ]}
    >
      <Box sx={{ width: "100%", overflowX: "auto", pb: 0.5 }}>
        <Box
          sx={{
            minWidth: { xs: `${minWidth}px`, md: "100%" },
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              textAlign: "center",
              mb: 0.75,
            }}
          >
            {title}
          </Typography>
          <Box
            role="region"
            aria-label={title}
            sx={{
              display: "grid",
              gridTemplateColumns,
              gridTemplateRows,
              columnGap: 0.25,
              pl: 0.5,
              rowGap: 0.25,
            }}
          >
            {xAxisLabel && (
              <Typography
                variant="body1"
                sx={{
                  gridRow: 1,
                  gridColumn: `${dataColStart} / -1`,
                  textAlign: "center",
                  alignSelf: "end",
                  mb: 0.25,
                }}
              >
                {xAxisLabel}
              </Typography>
            )}
            {yAxisLabel && (
              <Typography
                variant="body1"
                sx={{
                  gridColumn: 1,
                  gridRow: `${dataRowStart} / -1`,
                  alignSelf: "center",
                  justifySelf: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  pr: 0,
                }}
              >
                {yAxisLabel}
              </Typography>
            )}
            {columnKeysInOrder.map((colKey, colIndex) => (
              <Typography
                key={colKey}
                variant="body1"
                sx={{
                  gridRow: headerRow,
                  gridColumn: dataColStart + colIndex,
                  textAlign: "center",
                  alignSelf: "end",
                  px: 0.25,
                }}
              >
                {columnLabels[colKey] ?? colKey}
              </Typography>
            ))}
            {rowKeysInOrder.map((rowKey, rowIndex) => (
              <Box key={`row-${rowKey}`} sx={{ display: "contents" }}>
                <Typography
                  variant="body1"
                  sx={{
                    gridRow: dataRowStart + rowIndex,
                    gridColumn: rowLabelCol,
                    pl: 2.25,
                    pr: 0.5,
                    alignSelf: "center",
                    textAlign: "right",
                  }}
                >
                  {rowLabels[rowKey] ?? rowKey}
                </Typography>
                {columnKeysInOrder.map((colKey, colIndex) => {
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
                        <Box
                          component="span"
                          sx={{ display: "block", py: 0.25 }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {tooltipPrimary}
                          </Typography>
                          <Typography variant="body2">
                            {tooltipSecondary}
                          </Typography>
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
                          gridRow: dataRowStart + rowIndex,
                          gridColumn: dataColStart + colIndex,
                          bgcolor: bg,
                          borderRadius: 0.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 0.25,
                          py: 0.25,
                          outline: "none",
                          "&:focus-visible": {
                            boxShadow: (theme) =>
                              `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${HEATMAP_BASE}`,
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: t > 0.48 ? "common.white" : "text.primary",
                            textAlign: "center",
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
    </Box>
  );
}
