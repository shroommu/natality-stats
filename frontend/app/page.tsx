"use client";

import { Suspense } from "react";

import { styled } from "@mui/material/styles";
import { Accordion, AccordionDetails, Card } from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Tabs, type TabsItem } from "@/components";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 3 },
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, fontSize: { xs: "1.8rem", sm: "2rem" } }}
        gutterBottom
      >
        2021 Natality Data Overview
      </Typography>
      <Typography variant="body1" gutterBottom>
        This page provides an overview of the CDC&apos;s 2021 natality data,
        including key statistics and visualizations. Explore the charts and
        tables to gain insights into birth trends, demographics, and other
        relevant information.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* TODO: Fill in with actual stats from the data */}
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Key Statistics
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Card variant="elevation" sx={{ p: { xs: 1.5, sm: 2 }, flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Total Births
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.65rem", sm: "2rem" },
                }}
                gutterBottom
              >
                3,659,289
              </Typography>
            </Box>
          </Card>
          <Card variant="elevation" sx={{ p: { xs: 1.5, sm: 2 }, flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Birth Rate
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.65rem", sm: "2rem" },
                }}
              >
                11 births
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per 1,000 people
              </Typography>
            </Box>
          </Card>
          <Card variant="elevation" sx={{ p: { xs: 1.5, sm: 2 }, flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Fertility Rate
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.65rem", sm: "2rem" },
                }}
              >
                56.6 births
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per 1,000 women
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
              <Typography variant="body2">Loading sections...</Typography>
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
          <PresenceOfPregnancyRiskFactors />
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
