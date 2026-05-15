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

const DATA_FILE = "vbac/birth_place_cross_tab.json";

export default function BirthPlaceCrossTabHeatmap() {
  const { data, loading, error } = useChartJsonCrossTab(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const rowKeysInOrder = useMemo(() => {
    if (!data) return [];
    const col = data[VBAC_OUTCOME_COLUMN_KEYS[0]];
    return col ? Object.keys(col) : [];
  }, [data]);

  const BIRTH_PLACE_ROW_LABELS: Record<string, string> = {
    "1.0": "Hospital",
    "2.0": "Freestanding Birth Center",
    "3.0": "Home (Intended)",
    "4.0": "Home (Not Intended)",
    "5.0": "Home (Unknown if Intended)",
    "6.0": "Clinic / Doctor's Office",
    "7.0": "Other",
  };

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && rowKeysInOrder.length > 0 && (
        <ResponsiveHeatmap
          title="Birth Place and Successful VBAC"
          columnMajor={data}
          columnKeysInOrder={[...VBAC_OUTCOME_COLUMN_KEYS]}
          rowKeysInOrder={rowKeysInOrder}
          columnLabels={VBAC_OUTCOME_COLUMN_LABELS}
          rowLabels={BIRTH_PLACE_ROW_LABELS}
          xAxisLabel="Successful VBAC"
          yAxisLabel="Birth Place"
          formatAnnotation={formatVbacCrossTabAnnotation}
          formatTooltipBody={formatVbacCrossTabTooltipBody}
        />
      )}
    </ChartDataBoundary>
  );
}
