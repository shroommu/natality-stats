import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PresenceOfPregnancyRiskFactors from "@/charts/PresenceOfPregnancyRiskFactors";
import { YearProvider } from "@/lib/yearContext";

import { setupChartJsonFetch } from "./chartTestSetup";

/** Seven risk-factor buckets (values are arbitrary; chart matches by order). */
const presenceOfPregnancyRiskFactorsData: Record<string, number> = {
  r1: 100,
  r2: 200,
  r3: 300,
  r4: 400,
  r5: 500,
  r6: 600,
  r7: 700,
};

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

describe("PresenceOfPregnancyRiskFactors", () => {
  setupChartJsonFetch(presenceOfPregnancyRiskFactorsData);

  it("renders a bar chart with expected options and data", async () => {
    const { Bar } = await import("react-chartjs-2");
    const { Chart } = await import("chart.js");

    render(
      <YearProvider initialYear={2021}>
        <PresenceOfPregnancyRiskFactors />
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
          text: "Number of Mothers with Each Pregnancy Risk Factor",
        },
      },
    });

    expect(barProps.data.labels).toEqual([
      "Pre-Pregnancy Diabetes",
      "Gestational Diabetes",
      "Pre-Pregnancy Hypertension",
      "Gestational Hypertension",
      "Previous Preterm Birth",
      "Infertility Treatment Used",
      "Previous Cesarean",
    ]);
    expect(barProps.data.datasets).toEqual([
      {
        label: "Number of Births",
        data: Object.values(presenceOfPregnancyRiskFactorsData),
        backgroundColor: "rgba(136, 75, 215, 0.5)",
      },
    ]);
  });
});
