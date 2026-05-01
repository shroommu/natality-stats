import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ResponsiveBarChart from "@/charts/ResponsiveBarChart";

vi.mock("@mui/material/Box", () => ({
  default: vi.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="box">{children}</div>
  )),
}));

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => <div data-testid="bar-chart" />),
}));

describe("ResponsiveBarChart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes merged chart options and custom sizing to child components", async () => {
    const Box = (await import("@mui/material/Box")).default;
    const { Bar } = await import("react-chartjs-2");

    const data = {
      labels: ["A", "B"],
      datasets: [
        {
          label: "Number of Births",
          data: [1, 2],
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      ],
    };
    const options = {
      plugins: {
        title: {
          display: true,
          text: "Custom Title",
        },
      },
    };

    render(
      <ResponsiveBarChart
        data={data}
        options={options}
        minWidth={900}
        mobileHeight={300}
        desktopHeight={500}
      />,
    );

    const mockedBox = vi.mocked(Box);
    expect(mockedBox).toHaveBeenCalledTimes(2);
    expect(mockedBox.mock.calls[1][0].sx).toEqual({
      minWidth: { xs: "900px", md: "100%" },
      height: { xs: "300px", md: "500px" },
    });

    expect(Bar).toHaveBeenCalledTimes(1);
    expect(vi.mocked(Bar).mock.calls[0][0]).toMatchObject({
      data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Custom Title",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });

  it("uses default dimensions when optional sizing props are omitted", async () => {
    const Box = (await import("@mui/material/Box")).default;

    render(
      <ResponsiveBarChart
        data={{
          labels: ["A"],
          datasets: [{ label: "Number of Births", data: [1] }],
        }}
        options={{}}
      />,
    );

    const mockedBox = vi.mocked(Box);
    expect(mockedBox.mock.calls[1][0].sx).toEqual({
      minWidth: { xs: "700px", md: "100%" },
      height: { xs: "320px", md: "420px" },
    });
  });
});
