import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import mothersRaceData from "../data/json/mothers_race.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MothersRace() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Mother's Race",
          },
        },
      }}
      data={{
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
      }}
    />
  );
}
