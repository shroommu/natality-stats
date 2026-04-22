import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

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
    expect(screen.getByText("MothersAgeChart")).toBeInTheDocument();
    expect(screen.getByText("MothersRaceChart")).toBeInTheDocument();
    expect(screen.queryByText("FathersAgeChart")).not.toBeInTheDocument();
    expect(screen.queryByText("FathersRaceChart")).not.toBeInTheDocument();
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
    expect(screen.getByText("FathersAgeChart")).toBeInTheDocument();
    expect(screen.getByText("FathersRaceChart")).toBeInTheDocument();
    expect(screen.queryByText("MothersAgeChart")).not.toBeInTheDocument();
    expect(screen.queryByText("MothersRaceChart")).not.toBeInTheDocument();
  });

  it("honors valid tab query on initial render", async () => {
    searchQuery = "tab=parental-characteristics";
    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByRole("tab", { name: "Parental Characteristics" }),
      ).toHaveAttribute("aria-selected", "true");
    });
    expect(screen.getByText("FathersAgeChart")).toBeInTheDocument();
    expect(screen.getByText("FathersRaceChart")).toBeInTheDocument();
  });
});
