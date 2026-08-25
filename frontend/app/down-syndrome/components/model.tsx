"use client";

import { useState } from "react";

import {
  TextField,
  Box,
  Typography,
  Button,
  Card,
  CircularProgress,
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
  const [loading, setLoading] = useState(false);

  const [mothersAgeError, setMothersAgeError] = useState("");
  const [fathersAgeError, setFathersAgeError] = useState("");

  const updateParameter = (name: string, value: unknown) => {
    setDownSyndromePredictionParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMothersAgeChange = (val: string) => {
    updateParameter("mothersAge", val);
    const num = parseInt(val, 10);
    if (!val) {
      setMothersAgeError("Mother's age is required");
    } else if (isNaN(num) || num < 10 || num > 80) {
      setMothersAgeError("Age must be between 10 and 80");
    } else {
      setMothersAgeError("");
    }
  };

  const handleFathersAgeChange = (val: string) => {
    updateParameter("fathersAge", val);
    const num = parseInt(val, 10);
    if (!val) {
      setFathersAgeError("Father's age is required");
    } else if (isNaN(num) || num < 10 || num > 80) {
      setFathersAgeError("Age must be between 10 and 80");
    } else {
      setFathersAgeError("");
    }
  };

  const predict = async () => {
    const mAgeStr = String(downSyndromePredictionParameters.mothersAge);
    const fAgeStr = String(downSyndromePredictionParameters.fathersAge);
    const mAge = parseInt(mAgeStr, 10);
    const fAge = parseInt(fAgeStr, 10);

    let hasError = false;
    if (!mAgeStr) {
      setMothersAgeError("Mother's age is required");
      hasError = true;
    } else if (isNaN(mAge) || mAge < 10 || mAge > 80) {
      setMothersAgeError("Age must be between 10 and 80");
      hasError = true;
    } else {
      setMothersAgeError("");
    }

    if (!fAgeStr) {
      setFathersAgeError("Father's age is required");
      hasError = true;
    } else if (isNaN(fAge) || fAge < 10 || fAge > 80) {
      setFathersAgeError("Age must be between 10 and 80");
      hasError = true;
    } else {
      setFathersAgeError("");
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response = await fetch("/api/predict-down-syndrome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downSyndromePredictionParameters),
      });

      if (response.ok !== undefined && !response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setDownSyndromePrediction(data.down_syndrome_prediction);
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
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
          Down Syndrome Probability
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
            type="number"
            slotProps={{ htmlInput: { min: 10, max: 80, step: "1", inputMode: "numeric" } }}
            disabled={loading}
            error={Boolean(mothersAgeError)}
            helperText={mothersAgeError}
            value={downSyndromePredictionParameters.mothersAge}
            onChange={(event) =>
              handleMothersAgeChange(event.target.value)
            }
          />
          <TextField
            label="Father's Age"
            name="fathersAge"
            fullWidth
            size="small"
            variant="outlined"
            type="number"
            slotProps={{ htmlInput: { min: 10, max: 80, step: "1", inputMode: "numeric" } }}
            disabled={loading}
            error={Boolean(fathersAgeError)}
            helperText={fathersAgeError}
            value={downSyndromePredictionParameters.fathersAge}
            onChange={(event) =>
              handleFathersAgeChange(event.target.value)
            }
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => predict()}
          disabled={loading || Boolean(mothersAgeError) || Boolean(fathersAgeError)}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ textTransform: "none", minWidth: 120 }}
        >
          {loading ? "Predicting…" : "Predict"}
        </Button>
      </Card>
    </Box>
  );
}
