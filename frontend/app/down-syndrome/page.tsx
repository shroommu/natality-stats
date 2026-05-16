"use client";

import { Box, Typography, Link, Card } from "@mui/material";

import { Tabs, type TabsItem } from "@/components";
import { YearProvider } from "@/lib/yearContext";
import { DownSyndromeModel } from "./components/model";
import { DownSyndromeCharts } from "./components/charts";

export default function DownSyndrome() {
  return (
    <YearProvider>
      <DownSyndromeContent />
    </YearProvider>
  );
}

function DownSyndromeContent() {
  const tabItems: TabsItem[] = [
    {
      label: "Model",
      value: "model",
      content: <DownSyndromeModel />,
    },
    {
      label: "Data Analysis",
      value: "data-analysis",
      content: <DownSyndromeCharts />,
    },
    {
      label: "Technical Details",
      value: "technical-details",
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Card
            variant="elevation"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Notes</Typography>
            <Typography variant="body1">
              The prediction provided by this tool is based on a machine
              learning model trained on historical data. It takes into account
              the top predictors of Down Syndrome: mother's age, and father's
              age.
            </Typography>
            <Typography variant="h5">Dataset</Typography>
            <Typography variant="body1">
              This model was trained on the 2021 CDC Natality dataset, which can
              be located{" "}
              <Link
                href="https://www.cdc.gov/nchs/data_access/vitalstatsonline.htm#Births"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
              . The dataset includes detailed information on births in the
              United States occurring in the 2021 calendar year, including
              maternal characteristics, pregnancy history, and birth outcomes.
            </Typography>
            <Typography variant="h5">Model Details</Typography>
            <Typography variant="body1">
              The model used for predicting Down Syndrome is a Random Forest
              Classifier implemented in Python using the scikit-learn library.
              The model was trained on a subset of features from the CDC
              Natality dataset that were found to be most predictive of Down
              Syndrome. The model&apos;s performance was evaluated using the F1.
              It achieved an F1 score of 0.56, indicating moderate predictive
              ability.
            </Typography>
          </Card>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
        Predicting Down Syndrome
      </Typography>
      <Typography variant="body1" gutterBottom>
        Down syndrome is the most common genetic disorder, occurring in
        approximately 1 in every 700 births. It is caused by the presence of an
        extra copy of chromosome 21, which leads to developmental delays and
        intellectual disabilities. Predicting the likelihood of Down syndrome
        can help inform decision-making and improve outcomes for both mother and
        baby.
      </Typography>
      <Tabs
        tabs={tabItems}
        value="model"
        ariaLabel="Down Syndrome page sections"
      />
    </Box>
  );
}
