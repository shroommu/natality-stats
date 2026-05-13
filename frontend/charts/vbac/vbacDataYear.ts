import type { DataYear } from "@/lib/yearContext";

/** VBAC extract JSON under `public/data/{year}/vbac/` is published for 2021 only. */
export const VBAC_JSON_DATA_YEAR = 2021 as const satisfies DataYear;
