import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import fathersAgeData from "../data/json/fathers_combined_age.json";
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
  const data = {
    labels: Object.keys(fathersAgeData),
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(fathersAgeData),
        backgroundColor: "rgba(75, 124, 192, 0.5)",
      },
    ],
  };

  return (
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
  );
}
