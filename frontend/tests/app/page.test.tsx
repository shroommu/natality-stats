import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

const replaceMock = vi.fn();
let searchQuery = "";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => new URLSearchParams(searchQuery),
}));

describe("Home page", () => {
  beforeEach(() => {
    replaceMock.mockClear();
    searchQuery = "";
  });

  it("renders heading and tab controls", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "2021 Natality Data Overview" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Maternal Characteristics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Parental Characteristics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Key Statistics")).toBeInTheDocument();
  });

  it("switches tab panels and updates URL query", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(
      screen.getByRole("tab", { name: "Parental Characteristics" }),
    );

    expect(replaceMock).toHaveBeenCalledWith("/?tab=parental-characteristics", {
      scroll: false,
    });
  });

  it("honors valid tab query on initial render", async () => {
    searchQuery = "tab=parental-characteristics";
    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByRole("tab", { name: "Parental Characteristics" }),
      ).toHaveAttribute("aria-selected", "true");
    });
  });
});
