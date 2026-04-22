"use client";

import { useState } from "react";

import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Tabs, type TabsItem } from "@/components";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabItems: TabsItem[] = [
    {
      label: "Overview",
      value: "overview",
      content: (
        <>
          <Typography variant="body1" gutterBottom>
            This dashboard provides an overview of the CDC&apos;s 2021 natality
            data, including key statistics and visualizations. Explore the
            charts and tables to gain insights into birth trends, demographics,
            and other relevant information.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* TODO: Fill in with actual stats from the data */}
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Key Statistics
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Card variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Total Births
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600 }}
                    gutterBottom
                  >
                    3,659,289
                  </Typography>
                </Box>
              </Card>
              <Card variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Birth Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    11 births
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    per 1,000 people
                  </Typography>
                </Box>
              </Card>
              <Card variant="outlined" sx={{ p: 2, flex: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Fertility Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    56.6 births
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    per 1,000 women
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </>
      ),
    },
    {
      label: "Methodology",
      value: "methodology",
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">
            This project uses CDC natality records for 2021 and includes derived
            features from data cleaning and modeling notebooks in the
            repository.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Values shown above are placeholders and can be replaced by dynamic
            metrics once API-backed aggregates are connected.
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
        2021 Natality Data Overview
      </Typography>
      <Tabs
        tabs={tabItems}
        value={activeTab}
        onChange={setActiveTab}
        ariaLabel="Natality dashboard sections"
      />
    </Box>
  );
}
