"use client";

import { useEffect, useState } from "react";

import { useSelectedYear } from "@/lib/yearContext";

export function publicDataUrl(year: number, filename: string) {
  const path = `/data/${year}/${filename}`;
  return path;
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
