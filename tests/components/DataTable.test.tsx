import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DataTable } from "@/components";

const columns = [
  { key: "region", label: "Region" },
  { key: "metric", label: "Metric" },
  { key: "value", label: "Value", align: "right" as const },
];

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(
      <DataTable
        title="Records"
        columns={columns}
        rows={[
          { region: "West", metric: "Total births", value: "800,000" },
          { region: "South", metric: "Total births", value: "1,200,000" },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Records" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Region" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Metric" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Value" })).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
    expect(within(rows[1]).getByText("West")).toBeInTheDocument();
    expect(within(rows[2]).getByText("South")).toBeInTheDocument();
  });

  it("applies right alignment to configured columns", () => {
    render(
      <DataTable
        title="Aligned"
        columns={columns}
        rows={[{ region: "Mixed", metric: "Rate", value: "10.2%" }]}
      />,
    );

    const valueHeader = screen.getByRole("columnheader", { name: "Value" });
    const valueCell = screen.getByRole("cell", { name: "10.2%" });

    expect(valueHeader).toHaveClass("text-right");
    expect(valueCell).toHaveClass("text-right");
  });

  it("shows empty message when no rows are provided", () => {
    render(
      <DataTable
        title="Empty"
        columns={columns}
        rows={[]}
        emptyMessage="No matching records"
      />,
    );

    expect(screen.getByText("No matching records")).toBeInTheDocument();
  });
});
