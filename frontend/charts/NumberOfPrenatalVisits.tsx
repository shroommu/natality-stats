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

import numberOfPrenatalVisits from "../data/json/number_of_prenatal_visits.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function NumberOfPrenatalVisits() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Number of Prenatal Visits",
            font: {
              size: 18,
            },
          },
        },
      }}
      data={{
        labels: [
          "No prenatal care",
          "1 visit",
          "2 visits",
          "3 visits",
          "4 visits",
          "5 visits",
          "6 visits",
          "7 visits",
          "8 visits",
          "9 visits",
          "10 visits",
          "11 visits",
          "12 visits",
          "13 visits",
          "14 visits",
          "15 visits",
          "16 visits",
          "17 visits",
          "18 visits",
          "19 visits",
          "20 visits",
        ],
        datasets: [
          {
            label: "Number of Births",
            data: Object.values(numberOfPrenatalVisits),
            backgroundColor: "rgba(136, 75, 215, 0.5)",
          },
        ],
      }}
    />
  );
}
