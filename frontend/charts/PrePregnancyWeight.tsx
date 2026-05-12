import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { ChartDataBoundary } from "@/components/ChartDataBoundary";
import { useChartJsonRecord } from "@/hooks/useChartJson";

import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function PrePregnancyWeight() {
  const { record, loading, error } = useChartJsonRecord(
    "pre_pregnancy_weight_recode.json",
  );

  const data = record
    ? {
        labels: Object.keys(record),
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(record),
            backgroundColor: "rgba(136, 75, 215, 0.5)",
          },
        ],
      }
    : null;

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && (
        <ResponsiveBarChart
          minWidth={1000}
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Distribution of Mother's Pre-Pregnancy Weight",
                font: {
                  size: 16,
                },
              },
              tooltip: {
                callbacks: {
                  title: (context) => {
                    const label = context[0].label;
                    return `Pre-Pregnancy Weight: ${label} lbs`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Pre-Pregnancy Weight (lbs)",
                  font: {
                    size: 14,
                  },
                },
                ticks: {
                  autoSkip: true,
                  maxRotation: 45,
                  minRotation: 0,
                  font: {
                    size: 11,
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 11,
                  },
                },
              },
            },
          }}
        />
      )}
    </ChartDataBoundary>
  );
}
