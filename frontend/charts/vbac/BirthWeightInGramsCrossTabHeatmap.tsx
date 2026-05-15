"use client";

import { useMemo } from "react";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

import {
  VBAC_OUTCOME_COLUMN_KEYS,
  VBAC_OUTCOME_COLUMN_LABELS,
  formatVbacCrossTabAnnotation,
  formatVbacCrossTabTooltipBody,
} from "./vbacCrossTabFormatters";
import { VBAC_JSON_DATA_YEAR } from "./vbacDataYear";

const DATA_FILE = "vbac/birth_weight_in_grams_cross_tab.json";

export default function BirthWeightInGramsCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = useMemo(() => {
    if (!data) return [];
    const col = data[VBAC_OUTCOME_COLUMN_KEYS[0]];
    return col ? Object.keys(col) : [];
  }, [data]);

  const BIRTH_WEIGHT_ROW_LABELS: Record<string, string> = rowKeysInOrder.reduce(
    (acc, key) => {
      const formattedKey = key
        .replace("(", "")
        .replace("]", "")
        .replace(",", " - ");
      acc[key] = formattedKey;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Birth Weight in Grams and Successful VBAC"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={BIRTH_WEIGHT_ROW_LABELS}
          xAxisLabel="Successful VBAC"
          yAxisLabel="Birth Weight (grams)"
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
