import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import LegacyButton from "@/app/components/Button";

describe("Legacy app Button", () => {
  it("renders provided text", () => {
    render(<LegacyButton text="Load" onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Load" })).toBeInTheDocument();
  });

  it("triggers click callback", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LegacyButton text="Run" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Run" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
