/** Crosstab columns: no Down syndrome (0), present, pending, computed proportion. */
export const DOWN_SYNDROME_COLUMN_KEYS = [
  "0.0",
  "1.0",
  "2.0",
  "proportion",
] as const;

export const DOWN_SYNDROME_COLUMN_LABELS: Record<string, string> = {
  "0.0": "No",
  "1.0": "Confirmed",
  "2.0": "Diagnosis Pending",
  proportion: "Proportion Confirmed",
};

export function formatDownSyndromeCrossTabAnnotation(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `${value.toFixed(2)}%`;
  }
  return Math.round(value).toLocaleString();
}

export function formatDownSyndromeCrossTabTooltipBody(
  value: number,
  columnKey: string,
): string {
  if (columnKey === "proportion") {
    return `Down syndrome rate: ${value.toFixed(2)}%`;
  }
  return `Birth count: ${Math.round(value).toLocaleString()}`;
}

export function defaultDownSyndromeRowLabel(key: string): string {
  if (/^\(\s*[^,]+\s*,\s*[^\]]+\]$/.test(key)) {
    return key.replace("(", "").replace("]", "").replace(",", " - ").trim();
  }
  return key;
}

export function getDownSyndromeRowKeysInOrder(
  data: Record<string, Record<string, number>> | null,
): string[] {
  if (!data) return [];

  for (const columnKey of DOWN_SYNDROME_COLUMN_KEYS) {
    const column = data[columnKey];
    if (column) return Object.keys(column);
  }

  return [];
}

export function buildDownSyndromeRowLabels(
  rowKeysInOrder: string[],
  rowLabels?: Record<string, string>,
): Record<string, string> {
  return rowKeysInOrder.reduce(
    (acc, rowKey) => {
      acc[rowKey] = rowLabels?.[rowKey] ?? defaultDownSyndromeRowLabel(rowKey);
      return acc;
    },
    {} as Record<string, string>,
  );
}

export const RACE_6_ROW_LABELS: Record<string, string> = {
  "1": "White",
  "2": "Black",
  "3": "American Indian / Alaska Native",
  "4": "Asian",
  "5": "Native Hawaiian / Pacific Islander",
  "6": "More than one race",
};
