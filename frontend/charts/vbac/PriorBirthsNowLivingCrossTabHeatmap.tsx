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

const DATA_FILE = "vbac/prior_births_now_living_cross_tab.json";

export default function PriorBirthsNowLivingCrossTabHeatmap() {
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
          title="Prior Births Now Living and Successful VBAC"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={{}}
          xAxisLabel="Successful VBAC"
          yAxisLabel="Number of Prior Births Now Living"
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
