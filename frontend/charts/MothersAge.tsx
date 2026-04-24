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

import mothersAgeData from "../data/json/mothers_single_year_age.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MothersAge() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Mother's Age",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels: Object.keys(mothersAgeData),
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(mothersAgeData),
            backgroundColor: "rgba(192, 75, 135, 0.5)",
          },
        ],
      }}
    />
  );
}
