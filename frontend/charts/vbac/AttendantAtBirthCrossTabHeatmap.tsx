"use client";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import {
  ATTENDANT_AT_BIRTH_ROW_KEYS,
  ATTENDANT_AT_BIRTH_ROW_LABELS,
  formatAttendantCrossTabAnnotation,
  formatAttendantCrossTabTooltipBody,
  VBAC_OUTCOME_COLUMN_KEYS,
  VBAC_OUTCOME_COLUMN_LABELS,
} from "@/charts/vbac/attendantAtBirthCrossTabConfig";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonCrossTab } from "@/hooks/useChartJson";

const DATA_FILE = "vbac/attendant_at_birth_cross_tab.json";

/** Crosstab JSON is currently published only for the 2021 VBAC extract. */
const VBAC_CROSSTAB_DATA_YEAR = 2021 as const;

export default function AttendantAtBirthCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_CROSSTAB_DATA_YEAR,
  });

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && (
        <ResponsiveHeatmap
          title="Successful VBAC by attendant at birth"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={[...ATTENDANT_AT_BIRTH_ROW_KEYS]}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={ATTENDANT_AT_BIRTH_ROW_LABELS}
          formatAnnotation={formatAttendantCrossTabAnnotation}
          formatTooltipBody={formatAttendantCrossTabTooltipBody}
          minWidth={640}
          mobileHeight={340}
          desktopHeight={400}
        />
      )}
    </ChartDataBoundary>
  );
}
