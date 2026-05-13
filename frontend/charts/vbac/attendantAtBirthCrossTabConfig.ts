/**
 * Labels for attendant-at-birth codes (NCHS), matching
 * `02_visualizations.ipynb` yticklabels for the attendant crosstab heatmap.
 */
export const ATTENDANT_AT_BIRTH_ROW_KEYS = ["1", "2", "3", "4", "5"] as const;

export const ATTENDANT_AT_BIRTH_ROW_LABELS: Record<string, string> = {
  "1": "Doctor (MD)",
  "2": "Doctor (DO)",
  "3": "Midwife (CNM)",
  "4": "Midwife (Other)",
  "5": "Other",
};

/** Crosstab columns: unsuccessful VBAC (0), successful (1), computed proportion. */
export const VBAC_OUTCOME_COLUMN_KEYS = ["0", "1", "proportion"] as const;

export const VBAC_OUTCOME_COLUMN_LABELS: Record<string, string> = {
  "0": "No",
  "1": "Yes",
  proportion: "Proportion",
};

export function formatAttendantCrossTabAnnotation(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `${(value * 100).toFixed(1)}%`;
  }
  return Math.round(value).toLocaleString();
}

export function formatAttendantCrossTabTooltipBody(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `VBAC success rate: ${(value * 100).toFixed(2)}%`;
  }
  return `Birth count: ${Math.round(value).toLocaleString()}`;
}
