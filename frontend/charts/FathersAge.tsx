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

export default function FathersAge() {
  const { record, loading, error } = useChartJsonRecord(
    "fathers_combined_age.json",
  );

  const data = record
    ? {
        labels: Object.keys(record),
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(record),
            backgroundColor: "rgba(75, 124, 192, 0.5)",
          },
        ],
      }
    : null;

  return (
    <ChartDataBoundary loading={loading} error={error}>
      {data && (
        <ResponsiveBarChart
          minWidth={900}
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Distribution of Father's Age",
                font: {
                  size: 16,
                },
              },
            },
            scales: {
              x: {
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
