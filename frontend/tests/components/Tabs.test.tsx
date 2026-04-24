import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "@/components";

const tabs = [
  {
    label: "Overview",
    value: "overview",
    content: <div>Overview content</div>,
  },
  {
    label: "Details",
    value: "details",
    content: <div>Details content</div>,
  },
];

describe("Tabs", () => {
  it("renders labels and only the active panel", () => {
    render(<Tabs tabs={tabs} value="overview" onChange={vi.fn()} />);

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Details" })).toBeInTheDocument();
    expect(screen.getByText("Overview content")).toBeInTheDocument();
    expect(screen.queryByText("Details content")).not.toBeInTheDocument();
  });

  it("calls onChange and swaps active panel when tab changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Tabs tabs={tabs} value="overview" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Details" }));

    expect(onChange).toHaveBeenCalledWith("details");
    expect(screen.getByText("Details content")).toBeInTheDocument();
    expect(screen.queryByText("Overview content")).not.toBeInTheDocument();
  });

  it("renders nothing when tabs are empty", () => {
    render(<Tabs tabs={[]} value="overview" onChange={vi.fn()} />);

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("falls back to first tab when controlled value is invalid", () => {
    render(<Tabs tabs={tabs} value="unknown" onChange={vi.fn()} />);

    expect(screen.getByText("Overview content")).toBeInTheDocument();
    expect(screen.queryByText("Details content")).not.toBeInTheDocument();
  });

  it("shows empty state text for inactive mounted panel without content", () => {
    render(
      <Tabs
        tabs={[
          {
            label: "Overview",
            value: "overview",
            content: <div>Overview</div>,
          },
          { label: "Details", value: "details", content: null },
        ]}
        value="overview"
        onChange={vi.fn()}
        keepMounted
      />,
    );

    expect(screen.getByText("No content available.")).toBeInTheDocument();
  });
});
