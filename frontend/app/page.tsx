"use client";

import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ChartCard } from "@/components/ChartCard";
import { DataTable } from "@/components/DataTable";

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Chip label="NATALITY EXPLORER" color="primary" size="small" />
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>Interactive Data Explorer</Typography>
        <Typography variant="body2" color="text.secondary">
          Starter dashboard using reusable components for filters and summary cards.
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardHeader title="Filters" subheader="Start narrowing the dataset before loading charts or tables." />
        <CardContent>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Search"
              name="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Hospital, county, keyword..."
              fullWidth
              size="small"
              variant="outlined"
            />
            <TextField
              select
              label="Year"
              name="year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              fullWidth
              size="small"
              variant="outlined"
            >
              {yearOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Region"
              name="region"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              fullWidth
              size="small"
              variant="outlined"
            >
              {regionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Button variant="contained">Apply Filters</Button>
            <Button
              variant="outlined"
              onClick={() => {
                setQuery("");
                setYear("2021");
                setRegion("all");
              }}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        <Card variant="outlined">
          <CardHeader title="Estimated Records" />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>{summary.estimatedRecords.toLocaleString()}</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Selected Year" />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>{summary.selectedYear}</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Selected Region" />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{summary.selectedRegion}</Typography>
          </CardContent>
        </Card>
      </Box>

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
