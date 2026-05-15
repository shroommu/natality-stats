/** Crosstab columns: unsuccessful VBAC (0), successful (1), computed proportion. */
export const VBAC_OUTCOME_COLUMN_KEYS = ["0", "1", "proportion"] as const;

export const VBAC_OUTCOME_COLUMN_LABELS: Record<string, string> = {
  "0": "No",
  "1": "Yes",
  proportion: "Proportion",
};

export const LABOR_BINARY_ROW_LABELS: Record<string, string> = {
  "0.0": "No",
  "1.0": "Yes",
};

export function formatVbacCrossTabAnnotation(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `${value.toFixed(1)}%`;
  }
  return Math.round(value).toLocaleString();
}

export function formatVbacCrossTabTooltipBody(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `VBAC success rate: ${value.toFixed(2)}%`;
  }
  return `Birth count: ${Math.round(value).toLocaleString()}`;
}

export function formatIntegerAnnotation(value: number): string {
  return Math.round(value).toLocaleString();
}

export function formatSuccessfulVbacSumTooltip(value: number): string {
  return `Successful VBAC (sum): ${Math.round(value).toLocaleString()}`;
}
