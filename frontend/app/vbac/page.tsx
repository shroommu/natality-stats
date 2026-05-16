"use client";

import { Box, Typography, Link, Card } from "@mui/material";

import { Tabs, type TabsItem } from "@/components";
import { YearProvider } from "@/lib/yearContext";
import { VBACModel } from "./components/model";
import { VBACCharts } from "./components/charts";

export default function VBAC() {
  return (
    <YearProvider>
      <VBACContent />
    </YearProvider>
  );
}

function VBACContent() {
  const tabItems: TabsItem[] = [
    {
      label: "Model",
      value: "model",
      content: <VBACModel />,
    },
    {
      label: "Data Analysis",
      value: "data-analysis",
      content: <VBACCharts />,
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
              various factors that have been shown to influence VBAC success
              rates, such as maternal age, previous birth history, and labor
              characteristics.
            </Typography>
            <Typography variant="body1">
              While this tool provides an estimate of VBAC success probability
              based on various parameters, it&apos;s important to remember that
              it is not a definitive predictor. Other factors not listed can
              influence the outcome of a VBAC, and individual circumstances may
              vary.
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
              The model used for predicting VBAC success is a Random Forest
              Classifier implemented in Python using the scikit-learn library.
              The model was trained on a subset of features from the CDC
              Natality dataset that were found to be most predictive of VBAC
              success. The model&apos;s performance was evaluated using the F1
              metric. It achieved an F1 score of 0.56, indicating moderate
              predictive ability.
            </Typography>
          </Card>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
        Predicting VBAC Success
      </Typography>
      <Typography variant="body1" gutterBottom>
        Vaginal Birth After Cesarean (VBAC) is a significant consideration for
        many expectant mothers who have previously undergone a cesarean section.
        Predicting the likelihood of a successful VBAC can help inform
        decision-making and improve outcomes for both mother and baby.
      </Typography>
      <Tabs tabs={tabItems} value="model" ariaLabel="VBAC page sections" />
    </Box>
  );
}
