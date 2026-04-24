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

import fathersAgeData from "../data/json/fathers_combined_age.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function FathersAge() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Father's Age",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels: Object.keys(fathersAgeData),
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(fathersAgeData),
            backgroundColor: "rgba(75, 124, 192, 0.5)",
          },
        ],
      }}
    />
  );
}
