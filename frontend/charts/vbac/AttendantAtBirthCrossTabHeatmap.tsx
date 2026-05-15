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

const DATA_FILE = "vbac/attendant_at_birth_cross_tab.json";

const ATTENDANT_AT_BIRTH_ROW_LABELS: Record<string, string> = {
  "1.0": "Doctor (MD)",
  "2.0": "Doctor (DO)",
  "3.0": "Midwife (CNM)",
  "4.0": "Midwife (Other)",
  "5.0": "Other",
};

export default function AttendantAtBirthCrossTabHeatmap() {
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
          title="Successful VBAC by Attendant at Birth"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={ATTENDANT_AT_BIRTH_ROW_LABELS}
          xAxisLabel="Successful VBAC"
          yAxisLabel="Attendant at Birth"
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
