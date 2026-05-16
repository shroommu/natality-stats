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

const DATA_FILE = "down_syndrome/cigarettes_before_pregnancy_cross_tab.json";

export default function CigarettesBeforePregnancyCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: DOWN_SYNDROME_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = getDownSyndromeRowKeysInOrder(data);
  const rowLabels = {
    "0": "Non-Smoker",
    "1": "1 - 5",
    "2": "6 - 10",
    "3": "11 - 20",
    "4": "21 - 40",
    "5": "41+",
  };

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Cigarettes Before Pregnancy and Down Syndrome Presence"
          columnMajor={data}
          columnKeysInOrder={[...DOWN_SYNDROME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={DOWN_SYNDROME_COLUMN_LABELS}
          rowLabels={rowLabels}
          xAxisLabel="Down Syndrome"
          yAxisLabel="Cigarettes Per Day Before Pregnancy"
          formatAnnotation={formatDownSyndromeCrossTabAnnotation}
          formatTooltipBody={formatDownSyndromeCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
