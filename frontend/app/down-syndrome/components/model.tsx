"use client";

import { useState } from "react";

import {
  MenuItem,
  TextField,
  Box,
  Typography,
  Button,
  Card,
} from "@mui/material";

export function DownSyndromeModel() {
  const [
    downSyndromePredictionParameters,
    setDownSyndromePredictionParameters,
  ] = useState({
    mothersAge: 25,
    fathersAge: 30,
  });
  const [downSyndromePrediction, setDownSyndromePrediction] = useState<
    number | null
  >(null);

  const updateParameter = (name: string, value: unknown) => {
    setDownSyndromePredictionParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predict = async () => {
    const response = await fetch("/api/predict-down-syndrome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(downSyndromePredictionParameters),
    });

    const data = await response.json();
    setDownSyndromePrediction(data.down_syndrome_prediction);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        <Typography variant="h5" gutterBottom>
          Down Syndrome Prediction
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
          {downSyndromePrediction !== null
            ? `${downSyndromePrediction}%`
            : "--%"}
        </Typography>
      </Card>
      <Card
        variant="elevation"
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Parameters
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            label="Mother's Age"
            name="mothersAge"
            fullWidth
            size="small"
            variant="outlined"
            value={downSyndromePredictionParameters.mothersAge}
            onChange={(event) =>
              updateParameter("mothersAge", event.target.value)
            }
          />
          <TextField
            label="Father's Age"
            name="fathersAge"
            fullWidth
            size="small"
            variant="outlined"
            value={downSyndromePredictionParameters.fathersAge}
            onChange={(event) =>
              updateParameter("fathersAge", event.target.value)
            }
          />
        </Box>
        <Button variant="contained" onClick={() => predict()}>
          Predict
        </Button>
      </Card>
    </Box>
  );
}
