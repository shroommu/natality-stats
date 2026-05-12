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

export default function PresenceOfPregnancyRiskFactors() {
  const { record, loading, error } = useChartJsonRecord(
    "presence_of_pregnancy_risk_factors.json",
  );

  const data = record
    ? {
        labels: [
          "Pre-Pregnancy Diabetes",
          "Gestational Diabetes",
          "Pre-Pregnancy Hypertension",
          "Gestational Hypertension",
          "Previous Preterm Birth",
          "Infertility Treatment Used",
          "Previous Cesarean",
        ],
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
                text: "Number of Mothers with Each Pregnancy Risk Factor",
                font: {
                  size: 16,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Pregnancy Risk Factor",
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
