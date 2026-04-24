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

import monthPrenatalCareStarted from "../data/json/month_prenatal_care_started.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MonthPrenatalCareStarted() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Month Prenatal Care Started",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels: [
          "No prenatal care",
          "1st month",
          "2nd month",
          "3rd month",
          "4th month",
          "5th month",
          "6th month",
          "7th month",
          "8th month",
          "9th month",
        ],
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(monthPrenatalCareStarted),
            backgroundColor: "rgba(136, 75, 215, 0.5)",
          },
        ],
      }}
    />
  );
}
