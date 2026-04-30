import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PrePregnancyWeightRecode from "@/charts/PrePregnancyWeight";
import prePregnancyWeightRecodeData from "@/data/json/pre_pregnancy_weight_recode.json";

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

describe("PrePregnancyWeightRecode", () => {
  it("renders a bar chart with expected options and data", async () => {
    const { Bar } = await import("react-chartjs-2");
    const { Chart } = await import("chart.js");

    render(<PrePregnancyWeightRecode />);

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
          text: "Distribution of Mother's Pre-Pregnancy Weight",
        },
      },
    });

    expect(barProps.data.labels).toEqual(
      Object.keys(prePregnancyWeightRecodeData),
    );
    expect(barProps.data.datasets).toEqual([
      {
        label: "Number of Births",
        data: Object.values(prePregnancyWeightRecodeData),
        backgroundColor: "rgba(192, 75, 135, 0.5)",
      },
    ]);
  });
});
