import type { DataYear } from "@/lib/yearContext";

/** Down syndrome cross-tab JSON under `public/data/{year}/down_syndrome/` is published for 2021 only. */
export const DOWN_SYNDROME_JSON_DATA_YEAR = 2021 as const satisfies DataYear;
