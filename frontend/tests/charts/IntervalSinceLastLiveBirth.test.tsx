import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import IntervalSinceLastLiveBirth from "@/charts/IntervalSinceLastLiveBirth";
import { YearProvider } from "@/lib/yearContext";
import intervalSinceLastLiveBirthData from "../../public/data/2021/interval_since_last_live_birth.json";

import { setupChartJsonFetch } from "./chartTestSetup";

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

describe("IntervalSinceLastLiveBirth", () => {
  setupChartJsonFetch(intervalSinceLastLiveBirthData);

  it("renders a bar chart with expected options and data", async () => {
    const { Bar } = await import("react-chartjs-2");
    const { Chart } = await import("chart.js");

    render(
      <YearProvider initialYear={2021}>
        <IntervalSinceLastLiveBirth />
      </YearProvider>,
    );

    await waitFor(() => {
      expect(Bar).toHaveBeenCalled();
    });

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
          text: "Distribution of Interval Since Last Live Birth",
        },
      },
    });

    expect(barProps.data.labels).toEqual(
      Object.keys(intervalSinceLastLiveBirthData),
    );
    expect(barProps.data.datasets).toEqual([
      {
        label: "Number of Births",
        data: Object.values(intervalSinceLastLiveBirthData),
        backgroundColor: "rgba(136, 75, 215, 0.5)",
      },
    ]);
  });
});
