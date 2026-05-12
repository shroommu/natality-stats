import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

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
    { id: 13, name: "Mothers Height in Inches" },
    { id: 14, name: "Mothers Single Year Age" },
    { id: 15, name: "Fathers Combined Age" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Card
        variant="elevation"
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Data Exploration
        </Typography>
        <Typography variant="body1" gutterBottom>
          In creating a prediction model, our first step was to analyze the
          dataset to identify the top predictors of a successful VBAC.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The 2021 natality dataset is composed of over 3.5 million births, but
          not all of those births were from mothers who had previously had a
          c-section. Therefore, our first step in filtering our data was to
          select only those mothers. We were then left with a subset of about
          550,000 births.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Within that subset, we discovered the following statistic:
        </Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Card variant="elevation" sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Repeat C-Section Rate
          </Typography>
          <Typography variant="body1" gutterBottom>
            85.8%
          </Typography>
        </Card>
        <Card variant="elevation" sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            VBAC Success Rate
          </Typography>
          <Typography variant="body1" gutterBottom>
            14.2%
          </Typography>
        </Card>
      </Box>
      <Card variant="elevation" sx={{ p: 2, flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Feature Selection
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our dataset contained over 100 features, not all of which we believed
          would be relevant to our model. For our first pass on feature
          selection, we removed any features related to data collected about the
          mother and newborn after the completion of labor.
        </Typography>
        <Typography variant="body1" gutterBottom>
          To further refine our feature selection, we trained a Random Forest
          classifier using our filtered dataset, then used the{" "}
          feature_importances_ attribute to obtain a list of features that would
          be worth exploring further.
        </Typography>
        <Typography variant="body1" gutterBottom>
          That provided us with the following list of features, in order of
          importance:
        </Typography>

        <Grid container spacing={2}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 6 }} key={feature.id}>
              <List dense sx={{ listStyleType: "disc", pl: 4 }} component="div">
                <ListItem sx={{ display: "list-item" }} component="div">
                  {feature.name}
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
