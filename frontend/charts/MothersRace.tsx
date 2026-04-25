import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import mothersRaceData from "../data/json/mothers_race.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MothersRace() {
  const data = {
    labels: [
      "White",
      "Black",
      "Native American",
      "Asian",
      "Native Hawaiian",
      "More than one race",
    ],
    datasets: [
      {
        label: "Number of Births",
        data: Object.values(mothersRaceData),
        backgroundColor: "rgba(192, 75, 135, 0.5)",
      },
    ],
  };

  return (
    <ResponsiveBarChart
      minWidth={720}
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Distribution of Mother's Race",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 30,
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
