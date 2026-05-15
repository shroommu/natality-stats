import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  Link,
} from "@mui/material";

import AugmentationOfLaborCrossTabHeatmap from "@/charts/vbac/AugmentationOfLaborCrossTabHeatmap";
import AttendantAtBirthCrossTabHeatmap from "@/charts/vbac/AttendantAtBirthCrossTabHeatmap";
import InductionOfLaborCrossTabHeatmap from "@/charts/vbac/InductionOfLaborCrossTabHeatmap";
import TimeOfBirthCrossTabHeatmap from "@/charts/vbac/TimeOfBirthCrossTabHeatmap";
import PriorBirthsNowLivingCrossTabHeatmap from "@/charts/vbac/PriorBirthsNowLivingCrossTabHeatmap";
import NumberOfPreviousCesareanCrossTabHeatmap from "@/charts/vbac/NumberOfPreviousCesareanCrossTabHeatmap";
import BMICrossTabHeatmap from "@/charts/vbac/BMICrossTabHeatmap";
import BirthWeightInGramsCrossTabHeatmap from "@/charts/vbac/BirthWeightInGramsCrossTabHeatmap";
import CombinedGestationDetailCrossTabHeatmap from "@/charts/vbac/CombinedGestationDetailCrossTabHeatmap";
import PriorBirthsPreviousCesareanCrossTabHeatmap from "@/charts/vbac/PriorBirthsPreviousCesareanCrossTabHeatmap";
import BirthPlaceCrossTabHeatmap from "@/charts/vbac/BirthPlaceCrossTabHeatmap";
import FetalPresentationAtDeliveryCrossTabHeatmap from "@/charts/vbac/FetalPresentationAtDeliveryCrossTabHeatmap";
import BirthDayOfWeekCrossTabHeatmap from "@/charts/vbac/BirthDayOfWeekCrossTabHeatmap";

export function VBACCharts() {
  const features = [
    "Augmentation of Labor",
    "Attendant at Birth",
    "Induction of Labor",
    "Time of Birth",
    "Number of Previous Cesarean",
    "Birth Place",
    "Combined Gestation Detail (Gestational Age) in Weeks",
    "Prior Births Now Living",
    "Birth Day of Week",
    "Fetal Presentation at Delivery",
    "BMI",
    "Delivery Weight",
    "Birth Weight in Grams",
  ];

  const selectedFeatures = [
    "Augmentation of Labor",
    "Induction of Labor",
    "Number of Previous Cesarean",
    "Combined Gestation Detail (Gestational Age) in Weeks",
    "Prior Births Now Living",
    "Fetal Presentation at Delivery",
    "BMI",
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
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
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
                    {feature}
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="body1">
          Note: We decided not to investigate delivery weight, as it is directly
          factored into BMI. Instead, we chose to investigate Birth Weight in
          Grams, which was not included in the feature importances but may still
          provide valuable insights.
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
        <NumberOfPreviousCesareanCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The more c-sections a mother has had, the less likely she is to have a
          successful VBAC.
        </Typography>
        <BirthPlaceCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          A VBAC is most likely to occur at home when the mother has planned
          ahead for it. However, we do not find these data points to be useful,
          as it's expected that a hospital would be the primary location for a
          c-section, and that other locations would have low rates of
          c-sections.
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
        <BirthDayOfWeekCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Weekdays have a higher rate of c-sections, which is expected due to
          scheduled c-sections.
        </Typography>
        <FetalPresentationAtDeliveryCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Cephalic presentation has the highest VBAC success rate, which is
          expected.
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
        <Typography variant="body1">
          We were also interested in exploring the relationship between prior
          births and previous cesarean sections.
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
      <Card
        variant="elevation"
        sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Conclusion
        </Typography>
        <Typography variant="body1">
          As a result of our analysis, we selected the following features for
          our model:
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
            {selectedFeatures.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
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
                    {feature}
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography variant="body1">
          We chose to eliminate the other features due to a lack of correlation
          with the target, or because they were not actionable (e.g. time of
          birth).
        </Typography>
      </Card>
    </Box>
  );
}
