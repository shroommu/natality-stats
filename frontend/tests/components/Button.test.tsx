import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components";

describe("Button", () => {
  it("renders primary variant with white text", () => {
    render(<Button>Apply Filters</Button>);

    const button = screen.getByRole("button", { name: "Apply Filters" });
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("bg-foreground");
  });

  it("supports custom variants", () => {
    render(<Button variant="secondary">Reset</Button>);

    const button = screen.getByRole("button", { name: "Reset" });
    expect(button).toHaveClass("bg-foreground/10");
    expect(button).toHaveClass("text-foreground");
  });

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Run</Button>);

    await user.click(screen.getByRole("button", { name: "Run" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
