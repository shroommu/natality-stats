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

export function VBACModel() {
  const [vbacPredictionParameters, setVbacPredictionParameters] = useState({
    laborInduced: false,
    laborAugmented: false,
    priorBirthsNowLiving: 1,
    numberOfPreviousCSections: 1,
    fetalPresentationAtDelivery: 1,
    gestationalAgeInWeeks: 40,
    bmi: 20,
  });
  const [vbacPrediction, setVbacPrediction] = useState<number | null>(null);

  const updateParameter = (name: string, value: unknown) => {
    setVbacPredictionParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predict = async () => {
    const response = await fetch("/api/predict-vbac", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vbacPredictionParameters),
    });

    const data = await response.json();
    setVbacPrediction(data.vbac_prediction);
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
          VBAC Success Probability
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
          {vbacPrediction !== null ? `${vbacPrediction}%` : "--%"}
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
            select
            label="Was labor induced?"
            name="laborInduced"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.laborInduced}
            onChange={(event) =>
              updateParameter("laborInduced", event.target.value)
            }
          >
            <MenuItem value={true as never}>Yes</MenuItem>
            <MenuItem value={false as never}>No</MenuItem>
          </TextField>
          <TextField
            select
            label="Was labor augmented?"
            name="laborAugmented"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.laborAugmented}
            onChange={(event) =>
              updateParameter("laborAugmented", event.target.value)
            }
          >
            <MenuItem value={true as never}>Yes</MenuItem>
            <MenuItem value={false as never}>No</MenuItem>
          </TextField>
          <TextField
            select
            label="Number of previous live births"
            name="priorBirthsNowLiving"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.priorBirthsNowLiving}
            onChange={(event) =>
              updateParameter("priorBirthsNowLiving", event.target.value)
            }
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Number of previous C-sections"
            name="numberOfPreviousCSections"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.numberOfPreviousCSections}
            onChange={(event) =>
              updateParameter("numberOfPreviousCSections", event.target.value)
            }
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Fetal presentation at delivery"
            name="fetalPresentationAtDelivery"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.fetalPresentationAtDelivery}
            onChange={(event) =>
              updateParameter("fetalPresentationAtDelivery", event.target.value)
            }
          >
            <MenuItem value={1}>Cephalic</MenuItem>
            <MenuItem value={2}>Breech</MenuItem>
            <MenuItem value={3}>Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Gestational age in weeks"
            name="gestationalAgeInWeeks"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.gestationalAgeInWeeks}
            onChange={(event) =>
              updateParameter("gestationalAgeInWeeks", event.target.value)
            }
          >
            {[28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ),
            )}
          </TextField>
          <TextField
            label="Mother's BMI"
            name="bmi"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.bmi}
            onChange={(event) => updateParameter("bmi", event.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={() => predict()}>
          Predict
        </Button>
      </Card>
    </Box>
  );
}
