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
          feature_importances_ attribute to obtain a list of features that would
          be worth exploring further.
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
          target, we created a cross-tabulation chart for each.
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
      </Card>
    </Box>
  );
}
