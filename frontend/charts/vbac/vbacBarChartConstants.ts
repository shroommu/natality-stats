import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/** Single-series fill color used by every VBAC value-counts bar chart. */
export const VBAC_BAR_CHART_BACKGROUND_COLOR = "rgba(192, 75, 135, 0.5)";

/** Dataset label shown in tooltips for VBAC value-counts bar charts. */
export const VBAC_BAR_CHART_DATASET_LABEL = "Count";

/** Standardized Chart.js options for VBAC value-counts bar charts. */
export function vbacValueCountsBarChartOptions(
  title: string,
): ChartOptions<"bar"> {
  return {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
          font: { size: 11 },
        },
      },
      y: {
        ticks: { font: { size: 11 } },
      },
    },
  };
}
