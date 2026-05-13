"use client";

import ResponsiveBarChart from "@/charts/ResponsiveBarChart";
import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonRecord } from "@/hooks/useChartJson";

import {
  VBAC_BAR_CHART_BACKGROUND_COLOR,
  VBAC_BAR_CHART_DATASET_LABEL,
  vbacValueCountsBarChartOptions,
} from "./vbacBarChartConstants";
import { VBAC_JSON_DATA_YEAR } from "./vbacDataYear";

const DATA_FILE = "vbac/attendant_at_birth_value_counts.json";
const TITLE = "Attendant at birth counts";

export default function AttendantAtBirthValueCountsBarChart() {
  const { record, loading, error } = useChartJsonRecord(DATA_FILE, {
    dataYear: VBAC_JSON_DATA_YEAR,
  });

  const data = record
    ? {
        labels: Object.keys(record),
        datasets: [
          {
            label: VBAC_BAR_CHART_DATASET_LABEL,
            data: Object.values(record),
            backgroundColor: VBAC_BAR_CHART_BACKGROUND_COLOR,
          },
        ],
      }
    : null;

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && (
        <ResponsiveBarChart
          minWidth={560}
          data={data}
          options={vbacValueCountsBarChartOptions(TITLE)}
        />
      )}
    </ChartDataBoundary>
  );
}
