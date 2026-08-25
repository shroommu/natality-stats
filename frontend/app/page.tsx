"use client";

import { Suspense } from "react";

import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  Card,
  CircularProgress,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Tabs, type TabsItem } from "@/components";
import { YearToggle } from "@/components/YearToggle";
import { useSummaryStats } from "@/hooks/useSummaryStats";
import { useSelectedYear } from "@/lib/yearContext";

import MothersRace from "@/charts/MothersRace";
import MothersAge from "@/charts/MothersAge";
import FathersRace from "@/charts/FathersRace";
import FathersAge from "@/charts/FathersAge";
import MonthPrenatalCareStarted from "@/charts/MonthPrenatalCareStarted";
import NumberOfPrenatalVisits from "@/charts/NumberOfPrenatalVisits";
import PrePregnancyWeight from "@/charts/PrePregnancyWeight";
import PresenceOfPregnancyRiskFactors from "@/charts/PresenceOfPregnancyRiskFactors";
import WeightGain from "@/charts/WeightGain";
import MothersBMI from "@/charts/MothersBMI";
import DeliveryWeight from "@/charts/DeliveryWeight";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  minHeight: 48,
  [`&.${accordionSummaryClasses.expanded}`]: {
    minHeight: 48,
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    margin: theme.spacing(1.5, 0),
    marginLeft: theme.spacing(2),
  },
  [`& .${accordionSummaryClasses.content}.${accordionSummaryClasses.expanded}`]:
    {
      margin: theme.spacing(1.5, 0),
      marginLeft: theme.spacing(2),
    },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

export default function Home() {
  return <HomeContent />;
}

function HomeContent() {
  const { year } = useSelectedYear();
  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useSummaryStats();

  const initialDemographicsTab = "maternal-characteristics";

  const demographicsTabItems: TabsItem[] = [
    {
      label: "Maternal Characteristics",
      value: "maternal-characteristics",
      content: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <MothersAge />
          <MothersRace />
        </Box>
      ),
    },
    {
      label: "Paternal Characteristics",
      value: "paternal-characteristics",
      content: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <FathersAge />
          <FathersRace />
        </Box>
      ),
    },
  ];

  const totalBirthsDisplay =
    summaryLoading || !summary ? null : summary.totalBirths.toLocaleString();
  const fertilityDisplay =
    summary != null && summary.fertilityRatePer1000 != null
      ? `${summary.fertilityRatePer1000} births`
      : "—";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 3 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "flex-start" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, fontSize: { xs: "1.8rem", sm: "2rem" } }}
          gutterBottom
        >
          {year} Natality Data Overview
        </Typography>
        <YearToggle />
      </Box>
      <Typography variant="body1" gutterBottom>
        This page provides an overview of the CDC&apos;s {year} natality data,
        including key statistics and visualizations. Explore the charts and
        tables to gain insights into birth trends, demographics, and other
        relevant information.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Key Statistics
        </Typography>
        {summaryError ? (
          <Typography color="error" role="alert">
            {summaryError}
          </Typography>
        ) : null}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Card
            variant="elevation"
            sx={{
              p: { xs: 2, sm: 3 },
              flex: { xs: 1, md: 1.8 },
              borderLeft: "6px solid",
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Total Births
              </Typography>
              <Box
                sx={{ minHeight: 40, display: "flex", alignItems: "center" }}
              >
                {summaryLoading ? (
                  <CircularProgress size={28} aria-label="Loading summary" />
                ) : (
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "2rem", sm: "2.5rem" },
                      fontVariantNumeric: "tabular-nums",
                      background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {totalBirthsDisplay}
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
          <Card
            variant="elevation"
            sx={{
              p: { xs: 2, sm: 3 },
              flex: { xs: 1, md: 1 },
              borderLeft: "6px solid",
              borderColor: "secondary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Fertility Rate
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                  fontVariantNumeric: "tabular-nums",
                  background: theme => `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {summaryLoading ? "…" : fertilityDisplay}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
                per 1,000 women ages 15–44
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
        Detailed Statistics
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography component="span">Parental Demographics</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
          <Suspense
            fallback={
              <Typography variant="body2">Loading sections…</Typography>
            }
          >
            <Tabs
              tabs={demographicsTabItems}
              value={initialDemographicsTab}
              ariaLabel="Natality demographics dashboard sections"
            />
          </Suspense>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography component="span">Prenatal Care Details</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1.5, sm: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <MonthPrenatalCareStarted />
          <NumberOfPrenatalVisits />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography component="span">
            Pre-Pregnancy Vital Statistics
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1.5, sm: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <PrePregnancyWeight />
          <MothersBMI />
          {/* <PresenceOfPregnancyRiskFactors /> */}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography component="span">
            Post-Pregnancy Vital Statistics
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1.5, sm: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <DeliveryWeight />
          <WeightGain />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography component="span">Newborn Vital Statistics</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1.5, sm: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        ></AccordionDetails>
      </Accordion> */}
    </Box>
  );
}
