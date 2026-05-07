import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import presenceOfPregnancyRiskFactorsData from "../data/json/presence_of_pregnancy_risk_factors.json";
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
  const data = {
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
        data: Object.values(presenceOfPregnancyRiskFactorsData),
        backgroundColor: "rgba(136, 75, 215, 0.5)",
      },
    ],
  };

  return (
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
  );
}
