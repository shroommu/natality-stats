import { describe, expect, it } from "vitest";

import {
  formatVbacCrossTabAnnotation,
  formatVbacCrossTabTooltipBody,
} from "@/charts/vbac/vbacCrossTabFormatters";

describe("vbacCrossTabFormatters", () => {
  it("formats counts and proportions for annotations", () => {
    expect(formatVbacCrossTabAnnotation(422898, "0")).toBe("422,898");
    expect(formatVbacCrossTabAnnotation(11.93881291, "proportion")).toBe(
      "11.9%",
    );
  });

  it("formats tooltip bodies", () => {
    expect(formatVbacCrossTabTooltipBody(1000, "1")).toBe(
      "Birth count: 1,000",
    );
    expect(formatVbacCrossTabTooltipBody(25.0, "proportion")).toBe(
      "VBAC success rate: 25.00%",
    );
  });
});
