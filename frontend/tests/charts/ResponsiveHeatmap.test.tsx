import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResponsiveHeatmap from "@/charts/ResponsiveHeatmap";
import { AppThemeProvider } from "@/components/AppThemeProvider";

const sampleColumnMajor = {
  "0": { "1": 100, "2": 200 },
  "1": { "1": 10, "2": 20 },
  proportion: { "1": 0.1, "2": 0.091 },
};

describe("ResponsiveHeatmap", () => {
  it("renders title, headers, and one gridcell per data cell", () => {
    render(
      <AppThemeProvider>
        <ResponsiveHeatmap
          title="Test heatmap"
          columnMajor={sampleColumnMajor}
          columnKeysInOrder={["0", "1", "proportion"]}
          rowKeysInOrder={["1", "2"]}
          columnLabels={{
            "0": "No",
            "1": "Yes",
            proportion: "Proportion",
          }}
          rowLabels={{
            "1": "Row A",
            "2": "Row B",
          }}
          formatAnnotation={(v, col) =>
            col === "proportion" ? `${(v * 100).toFixed(0)}%` : String(v)
          }
        />
      </AppThemeProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Test heatmap", level: 3 }),
    ).toBeInTheDocument();

    const region = screen.getByRole("region", { name: "Test heatmap" });
    expect(within(region).getAllByRole("gridcell")).toHaveLength(6);
    expect(within(region).getByText("No")).toBeInTheDocument();
    expect(within(region).getByText("Row A")).toBeInTheDocument();
  });
});
