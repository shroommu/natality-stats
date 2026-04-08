import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Select } from "@/components";

const options = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
];

describe("Select", () => {
  it("renders with label and name-based id fallback", () => {
    render(<Select label="Type" name="type" options={options} />);

    const select = screen.getByRole("combobox", { name: "Type" });
    expect(select).toHaveAttribute("id", "type");
    expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Two" })).toBeInTheDocument();
  });

  it("supports explicit id and hidden label text", () => {
    render(<Select id="custom-select" options={options} defaultValue="two" />);

    const select = screen.getByDisplayValue("Two");
    expect(select).toHaveAttribute("id", "custom-select");
    expect(screen.queryByText("Type")).not.toBeInTheDocument();
  });
});
