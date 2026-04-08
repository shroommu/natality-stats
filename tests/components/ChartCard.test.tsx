import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartCard } from "@/components";

describe("ChartCard", () => {
  it("renders title, labels, formatted values, and footer", () => {
    render(
      <ChartCard
        title="Birth Trend"
        description="Sample trend"
        footer="Sample footer"
        data={[
          { label: "Jan", value: 1200 },
          { label: "Feb", value: 1600 },
        ]}
        valueFormatter={(value) => `${value} births`}
      />,
    );

    expect(screen.getByRole("heading", { name: "Birth Trend" })).toBeInTheDocument();
    expect(screen.getByText("Sample trend")).toBeInTheDocument();
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Feb")).toBeInTheDocument();
    expect(screen.getByText("1200 births")).toBeInTheDocument();
    expect(screen.getByText("1600 births")).toBeInTheDocument();
    expect(screen.getByText("Sample footer")).toBeInTheDocument();
  });

  it("renders no value rows when data is empty", () => {
    render(<ChartCard title="Empty Chart" data={[]} />);

    expect(screen.getByRole("heading", { name: "Empty Chart" })).toBeInTheDocument();
    expect(screen.queryByText(/births/)).not.toBeInTheDocument();
  });
});
