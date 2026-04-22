import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Tabs } from "@/components";

const replaceMock = vi.fn();
let searchQuery = "";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => new URLSearchParams(searchQuery),
}));

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
  beforeEach(() => {
    replaceMock.mockClear();
    searchQuery = "";
  });

  it("renders labels and only the active panel", () => {
    render(<Tabs tabs={tabs} value="overview" onChange={vi.fn()} />);

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Details" })).toBeInTheDocument();
    expect(screen.getByText("Overview content")).toBeInTheDocument();
    expect(screen.queryByText("Details content")).not.toBeInTheDocument();
  });

  it("calls onChange and updates query param when tab changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Tabs tabs={tabs} value="overview" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Details" }));

    expect(onChange).toHaveBeenCalledWith("details");
    expect(replaceMock).toHaveBeenCalledWith("/?tab=details", {
      scroll: false,
    });
  });

  it("syncs controlled value from valid URL query param", async () => {
    const onChange = vi.fn();
    searchQuery = "tab=details";

    render(<Tabs tabs={tabs} value="overview" onChange={onChange} />);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("details");
    });
  });

  it("falls back to active tab when query param is invalid", async () => {
    searchQuery = "tab=invalid&year=2021";

    render(<Tabs tabs={tabs} value="overview" onChange={vi.fn()} />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/?tab=overview&year=2021", {
        scroll: false,
      });
    });
  });

  it("renders nothing when tabs are empty", () => {
    render(<Tabs tabs={[]} value="overview" onChange={vi.fn()} />);

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("falls back to first tab when controlled value is invalid", async () => {
    render(<Tabs tabs={tabs} value="unknown" onChange={vi.fn()} />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/?tab=overview", {
        scroll: false,
      });
    });
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
