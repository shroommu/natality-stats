import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import weightGainData from "../data/json/weight_gain.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function WeightGain() {
  const data = {
    labels: Object.keys(weightGainData),
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(weightGainData),
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
            text: "Distribution of Mother's Weight Gain During Pregnancy",
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                const label = context[0].label;
                return `Weight Gain: ${label} lbs`;
              },
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
  );
}
