"use client";

import { useMemo } from "react";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

import {
  LABOR_BINARY_ROW_LABELS,
  VBAC_OUTCOME_COLUMN_KEYS,
  VBAC_OUTCOME_COLUMN_LABELS,
  formatVbacCrossTabAnnotation,
  formatVbacCrossTabTooltipBody,
} from "./vbacCrossTabFormatters";
import { VBAC_JSON_DATA_YEAR } from "./vbacDataYear";

export type VbacOutcomeCrossTabHeatmapProps = {
  /** Path under `public/data/{year}/` (e.g. `vbac/BMI_cross_tab.json`). */
  dataFile: string;
  title: string;
  /** Optional row labels; row keys default to raw JSON keys (e.g. bin strings). */
  rowLabels?: Record<string, string>;
  /** Rows use `0.0` / `1.0` keys (labor flags); labels become No / Yes. */
  binaryLaborRows?: boolean;
  minWidth?: number;
  rowHeight?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

export default function VbacOutcomeCrossTabHeatmap({
  dataFile,
  title,
  rowLabels: rowLabelsProp,
  binaryLaborRows = false,
  minWidth = 560,
  rowHeight,
  xAxisLabel,
  yAxisLabel,
}: VbacOutcomeCrossTabHeatmapProps) {
  const { data, loading, error } = useChartJsonCrossTab(dataFile, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const columnKeysInOrder = useMemo(() => {
    if (!data) return [];
    const keys = Object.keys(data);
    if (
      keys.length === 3 &&
      keys.includes("0") &&
      keys.includes("1") &&
      keys.includes("proportion")
    ) {
      return [...VBAC_OUTCOME_COLUMN_KEYS];
    }
    return keys;
  }, [data]);

  const rowKeysInOrder = useMemo(() => {
    if (!data || columnKeysInOrder.length === 0) return [];
    const first = columnKeysInOrder[0];
    const col = first ? data[first] : undefined;
    return col ? Object.keys(col) : [];
  }, [data, columnKeysInOrder]);

  const rowLabels = useMemo(() => {
    const base = { ...rowLabelsProp };
    if (binaryLaborRows) {
      for (const rk of rowKeysInOrder) {
        if (LABOR_BINARY_ROW_LABELS[rk] && base[rk] === undefined) {
          base[rk] = LABOR_BINARY_ROW_LABELS[rk];
        }
      }
    }
    return base;
  }, [binaryLaborRows, rowKeysInOrder, rowLabelsProp]);

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && columnKeysInOrder.length > 0 && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title={title}
          columnMajor={data}
          columnKeysInOrder={columnKeysInOrder}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={rowLabels}
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
          minWidth={minWidth}
          rowHeight={rowHeight}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}
    </ChartDataBoundary>
  );
}
