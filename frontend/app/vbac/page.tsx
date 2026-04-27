"use client";

import { useState } from "react";

import {
  MenuItem,
  TextField,
  Box,
  Typography,
  Button,
  Card,
  Link,
} from "@mui/material";

export default function VBAC() {
  const [vbacPredictionParameters, setVbacPredictionParameters] = useState({
    laborInduced: false,
    laborAugmented: false,
    attendantAtBirth: 1,
    priorBirthsNowLiving: 1,
    numberOfPreviousCSections: 1,
    bmi: 15,
    intervalSinceLastLiveBirth: 24,
    gestationalAgeInWeeks: 40,
  });
  const [vbacPrediction, setVbacPrediction] = useState<number | null>(null);

  const updateParameter = (name: string, value: any) => {
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
    setVbacPrediction(data.vbac_prediction);
  };

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
      <Typography variant="body1" gutterBottom>
        Use the form below to input the relevant parameters for predicting the
        success of a VBAC. After filling out the form, click the "Predict"
        button to see the estimated probability of a successful VBAC.
      </Typography>
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
          {`VBAC Success Probability`}
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
            label="Months since last live birth"
            name="monthsSinceLastLiveBirth"
            fullWidth
            size="small"
            variant="outlined"
            value={vbacPredictionParameters.intervalSinceLastLiveBirth}
            onChange={(event) =>
              updateParameter("intervalSinceLastLiveBirth", event.target.value)
            }
          />
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
        </Box>
        <Button variant="contained" onClick={() => predict()}>
          Predict
        </Button>
      </Card>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Notes
        </Typography>
        <Typography variant="body1" gutterBottom>
          The prediction provided by this tool is based on a machine learning
          model trained on historical data. It takes into account various
          factors that have been shown to influence VBAC success rates, such as
          maternal age, previous birth history, and labor characteristics.
        </Typography>
        <Typography variant="body1" gutterBottom>
          While this tool provides an estimate of VBAC success probability based
          on various parameters, it's important to remember that it is not a
          definitive predictor. Other factors not listed can influence the
          outcome of a VBAC, and individual circumstances may vary.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Technical Details
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300 }} gutterBottom>
          Dataset
        </Typography>
        <Typography variant="body1" gutterBottom>
          This model was trained on the 2021 CDC Natality dataset, which can be
          located{" "}
          <Link
            href="https://www.cdc.gov/nchs/data_access/vitalstatsonline.htm#Births"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>
          . The dataset includes detailed information on births in the United
          States occurring in the 2021 calendar year, including maternal
          characteristics, pregnancy history, and birth outcomes.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300 }} gutterBottom>
          Model Details
        </Typography>
        <Typography variant="body1">
          The model used for predicting VBAC success is a Random Forest
          Classifier implemented in Python using the scikit-learn library. The
          model was trained on a subset of features from the CDC Natality
          dataset that were found to be most predictive of VBAC success. The
          model's performance was evaluated using the F1 metric, and it achieved
          an F1 score of 0.57, indicating moderate predictive ability.
        </Typography>
      </Box>
    </Box>
  );
}
