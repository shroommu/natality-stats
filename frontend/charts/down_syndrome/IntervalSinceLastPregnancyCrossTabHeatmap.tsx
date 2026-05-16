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

const DATA_FILE = "down_syndrome/interval_since_last_pregnancy_cross_tab.json";

export default function IntervalSinceLastPregnancyCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: DOWN_SYNDROME_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = getDownSyndromeRowKeysInOrder(data).filter(
    (rowKey, index) => index < 10,
  );
  const rowLabels = buildDownSyndromeRowLabels(rowKeysInOrder);

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Interval Since Last Pregnancy and Down Syndrome Presence"
          columnMajor={data}
          columnKeysInOrder={[...DOWN_SYNDROME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={DOWN_SYNDROME_COLUMN_LABELS}
          rowLabels={rowLabels}
          xAxisLabel="Down Syndrome"
          yAxisLabel="Interval Since Last Pregnancy (Months)"
          formatAnnotation={formatDownSyndromeCrossTabAnnotation}
          formatTooltipBody={formatDownSyndromeCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
