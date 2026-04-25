import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import monthPrenatalCareStarted from "../data/json/month_prenatal_care_started.json";
import ResponsiveBarChart from "./ResponsiveBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MonthPrenatalCareStarted() {
  const data = {
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
  };

  return (
    <ResponsiveBarChart
      minWidth={860}
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Distribution of Month Prenatal Care Started",
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
