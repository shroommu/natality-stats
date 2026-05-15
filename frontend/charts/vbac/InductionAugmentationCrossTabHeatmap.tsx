"use client";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

import {
  LABOR_BINARY_ROW_LABELS,
  formatIntegerAnnotation,
  formatSuccessfulVbacSumTooltip,
} from "./vbacCrossTabFormatters";
import { VBAC_JSON_DATA_YEAR } from "./vbacDataYear";

const DATA_FILE = "vbac/induction_augmentation_cross_tab.json";

const COLUMN_KEYS = ["0.0", "1.0"] as const;
const ROW_KEYS = ["0.0", "1.0"] as const;

const COLUMN_LABELS: Record<string, string> = {
  "0.0": "No",
  "1.0": "Yes",
};

export default function InductionAugmentationCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && (
        <ResponsiveHeatmap
          title="Successful VBAC by labor induction and augmentation"
          columnMajor={data}
          columnKeysInOrder={[...COLUMN_KEYS]}
          rowKeysInOrder={[...ROW_KEYS]}
          columnLabels={COLUMN_LABELS}
          rowLabels={LABOR_BINARY_ROW_LABELS}
          formatAnnotation={(value) => formatIntegerAnnotation(value)}
          formatTooltipBody={(value) => formatSuccessfulVbacSumTooltip(value)}
          minWidth={420}
        />
      )}
    </ChartDataBoundary>
  );
}
