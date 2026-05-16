import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  Link,
} from "@mui/material";

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

  const selectedFeatures = ["Mother's Age", "Father's Age"];

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
          dataset to identify the top predictors of a baby with Down Syndrome.
        </Typography>
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
          That narrowed down our feature set to 25. Of those, we selected the
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
            AIAH race also has a higher rate of Down syndrome, for similar
            reasons as parents of Hispanic origin.
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
            Cigarettes prior to pregnancy indicates a slight increase in Down
            syndrome rates, but not enough to indicate a strong correlation.
          </ListItem>
        </List>
        <Typography variant="body1">
          Of our other features available, none indicate a strong increase in
          Down syndrome rates. Therefore, our final model will be trained only
          on the parents' ages.
        </Typography>
      </Card>
    </Box>
  );
}
