import type { ReactNode } from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


type ChartPoint = {
  label: string;
  value: number;
};


type ChartCardProps = {
  title: string;
  description?: string;
  data: ChartPoint[];
  footer?: ReactNode;
  valueFormatter?: (value: number) => string;
};

export function ChartCard({
  title,
  description,
  data,
  footer,
  valueFormatter = (value) => value.toLocaleString(),
}: ChartCardProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);

  return (
    <MuiCard variant="outlined">
      <CardHeader
        title={title}
        subheader={description}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.map((point) => {
            const widthPercent = Math.max((point.value / maxValue) * 100, 3);
            return (
              <Box
                key={point.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr auto",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  title={point.label}
                >
                  {point.label}
                </Typography>
                <Box sx={{ width: "100%", height: 10, bgcolor: "action.disabledBackground", borderRadius: 5, overflow: "hidden" }}>
                  <Box
                    sx={{
                      width: `${widthPercent}%`,
                      height: "100%",
                      bgcolor: "primary.main",
                      borderRadius: 5,
                      transition: "width 0.3s",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {valueFormatter(point.value)}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {footer ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              {footer}
            </Typography>
          </Box>
        ) : null}
      </CardContent>
    </MuiCard>
  );
}
