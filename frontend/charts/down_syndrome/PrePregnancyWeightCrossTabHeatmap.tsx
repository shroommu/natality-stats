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

const DATA_FILE = "down_syndrome/pre_pregnancy_weight_cross_tab.json";

export default function PrePregnancyWeightCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: DOWN_SYNDROME_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = getDownSyndromeRowKeysInOrder(data);
  const rowLabels = buildDownSyndromeRowLabels(rowKeysInOrder);

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Mother's Pre-Pregnancy Weight and Down Syndrome Presence"
          columnMajor={data}
          columnKeysInOrder={[...DOWN_SYNDROME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={DOWN_SYNDROME_COLUMN_LABELS}
          rowLabels={rowLabels}
          xAxisLabel="Down Syndrome"
          yAxisLabel="Mother's Pre-Pregnancy Weight (lbs)"
          formatAnnotation={formatDownSyndromeCrossTabAnnotation}
          formatTooltipBody={formatDownSyndromeCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
