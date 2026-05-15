"use client";

import { useEffect, useState } from "react";

import {
  useSelectedYear,
  type DataYear,
} from "@/lib/yearContext";

export function publicDataUrl(year: number, filename: string) {
  const path = `/data/${year}/${filename}`;
  return path;
}

/** JSON from `DataFrame.to_json()` with default orient=columns: outer key = column, inner = row index. */
export type CrossTabColumnMajor = Record<string, Record<string, number>>;

/**
 * Parses column-major cross-tab JSON, coercing null cells to 0 (pandas may emit
 * nulls for empty crosstab cells).
 */
export function parseCrossTabColumnMajor(
  value: unknown,
): CrossTabColumnMajor | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const outer = value as Record<string, unknown>;
  const outerKeys = Object.keys(outer);
  if (outerKeys.length === 0) return null;
  const out: CrossTabColumnMajor = {};
  for (const col of outerKeys) {
    const inner = outer[col];
    if (inner === null || typeof inner !== "object" || Array.isArray(inner)) {
      return null;
    }
    const rowMap: Record<string, number> = {};
    const innerObj = inner as Record<string, unknown>;
    const rowKeys = Object.keys(innerObj);
    if (rowKeys.length === 0) return null;
    for (const rk of rowKeys) {
      const v = innerObj[rk];
      if (v === null || v === undefined) {
        rowMap[rk] = 0;
      } else if (typeof v === "number" && !Number.isNaN(v)) {
        rowMap[rk] = v;
      } else {
        return null;
      }
    }
    out[col] = rowMap;
  }
  return out;
}

export function useChartJsonRecord(
  filename: string,
  options?: { dataYear?: DataYear },
): {
  record: Record<string, number> | null;
  loading: boolean;
  error: string | null;
} {
  const { year } = useSelectedYear();
  const effectiveYear = options?.dataYear ?? year;
  const [record, setRecord] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setRecord(null);

    const url = publicDataUrl(effectiveYear, filename);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Could not load chart data for ${effectiveYear} (${res.status})`,
          );
        }
        return res.json() as Promise<Record<string, number>>;
      })
      .then((data) => {
        if (!cancelled) setRecord(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load chart data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [effectiveYear, filename]);

  return { record, loading, error };
}

export function useChartJsonCrossTab(
  filename: string,
  options?: { dataYear?: DataYear },
): {
  data: CrossTabColumnMajor | null;
  loading: boolean;
  error: string | null;
} {
  const { year } = useSelectedYear();
  const effectiveYear = options?.dataYear ?? year;
  const [data, setData] = useState<CrossTabColumnMajor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    const url = publicDataUrl(effectiveYear, filename);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Could not load chart data for ${effectiveYear} (${res.status})`,
          );
        }
        return res.json() as Promise<unknown>;
      })
      .then((parsed) => {
        const normalized = parseCrossTabColumnMajor(parsed);
        if (normalized === null) {
          throw new Error("Invalid cross-tab chart data shape");
        }
        if (!cancelled) setData(normalized);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load chart data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [effectiveYear, filename]);

  return { data, loading, error };
}
