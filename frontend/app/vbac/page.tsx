"use client";

import { useState } from "react";

import { MenuItem, TextField, Box, Typography, Button } from "@mui/material";

export default function VBAC() {
  const [vbacPredictionParameters, setVbacPredictionParameters] = useState({
    laborInduced: false,
    laborAugmented: false,
    attendantAtBirth: 1,
    timeOfBirth: "1200",
    priorBirthsNowLiving: 1,
    numberOfPreviousCSections: 1,
    bmi: 15,
    birthWeightInGrams: 3400,
    weightGain: 30,
    intervalSinceLastLiveBirth: 52,
    numberOfPrenatalVisits: 10,
    mothersAge: 25,
    gestationalAgeInWeeks: 40,
  });

  const updateParameter = (name: string, value: string) => {
    setVbacPredictionParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predict = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict-vbac`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vbacPredictionParameters),
      },
    );

    const data = await response.json();
    alert(`Predicted VBAC success probability: ${data.vbac_prediction}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
        Predicting VBAC Success
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
          <MenuItem value={true as any}>Yes</MenuItem>
          <MenuItem value={false as any}>No</MenuItem>
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
          <MenuItem value={true as any}>Yes</MenuItem>
          <MenuItem value={false as any}>No</MenuItem>
        </TextField>
        <TextField
          select
          label="Attendant at birth"
          name="attendantAtBirth"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.attendantAtBirth}
          onChange={(event) =>
            updateParameter("attendantAtBirth", event.target.value)
          }
        >
          <MenuItem value={1}>Doctor (MD)</MenuItem>
          <MenuItem value={2}>Doctor (DO)</MenuItem>
          <MenuItem value={3}>Midwife (Certified)</MenuItem>
          <MenuItem value={4}>Midwife (Other)</MenuItem>
          <MenuItem value={5}>Other</MenuItem>
        </TextField>
        <TextField
          label="Time of birth"
          name="timeOfBirth"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.timeOfBirth}
          onChange={(event) =>
            updateParameter("timeOfBirth", event.target.value)
          }
        />
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
          label="Mother's BMI"
          name="mothersBMI"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.bmi}
          onChange={(event) => updateParameter("bmi", event.target.value)}
        />
        <TextField
          label="Baby's birth weight in grams"
          name="birthWeight"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.birthWeightInGrams}
          onChange={(event) =>
            updateParameter("birthWeightInGrams", event.target.value)
          }
        />
        <TextField
          label="Mother's weight gain during pregnancy"
          name="weightGainDuringPregnancy"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.weightGain}
          onChange={(event) =>
            updateParameter("weightGain", event.target.value)
          }
        />
        <TextField
          label="Weeks since last live birth"
          name="weeksSinceLastLiveBirth"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.intervalSinceLastLiveBirth}
          onChange={(event) =>
            updateParameter("intervalSinceLastLiveBirth", event.target.value)
          }
        />
        <TextField
          label="Number of prenatal visits"
          name="numberOfPrenatalVisits"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.numberOfPrenatalVisits}
          onChange={(event) =>
            updateParameter("numberOfPrenatalVisits", event.target.value)
          }
        />
        <TextField
          label="Mother's age at delivery"
          name="mothersAgeAtDelivery"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.mothersAge}
          onChange={(event) =>
            updateParameter("mothersAge", event.target.value)
          }
        />
        <TextField
          label="Gestational age in weeks"
          name="gestationalAgeInWeeks"
          fullWidth
          size="small"
          variant="outlined"
          value={vbacPredictionParameters.gestationalAgeInWeeks}
          onChange={(event) =>
            updateParameter("gestationalAgeInWeeks", event.target.value)
          }
        />
      </Box>
      <Button variant="contained" onClick={() => predict()}>
        Predict
      </Button>
    </Box>
  );
}
