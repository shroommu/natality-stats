import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

vi.mock("@/charts/MothersAge", () => ({
  default: () => <div>MothersAgeChart</div>,
}));

vi.mock("@/charts/MothersRace", () => ({
  default: () => <div>MothersRaceChart</div>,
}));

vi.mock("@/charts/FathersAge", () => ({
  default: () => <div>FathersAgeChart</div>,
}));

vi.mock("@/charts/FathersRace", () => ({
  default: () => <div>FathersRaceChart</div>,
}));

describe("Home page", () => {
  it("renders heading and tab controls", () => {
    render(<Home />);
    const demographicsRegion = screen.getAllByRole("region")[0];

    expect(
      screen.getByRole("heading", { name: "2021 Natality Data Overview" }),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).getByRole("tab", {
        name: "Maternal Characteristics",
      }),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).getByRole("tab", {
        name: "Paternal Characteristics",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Key Statistics")).toBeInTheDocument();
    expect(
      within(demographicsRegion).getByText("MothersAgeChart"),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).getByText("MothersRaceChart"),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).queryByText("FathersAgeChart"),
    ).not.toBeInTheDocument();
    expect(
      within(demographicsRegion).queryByText("FathersRaceChart"),
    ).not.toBeInTheDocument();
  });

  it("switches tab panels", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const demographicsRegion = screen.getAllByRole("region")[0];

    await user.click(
      within(demographicsRegion).getByRole("tab", {
        name: "Paternal Characteristics",
      }),
    );

    expect(
      within(demographicsRegion).getByText("FathersAgeChart"),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).getByText("FathersRaceChart"),
    ).toBeInTheDocument();
    expect(
      within(demographicsRegion).queryByText("MothersAgeChart"),
    ).not.toBeInTheDocument();
    expect(
      within(demographicsRegion).queryByText("MothersRaceChart"),
    ).not.toBeInTheDocument();
  });
});
