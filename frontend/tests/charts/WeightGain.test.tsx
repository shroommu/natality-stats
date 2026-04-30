import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import WeightGain from "@/charts/WeightGain";
import weightGainData from "@/data/json/weight_gain.json";

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

describe("WeightGain", () => {
  it("renders a bar chart with expected options and data", async () => {
    const { Bar } = await import("react-chartjs-2");
    const { Chart } = await import("chart.js");

    render(<WeightGain />);

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
          text: "Distribution of Mother's Weight Gain During Pregnancy",
        },
      },
    });

    expect(barProps.data.labels).toEqual(Object.keys(weightGainData));
    expect(barProps.data.datasets).toEqual([
      {
        label: "Number of Births",
        data: Object.values(weightGainData),
        backgroundColor: "rgba(136, 75, 215, 0.5)",
      },
    ]);
  });
});
