import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders key dashboard sections", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Interactive Data Explorer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Births Trend (Sample)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Records Preview (Sample)" })).toBeInTheDocument();
  });

  it("resets filter controls to defaults", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByLabelText("Search");
    const yearSelect = screen.getByLabelText("Year");
    const regionSelect = screen.getByLabelText("Region");

    await user.type(searchInput, "county");
    await user.selectOptions(yearSelect, "2023");
    await user.selectOptions(regionSelect, "west");
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(searchInput).toHaveValue("");
    expect(yearSelect).toHaveValue("2021");
    expect(regionSelect).toHaveValue("all");
  });

  it("updates selected year when year filter changes to 2022", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const yearSelect = screen.getByLabelText("Year");
    await user.selectOptions(yearSelect, "2022");

    expect(yearSelect).toHaveValue("2022");
  });
});
