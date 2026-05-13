import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  Link,
} from "@mui/material";

import AttendantAtBirthCrossTabHeatmap from "@/charts/vbac/AttendantAtBirthCrossTabHeatmap";
import AugmentationOfLaborCrossTabHeatmap from "@/charts/vbac/AugmentationOfLaborCrossTabHeatmap";
import InductionOfLaborCrossTabHeatmap from "@/charts/vbac/InductionOfLaborCrossTabHeatmap";
import TimeOfBirthCrossTabHeatmap from "@/charts/vbac/TimeOfBirthCrossTabHeatmap";
import PriorBirthsNowLivingCrossTabHeatmap from "@/charts/vbac/PriorBirthsNowLivingCrossTabHeatmap";
import NumberOfPreviousCesareanCrossTabHeatmap from "@/charts/vbac/NumberOfPreviousCesareanCrossTabHeatmap";
import BMICrossTabHeatmap from "@/charts/vbac/BMICrossTabHeatmap";
import BirthWeightInGramsCrossTabHeatmap from "@/charts/vbac/BirthWeightInGramsCrossTabHeatmap";
import CombinedGestationDetailCrossTabHeatmap from "@/charts/vbac/CombinedGestationDetailCrossTabHeatmap";
import WeightGainCrossTabHeatmap from "@/charts/vbac/WeightGainCrossTabHeatmap";
import IntervalSinceLastLiveBirthCrossTabHeatmap from "@/charts/vbac/IntervalSinceLastLiveBirthCrossTabHeatmap";
import NumberOfPrenatalVisitsCrossTabHeatmap from "@/charts/vbac/NumberOfPrenatalVisitsCrossTabHeatmap";
import MothersSingleYearAgeCrossTabHeatmap from "@/charts/vbac/MothersSingleYearAgeCrossTabHeatmap";
import FathersCombinedAgeCrossTabHeatmap from "@/charts/vbac/FathersCombinedAgeCrossTabHeatmap";
import PriorBirthsPreviousCesareanCrossTabHeatmap from "@/charts/vbac/PriorBirthsPreviousCesareanCrossTabHeatmap";

