"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Card, ChartCard, DataTable, Input, Select } from "@/components";

const yearOptions = [
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
];

const regionOptions = [
  { label: "All Regions", value: "all" },
  { label: "Northeast", value: "northeast" },
  { label: "Midwest", value: "midwest" },
  { label: "South", value: "south" },
  { label: "West", value: "west" },
];

export default function Home() {
  const [year, setYear] = useState("2021");
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");

  const summary = useMemo(() => {
    const searchFactor = query.trim().length > 0 ? 0.83 : 1;
    const regionFactor = region === "all" ? 1 : 0.74;
    const yearFactor = year === "2021" ? 1 : year === "2022" ? 1.04 : 1.07;
    const estimatedRecords = Math.round(3_850_000 * searchFactor * regionFactor * yearFactor);

    return {
      estimatedRecords,
      selectedRegion: region === "all" ? "All" : region,
      selectedYear: year,
    };
  }, [query, region, year]);

  const trendData = useMemo(() => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseValues = [301, 289, 312, 298, 305, 321];
    const regionMultiplier = region === "all" ? 1 : 0.72;
    const yearMultiplier = year === "2021" ? 1 : year === "2022" ? 1.03 : 1.06;

    return monthLabels.map((label, index) => ({
      label,
      value: Math.round(baseValues[index] * regionMultiplier * yearMultiplier * 1000),
    }));
  }, [region, year]);

  const tableRows = useMemo(() => {
    const normalizedRegion = region === "all" ? "Mixed" : region;

    return [
      { region: normalizedRegion, metric: "Total births", value: summary.estimatedRecords.toLocaleString() },
      {
        region: normalizedRegion,
        metric: "Average monthly births",
        value: Math.round(summary.estimatedRecords / 12).toLocaleString(),
      },
      {
        region: normalizedRegion,
        metric: "Estimated C-section rate",
        value: `${(31.4 + (year === "2023" ? 0.6 : 0)).toFixed(1)}%`,
      },
      {
        region: normalizedRegion,
        metric: "Estimated preterm rate",
        value: `${(10.2 + (region !== "all" ? 0.3 : 0)).toFixed(1)}%`,
      },
    ];
  }, [region, summary.estimatedRecords, year]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 md:p-10">
      <header className="flex flex-col gap-2">
        <Badge variant="default">NATALITY EXPLORER</Badge>
        <h1 className="text-2xl font-semibold tracking-tight">Interactive Data Explorer</h1>
        <p className="text-sm text-foreground/70">
          Starter dashboard using reusable components for filters and summary cards.
        </p>
      </header>

      <Card title="Filters" description="Start narrowing the dataset before loading charts or tables.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            label="Search"
            name="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hospital, county, keyword..."
          />
          <Select
            label="Year"
            name="year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            options={yearOptions}
          />
          <Select
            label="Region"
            name="region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            options={regionOptions}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button">Apply Filters</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setQuery("");
              setYear("2021");
              setRegion("all");
            }}
          >
            Reset
          </Button>
        </div>
      </Card>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Estimated Records">
          <p className="text-2xl font-semibold">{summary.estimatedRecords.toLocaleString()}</p>
        </Card>
        <Card title="Selected Year">
          <p className="text-2xl font-semibold">{summary.selectedYear}</p>
        </Card>
        <Card title="Selected Region">
          <p className="text-2xl font-semibold capitalize">{summary.selectedRegion}</p>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title="Births Trend (Sample)"
          description="Reusable chart panel for quick distributions and trend snapshots."
          data={trendData}
          footer="Swap this with real aggregates once API/data layer is connected."
        />
        <DataTable
          title="Records Preview (Sample)"
          description="Reusable table for summary metrics or raw record snippets."
          columns={[
            { key: "region", label: "Region" },
            { key: "metric", label: "Metric" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={tableRows}
        />
      </section>
    </main>
  );
}
