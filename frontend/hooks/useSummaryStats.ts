"use client";

import { useEffect, useState } from "react";

import { useSelectedYear } from "@/lib/yearContext";

import { publicDataUrl } from "./useChartJson";

export type YearSummary = {
  totalBirths: number;
  birthRatePer1000: number | null;
  fertilityRatePer1000: number | null;
};

export function useSummaryStats(): {
  summary: YearSummary | null;
  loading: boolean;
  error: string | null;
} {
  const { year } = useSelectedYear();
  const [summary, setSummary] = useState<YearSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSummary(null);

    fetch(publicDataUrl(year, "summary.json"))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not load summary for ${year} (${res.status})`);
        }
        return res.json() as Promise<YearSummary>;
      })
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load summary");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  return { summary, loading, error };
}
