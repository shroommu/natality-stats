"use client";

import { Box, Typography, Link, Card } from "@mui/material";

import { Tabs, type TabsItem } from "@/components";
import { DownSyndromeModel } from "./components/model";
import { DownSyndromeCharts } from "./components/charts";

export default function DownSyndrome() {
  return <DownSyndromeContent />;
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
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Notes
            </Typography>
            <Typography variant="body1">
              The prediction provided by this tool is retrieved from a
              calibrated static lookup table that precomputes and normalizes
              risks from a regularized machine learning model. This ensures
              real-world accuracy matching the baseline CDC prevalence of
              0.0235% (1 in 4,254).
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Dataset
            </Typography>
            <Typography variant="body1">
              The model was trained on the 2021 CDC Natality dataset, which can
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

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Implementation & Calibration
            </Typography>
            <Typography variant="body1">
              Since only two features (Mother&apos;s Age and Father&apos;s Age)
              were determined to have a non-confounded predictive relationship
              with Down syndrome, we trained an XGBoost model on the data, then
              generated a lookup table from the model's predictions for all
              combinations of maternal and paternal ages. The resulting table
              provides quick and accurate risk estimates without the need for
              real-time model inference.
            </Typography>
            <Typography variant="body1">
              To address the extreme class imbalance during training, the
              underlying XGBoost model was trained with an oversampling
              parameter of <code>scale_pos_weight: 500</code>. While this
              prevents the model from predicting zero for every patient, it
              artificially distorts the raw probability outputs.
            </Typography>
            <Typography variant="body1">
              To bridge this gap and return realistic percentages, the lookup
              table mathematically calibrates the model&apos;s shifted outputs
              (p_shifted) back to true, unbiased probability (p_unbiased) by
              reversing the scale shift:
            </Typography>
            <Box
              component="span"
              sx={{
                display: "block",
                alignSelf: "center",
                fontFamily: "monospace",
                fontSize: "1.1rem",
                bgcolor: "action.selected",
                px: 2,
                py: 1,
                borderRadius: 1,
                my: 1,
              }}
            >
              p_unbiased = p_shifted / (p_shifted + 500 * (1 - p_shifted))
            </Box>
            <Typography variant="body1">
              This results in a smooth, continuous, and clinically accurate risk
              curve that removes the high positive prediction rates associated
              with standard threshold classifiers.
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
