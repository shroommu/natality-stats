import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AttendantAtBirthCrossTabHeatmap from "@/charts/vbac/AttendantAtBirthCrossTabHeatmap";
import { YearProvider } from "@/lib/yearContext";

import attendantAtBirthCrossTab from "../../public/data/2021/vbac/attendant_at_birth_cross_tab.json";
import { setupChartJsonFetch } from "./chartTestSetup";

describe("AttendantAtBirthCrossTabHeatmap", () => {
  setupChartJsonFetch(attendantAtBirthCrossTab);

  it("loads cross-tab data and renders the heatmap region", async () => {
    render(
      <YearProvider initialYear={2024}>
        <AttendantAtBirthCrossTabHeatmap />
      </YearProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("region", {
          name: /Successful VBAC by attendant at birth/i,
        }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Doctor (MD)")).toBeInTheDocument();
    expect(screen.getByText("Midwife (CNM)")).toBeInTheDocument();
  });
});
