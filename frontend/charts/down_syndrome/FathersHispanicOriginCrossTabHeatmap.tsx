"use client";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

import {
  buildDownSyndromeRowLabels,
  DOWN_SYNDROME_COLUMN_KEYS,
  DOWN_SYNDROME_COLUMN_LABELS,
  formatDownSyndromeCrossTabAnnotation,
  formatDownSyndromeCrossTabTooltipBody,
  getDownSyndromeRowKeysInOrder,
} from "./downSyndromeCrossTabFormatters";
import { DOWN_SYNDROME_JSON_DATA_YEAR } from "./downSyndromeDataYear";

const DATA_FILE = "down_syndrome/fathers_hispanic_origin_cross_tab.json";

export default function FathersHispanicOriginCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: DOWN_SYNDROME_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = getDownSyndromeRowKeysInOrder(data);
  const rowLabels = {
    "0": "Non-Hispanic",
    "1": "Mexican",
    "2": "Puerto Rican",
    "3": "Cuban",
    "4": "Central American",
    "5": "Dominican",
    "6": "Other Hispanic",
  };

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Father's Hispanic Origin and Down Syndrome Presence"
          columnMajor={data}
          columnKeysInOrder={[...DOWN_SYNDROME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={DOWN_SYNDROME_COLUMN_LABELS}
          rowLabels={rowLabels}
          xAxisLabel="Down Syndrome"
          yAxisLabel="Father's Hispanic Origin"
          formatAnnotation={formatDownSyndromeCrossTabAnnotation}
          formatTooltipBody={formatDownSyndromeCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
