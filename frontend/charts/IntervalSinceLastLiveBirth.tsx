import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import intervalSinceLastLiveBirthData from "../data/json/interval_since_last_live_birth.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function IntervalSinceLastLiveBirth() {
  const data = {
    labels: Object.keys(intervalSinceLastLiveBirthData),
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(intervalSinceLastLiveBirthData),
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
            text: "Distribution of Interval Since Last Live Birth",
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
  );
}
