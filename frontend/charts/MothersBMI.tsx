import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import mothersBMIData from "../data/json/mothers_BMI.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MothersBMI() {
  const data = {
    labels: Object.keys(mothersBMIData),
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(mothersBMIData),
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
            text: "Distribution of Mother's BMI",
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                const label = context[0].label;
                return `BMI: ${label}`;
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
