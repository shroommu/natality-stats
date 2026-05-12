"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const AVAILABLE_YEARS = [2021, 2022, 2023, 2024] as const;
export type DataYear = (typeof AVAILABLE_YEARS)[number];

const STORAGE_KEY = "natality-stats-year";
export const DEFAULT_DATA_YEAR: DataYear = 2024;

function isDataYear(value: number): value is DataYear {
  return (AVAILABLE_YEARS as readonly number[]).includes(value);
}

type YearContextValue = {
  year: DataYear;
  setYear: (y: DataYear) => void;
};

const YearContext = createContext<YearContextValue | null>(null);

type YearProviderProps = {
  children: ReactNode;
  /** Used in tests to avoid reading localStorage */
  initialYear?: DataYear;
};

export function YearProvider({ children, initialYear }: YearProviderProps) {
  const [year, setYearState] = useState<DataYear>(
    initialYear ?? DEFAULT_DATA_YEAR,
  );

  useEffect(() => {
    if (initialYear !== undefined) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) return;
      const parsed = Number(stored);
      if (isDataYear(parsed)) setYearState(parsed);
    } catch {
      /* ignore */
    }
  }, [initialYear]);

  const setYear = useCallback((y: DataYear) => {
    setYearState(y);
    try {
      localStorage.setItem(STORAGE_KEY, String(y));
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ year, setYear }), [year, setYear]);

  return (
    <YearContext.Provider value={value}>{children}</YearContext.Provider>
  );
}

export function useSelectedYear() {
  const ctx = useContext(YearContext);
  if (!ctx) {
    throw new Error("useSelectedYear must be used within YearProvider");
  }
  return ctx;
}
