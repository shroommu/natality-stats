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

import fathersRaceData from "../data/json/fathers_race.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function FathersRace() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Father's Race",
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
            data: Object.values(fathersRaceData),
            backgroundColor: "rgba(75, 124, 192, 0.5)",
          },
        ],
      }}
    />
  );
}
