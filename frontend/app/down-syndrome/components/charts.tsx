import { Box, Typography, Card, Grid, List, ListItem } from "@mui/material";

import MothersAgeCrossTabHeatmap from "@/charts/down_syndrome/MothersAgeCrossTabHeatmap";
import BMICrossTabHeatmap from "@/charts/down_syndrome/BMICrossTabHeatmap";
import MothersRaceCrossTabHeatmap from "@/charts/down_syndrome/MothersRaceCrossTabHeatmap";
import MothersHispanicOriginCrossTabHeatmap from "@/charts/down_syndrome/MothersHispanicOriginCrossTabHeatmap";
import CigarettesBeforePregnancyCrossTabHeatmap from "@/charts/down_syndrome/CigarettesBeforePregnancyCrossTabHeatmap";
import PrePregnancyWeightCrossTabHeatmap from "@/charts/down_syndrome/PrePregnancyWeightCrossTabHeatmap";
import PriorBirthsNowLivingCrossTabHeatmap from "@/charts/down_syndrome/PriorBirthsNowLivingCrossTabHeatmap";
import IntervalSinceLastLiveBirthCrossTabHeatmap from "@/charts/down_syndrome/IntervalSinceLastLiveBirthCrossTabHeatmap";
import IntervalSinceLastPregnancyCrossTabHeatmap from "@/charts/down_syndrome/IntervalSinceLastPregnancyCrossTabHeatmap";
import PriorOtherTerminationsCrossTabHeatmap from "@/charts/down_syndrome/PriorOtherTerminationsCrossTabHeatmap";
import FathersAgeCrossTabHeatmap from "@/charts/down_syndrome/FathersAgeCrossTabHeatmap";
import FathersRaceCrossTabHeatmap from "@/charts/down_syndrome/FathersRaceCrossTabHeatmap";
import FathersHispanicOriginCrossTabHeatmap from "@/charts/down_syndrome/FathersHispanicOriginCrossTabHeatmap";

export function DownSyndromeCharts() {
  const features = [
    "Mother's Age",
    "Mother's BMI",
    "Mother's Race",
    "Mother's Hispanic Origin",
    "Cigarettes Before Pregnancy",
    "Pre-pregnancy Weight",
    "Prior Births Now Living",
    "Intervals Since Last Birth/Pregnancy",
    "Prior Terminations",
    "Father's Age",
    "Father's Race",
    "Father's Hispanic Origin",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          selection, we removed features related to pre-natal care and delivery,
          focusing instead on pre-pregnancy vitals and parental demographics.
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
          That narrowed down our feature set to 23. Of those, we selected the
          following to investigate further:
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
          Proportion column, we were able to determine the rate at which a baby
          was born with Down Syndrome.
        </Typography>
        <MothersAgeCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          As the mother's age increases, so does the likelihood of Down
          syndrome.
        </Typography>
        <FathersAgeCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Similarly, the likelihood of Down syndrome increases with the father's
          age.
        </Typography>
        <IntervalSinceLastLiveBirthCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The longer a couple waits between having one child and the next, the
          higher the likelihood of Down syndrome. However, this likely has a
          high correlation with parental age, so we will not include it in the
          final model.
        </Typography>
        <IntervalSinceLastPregnancyCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Similarly, the longer a couple waits between pregnancies, the higher
          the likelihood of Down syndrome. However, this likely has a high
          correlation with parental age, so we will not include it in the final
          model.
        </Typography>
        <PriorOtherTerminationsCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Number of prior terminations appears to have some bearing on Down
          syndrome rates, but the data does not distinguish between miscarriages
          and voluntary terminations. This feature would be more relevant to our
          model if it only encompassed voluntary terminations. As it is, we will
          not include it.
        </Typography>
        <PriorBirthsNowLivingCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Similarly to our "interval between" features, number of prior births
          appears to have a positive relationship with Down syndrome rates.
          However, this is likely due to increased parental age with higher
          numbers of births.
        </Typography>
        <BMICrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Largely, BMI does not appear to have any bearing on Down syndrome
          rates.
        </Typography>
        <PrePregnancyWeightCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          The same can be said of pre-pregnancy weight.
        </Typography>
        <CigarettesBeforePregnancyCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Cigarette use before pregnancy does not appear to have a strong
          relationship with Down syndrome rates.
        </Typography>
        <MothersRaceCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Down syndrome rates appear highest among the AIAN population, though
          research indicates that this is due to cultural factors rather than
          genetic. The same can be said of the lower rate amoung the Asian
          population.
        </Typography>
        <MothersHispanicOriginCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          Similarly, Down sydrome rates are higher in the Hispanic population
          due to cultural factors.
        </Typography>
        <FathersRaceCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          We see the same trends with the father's race as with the mother's.
        </Typography>
        <FathersHispanicOriginCrossTabHeatmap />
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontSize: 14 }}
          align="center"
        >
          And the same with the father's Hispanic origin.
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
          By visualizing our raw data and comparing relative proportions of down
          syndrome presence among the various factors, we can conclude the
          following:
        </Typography>
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
            Mother's age appears to be the top predictor, with increased age
            resulting in increased probability of Down syndrome in the infant.
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "list-item",
              py: 0.25,
              minHeight: 0,
            }}
            component="div"
          >
            Father's age is a close second for top predictor, with the same
            indication.
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "list-item",
              py: 0.25,
              minHeight: 0,
            }}
            component="div"
          >
            Hispanic origin has some bearing on Down syndrome rates, but
            research indicates this is largely due to social reasons rather than
            genetic factors. Hispanic mothers are more likely to concieve at
            higher ages, and Hispanic parents are less likely to voluntarily
            terminate when genetic screening indicates a high likelihood of Down
            syndrome.
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "list-item",
              py: 0.25,
              minHeight: 0,
            }}
            component="div"
          >
            Those of American Indian or Alaska Native descent also have a higher
            rate of Down syndrome, for similar reasons as parents of Hispanic
            origin.
          </ListItem>
        </List>
        <Typography variant="body1">
          Of our other features available, none indicate a strong increase in
          Down syndrome rates. Therefore, our final model was trained only on
          the parents' ages.
        </Typography>
      </Card>
    </Box>
  );
}
