"use client";

import { useMemo } from "react";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

import {
  formatIntegerAnnotation,
  formatSuccessfulVbacSumTooltip,
} from "./vbacCrossTabFormatters";
import { VBAC_JSON_DATA_YEAR } from "./vbacDataYear";

const DATA_FILE = "vbac/prior_births_previous_cesarean_cross_tab.json";

export default function PriorBirthsPreviousCesareanCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const columnKeysInOrder = useMemo(
    () => (data ? Object.keys(data) : []),
    [data],
  );

  const rowKeysInOrder = useMemo(() => {
    if (!data || columnKeysInOrder.length === 0) return [];
    const first = columnKeysInOrder[0];
    const col = first ? data[first] : undefined;
    return col ? Object.keys(col) : [];
  }, [data, columnKeysInOrder]);

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && columnKeysInOrder.length > 0 && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Prior Births Now Living, Number of Previous Cesarean Deliveries, and Successful VBAC"
          columnMajor={data}
          columnKeysInOrder={columnKeysInOrder}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={{}}
          rowLabels={{}}
          formatAnnotation={(value, columnKey) => {
            void columnKey;
            return formatIntegerAnnotation(value);
          }}
          xAxisLabel="Number of Previous Cesarean Deliveries"
          yAxisLabel="Prior Births Now Living"
          formatTooltipBody={(value) => formatSuccessfulVbacSumTooltip(value)}
          minWidth={640}
        />
      )}
    </ChartDataBoundary>
  );
}
