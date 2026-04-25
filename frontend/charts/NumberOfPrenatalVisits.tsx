import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import numberOfPrenatalVisits from "../data/json/number_of_prenatal_visits.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function NumberOfPrenatalVisits() {
  const data = {
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
  };

  return (
    <ResponsiveBarChart
      minWidth={1200}
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Distribution of Number of Prenatal Visits",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
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