export function VBACCharts() {
  const features = [
    { id: 1, name: "Augmentation of Labor" },
    { id: 2, name: "Induction of Labor" },
    { id: 3, name: "Attendant at Birth" },
    { id: 4, name: "Time of Birth" },
    { id: 5, name: "Prior Births Now Living" },
    { id: 6, name: "Number of Previous Cesarean" },
    { id: 7, name: "BMI" },
    { id: 8, name: "Birth Weight in Grams" },
    { id: 9, name: "Gestation Age in Weeks" },
    { id: 10, name: "Weight Gain" },
    { id: 11, name: "Interval Since Last Live Birth" },
    { id: 12, name: "Number of Prenatal Visits" },
    { id: 13, name: "Mother's Height in Inches" },
    { id: 14, name: "Mother's Age" },
    { id: 15, name: "Father's Age" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Card
        variant="elevation"
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Data Exploration
        </Typography>
        <Typography variant="body1">
          In creating a prediction model, our first step was to analyze the
          dataset to identify the top predictors of a successful VBAC.
        </Typography>
        <Typography variant="body1">
          The 2021 natality dataset is composed of over 3.5 million births, but
          not all of those births were from mothers who had previously had a
          c-section. Therefore, our first step in filtering our data was to
          select only those mothers. We were then left with a subset of about
          550,000 births.
        </Typography>
        <Typography variant="body1">
          Within that subset, we discovered the following statistic:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              boxShadow: 1,
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repeat C-Section Rate
            </Typography>
            <Typography variant="body1" gutterBottom>
              85.8%
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              boxShadow: 1,
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              VBAC Success Rate
            </Typography>
            <Typography variant="body1" gutterBottom>
              14.2%
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        variant="elevation"
        sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Feature Selection
        </Typography>
        <Typography variant="body1">
          Our dataset contained over 100 features, not all of which we believed
          would be relevant to our model. For our first pass on feature
          selection, we removed any features related to data collected about the
          mother and newborn after the completion of labor.
        </Typography>
        <Typography variant="body1">
          To further refine our feature selection, we trained a Random Forest
          classifier using our filtered dataset, then used the{" "}
          <Box
            sx={{
              fontFamily: "monospace",
              background: "grey",
              color: "white",
              px: 0.5,
            }}
            component="span"
          >
            feature_importances_
          </Box>{" "}
          attribute to obtain a list of features that would be worth exploring
          further.
        </Typography>
        <Typography variant="body1">
          That provided us with the following list of features, in order of
          importance:
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            boxShadow: 1,
            p: { xs: 1.5, sm: 2 },
          }}
        >
          <Grid container spacing={0.5}>
            {features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6 }} key={feature.id}>
                <List
                  dense
                  disablePadding
                  sx={{ listStyleType: "disc", pl: 4, py: 0 }}
                  component="div"
                >
                  <ListItem
                    disablePadding
                    sx={{
                      display: "list-item",
                      py: 0.25,
                      minHeight: 0,
                    }}
                    component="div"
                  >
                    {feature.name}
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="body1">
          Note: We decided not to investigate the Mother's Height feature, as
          height is factored into BMI.
        </Typography>
      </Card>
      <Card
        variant="elevation"
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Data Visualizations and Insights
        </Typography>
        <Typography variant="body1">
          To investigate the relationships between these features and the
          target, we created a cross-tabulation chart for each. Using the
          Proportion column, we were able to determine the rate at which VBACs
          were successful for each value of the feature.
        </Typography>
        <AugmentationOfLaborCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          <Link href="https://my.clevelandclinic.org/health/treatments/24221-augmentation-of-labor">
            Labor Augmentation
          </Link>{" "}
          results in a significant increase in VBAC success.
        </Typography>
        <InductionOfLaborCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          <Link href="https://my.clevelandclinic.org/health/treatments/17698-labor-induction">
            Labor Induction
          </Link>{" "}
          also results in a significant increase in VBAC success, though not as
          significant as labor augmentation.
        </Typography>
        <AttendantAtBirthCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          At first glance, it appears that when a midwife is the birth
          attendant, the expectant mother is more likely to have a successful
          VBAC. However, it's important to note that most midwives are unable to
          perform c-sections, so it may be the case that the birthing mother may
          attempt a vaginal delivery for longer than she might under the
          supervision of an attendant who can perform surgery. Midwives are also
          less likely to oversee the care of high-risk pregnancies, which are
          more likely to require a c-section for the safety of mother and baby.
        </Typography>
        <TimeOfBirthCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          There is no particular time of day that is more likely to result in a
          successful VBAC. However, a c-section is more likely to occur during
          business hours. This is likely the result of pre-scheduled c-sections.
        </Typography>
        <PriorBirthsNowLivingCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The more children a mother has borne, the more likely she is to have a
          successful VBAC. This is counterintuitive, but our suspicion is that
          this may be better explored in conjunction with number of previous
          c-sections.
        </Typography>
        <NumberOfPreviousCesareanCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The more c-sections a mother has had, the less likely she is to have a
          successful VBAC.
        </Typography>
        <BMICrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The higher a mother's BMI, the less likely she is to have a successful
          VBAC.
        </Typography>
        <BirthWeightInGramsCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Of healthy birth weights (above 2500 grams), successful VBACS appear
          to be approximately proportional to the number of c-sections.
          Important to note, infants with birth weights below 2500 grams are
          likely to be premature or miscarried, and infants with birth weights
          above 5000 grams are uncommon enough that we may discount them as
          outliers.
        </Typography>
        <CombinedGestationDetailCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Preterm deliveries are most likely to result in a VBAC; however, we
          would not consider these to be "successful", as deliveries prior to 28
          weeks gestation have a near-100% chance of mortality. Of term or
          near-term deliveries, those at 40-41 weeks are most likely to have
          successful VBACs.
        </Typography>
        <WeightGainCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The more weight a mother gains during pregnancy, the less likely she
          is to have a successful VBAC.
        </Typography>
        <IntervalSinceLastLiveBirthCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The more time since the last live birth, the less likely the mother is
          to have a successful VBAC.
        </Typography>
        <NumberOfPrenatalVisitsCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Fewer prenatal visits appear to result in greater chances of
          successful VBACs. However, this is likely due to low medical provider
          involvement, and it would likely be preferable for those mothers to
          have received more prenatal care. It would be interesting to know how
          well these mothers recovered after vaginal birth, and if a c-section
          would have been preferable for medical reasons. At the higher end of
          the spectrum, more prenatal visits likely correlate to higher-risk
          pregnancies, which are more likely to require a c-section.
        </Typography>
        <MothersSingleYearAgeCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Mothers around the age of 27 are most likely to have a successful
          VBAC, with the rate decreasing at higher and lower ages.
        </Typography>
        <FathersCombinedAgeCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Fathers around the age of 32 are most likely to have a successful
          VBAC, with the rate decreasing at higher and lower ages.
        </Typography>
        <PriorBirthsPreviousCesareanCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          A successful VBAC is most likely to occur after 1 previous c-section.
          The more prior births and c-sections that have occurred, the less
          likely a successful VBAC becomes.
        </Typography>
      </Card>
    </Box>
  );
}
