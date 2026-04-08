import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "@/components";

describe("Input", () => {
  it("renders with label, helper text, and name-based id fallback", () => {
    render(<Input label="Search" helperText="Type a query" name="search" />);

    const input = screen.getByLabelText(/Search/);
    expect(input).toHaveAttribute("id", "search");
    expect(screen.getByText("Type a query")).toBeInTheDocument();
  });

  it("supports explicit id and no optional texts", () => {
    render(<Input id="custom-id" defaultValue="abc" />);

    const input = screen.getByDisplayValue("abc");
    expect(input).toHaveAttribute("id", "custom-id");
    expect(screen.queryByText("Type a query")).not.toBeInTheDocument();
  });
});
