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

const DATA_FILE = "vbac/mothers_single_year_age_cross_tab.json";

export default function MothersSingleYearAgeCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = useMemo(() => {
    if (!data) return [];
    const col = data[VBAC_OUTCOME_COLUMN_KEYS[0]];
    return col ? Object.keys(col) : [];
  }, [data]);

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Mother's Single Year Age and Successful VBAC"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={rowKeysInOrder.reduce(
            (acc: Record<string, string>, key) => {
              acc[key] = key
                .replace("(", "")
                .replace("]", "")
                .replace(", ", " - ");
              return acc;
            },
            {},
          )}
          xAxisLabel="Successful VBAC"
          yAxisLabel="Mother's Age"
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
          minWidth={900}
        />
      )}
    </ChartDataBoundary>
  );
}
