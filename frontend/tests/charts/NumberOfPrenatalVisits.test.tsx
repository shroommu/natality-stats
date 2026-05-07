import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NumberOfPrenatalVisits from "@/charts/NumberOfPrenatalVisits";
import numberOfPrenatalVisitsData from "@/data/json/number_of_prenatal_visits.json";

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => <div data-testid="bar-chart" />),
}));

vi.mock("chart.js", () => {
  const register = vi.fn();

  return {
    Chart: { register },
    CategoryScale: "CategoryScale",
    LinearScale: "LinearScale",
    BarElement: "BarElement",
    Title: "Title",
    Tooltip: "Tooltip",
    Legend: "Legend",
  };
});

describe("NumberOfPrenatalVisits", () => {
  it("renders a bar chart with expected options and data", async () => {
    const { Bar } = await import("react-chartjs-2");
    const { Chart } = await import("chart.js");

    render(<NumberOfPrenatalVisits />);

    expect(Chart.register).toHaveBeenCalledWith(
      "CategoryScale",
      "LinearScale",
      "BarElement",
      "Title",
      "Tooltip",
      "Legend",
    );

    expect(Bar).toHaveBeenCalledTimes(1);
    const barProps = vi.mocked(Bar).mock.calls[0][0];

    expect(barProps.options).toMatchObject({
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Distribution of Number of Prenatal Visits",
        },
      },
    });

    expect(barProps.data.labels).toEqual([
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
    ]);
    expect(barProps.data.datasets).toEqual([
      {
        label: "Number of Births",
        data: Object.values(numberOfPrenatalVisitsData),
        backgroundColor: "rgba(136, 75, 215, 0.5)",
      },
    ]);
  });
});
