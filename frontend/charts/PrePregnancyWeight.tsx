import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import prePregnancyWeightRecodeData from "../data/json/pre_pregnancy_weight_recode.json";
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
  const data = {
    labels: Object.keys(prePregnancyWeightRecodeData),
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(prePregnancyWeightRecodeData),
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
  );
}
