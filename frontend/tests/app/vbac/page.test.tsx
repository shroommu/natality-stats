import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import VBAC from "@/app/vbac/page";

import { setupChartJsonFetchFromPublicData } from "../../charts/chartTestSetup";

vi.mock("@/app/vbac/components/model", () => ({
  VBACModel: () => <div>VBACModelStub</div>,
}));

describe("VBAC page", () => {
  setupChartJsonFetchFromPublicData();

  it("renders heading and intro text", () => {
    render(<VBAC />);

    expect(
      screen.getByRole("heading", { name: "Predicting VBAC Success" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Vaginal Birth After Cesarean/),
    ).toBeInTheDocument();
  });

  it("renders three tabs", () => {
    render(<VBAC />);

    expect(
      screen.getByRole("tab", { name: "Data Analysis" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Model" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Technical Details" }),
    ).toBeInTheDocument();
  });

  it("shows the Model tab content by default", () => {
    render(<VBAC />);

    expect(screen.getByText("VBACModelStub")).toBeInTheDocument();
  });

  it("switching to Technical Details shows technical content", async () => {
    const user = userEvent.setup();
    render(<VBAC />);

    await user.click(screen.getByRole("tab", { name: "Technical Details" }));

    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("Notes")).toBeInTheDocument();
    expect(within(panel).getByText("Dataset")).toBeInTheDocument();
    expect(within(panel).getByText("Model Details")).toBeInTheDocument();
    expect(
      within(panel).getByRole("link", { name: "here" }),
    ).toHaveAttribute(
      "href",
      "https://www.cdc.gov/nchs/data_access/vitalstatsonline.htm#Births",
    );
  });

  it("switching to Data Analysis shows crosstab heatmap", async () => {
    const user = userEvent.setup();
    render(<VBAC />);

    await user.click(screen.getByRole("tab", { name: "Data Analysis" }));

    expect(screen.getByText("Crosstabs")).toBeInTheDocument();
    expect(
      await screen.findByRole("region", {
        name: /Successful VBAC by attendant at birth/i,
      }),
    ).toBeInTheDocument();
  });
});
