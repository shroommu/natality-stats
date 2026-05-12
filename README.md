# Natality Stats

After working for a year in an OB/GYN clinic in Seattle, I became interested in studying the statistics surrounding pregnancy outcomes and related womens' health issues.

This is an ongoing project to learn and demonstrate data science concepts using the CDC's 2021 natality dataset.

---

## Overview

A web dashboard for exploring U.S. birth and pregnancy outcome statistics drawn from CDC natality data (2021–2024), paired with an interactive VBAC (vaginal birth after cesarean) success probability tool powered by a machine learning model.

The dashboard lets users toggle across four years of data and explore distributions across parental demographics, prenatal care patterns, and maternal vital statistics through a set of interactive charts. The VBAC predictor accepts clinical inputs and returns a probability estimate from a trained Random Forest classifier.

---

## Technical Summary

### Frontend (`/frontend`)

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: MUI v9 (`@mui/material`) with Tailwind CSS v4
- **Charts**: Chart.js via `react-chartjs-2`

### Backend (`/backend`)

- **Framework**: Flask
- **ML model**: Random Forest classifier trained on CDC natality data; pipeline and model weights are loaded from `models/vbac/*.pkl` at startup.
- **Deploy**: `@vercel/python` build targeting `app.py`.

### Offline Data Pipeline (`/dev`)

Python scripts for transforming raw CDC fixed-width natality `.txt` files into Parquet, then aggregating into the per-year JSON files committed under `frontend/public/data/`. Key tools: pandas, scikit-learn, imbalanced-learn, TensorFlow (training only), cloudpickle.
