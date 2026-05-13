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

function isCrossTabColumnMajor(value: unknown): value is CrossTabColumnMajor {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const outer = value as Record<string, unknown>;
  const outerKeys = Object.keys(outer);
  if (outerKeys.length === 0) return false;
  for (const col of outerKeys) {
    const inner = outer[col];
    if (inner === null || typeof inner !== "object" || Array.isArray(inner)) {
      return false;
    }
    const rowMap = inner as Record<string, unknown>;
    const rowKeys = Object.keys(rowMap);
    if (rowKeys.length === 0) return false;
    for (const rk of rowKeys) {
      if (typeof rowMap[rk] !== "number" || Number.isNaN(rowMap[rk] as number)) {
        return false;
      }
    }
  }
  return true;
}

export function useChartJsonRecord(filename: string): {
  record: Record<string, number> | null;
  loading: boolean;
  error: string | null;
} {
  const { year } = useSelectedYear();
  const [record, setRecord] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setRecord(null);

    const url = publicDataUrl(year, filename);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Could not load chart data for ${year} (${res.status})`,
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
  }, [year, filename]);

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
        if (!isCrossTabColumnMajor(parsed)) {
          throw new Error("Invalid cross-tab chart data shape");
        }
        if (!cancelled) setData(parsed);
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
