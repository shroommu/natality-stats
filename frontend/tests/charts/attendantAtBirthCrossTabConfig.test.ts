import { describe, expect, it } from "vitest";

import {
  formatAttendantCrossTabAnnotation,
  formatAttendantCrossTabTooltipBody,
} from "@/charts/vbac/attendantAtBirthCrossTabConfig";

describe("attendantAtBirthCrossTabConfig", () => {
  it("formats counts and proportions for annotations", () => {
    expect(formatAttendantCrossTabAnnotation(422898, "0")).toBe("422,898");
    expect(formatAttendantCrossTabAnnotation(0.1193881291, "proportion")).toBe(
      "11.9%",
    );
  });

  it("formats tooltip bodies", () => {
    expect(formatAttendantCrossTabTooltipBody(1000, "1")).toBe(
      "Birth count: 1,000",
    );
    expect(formatAttendantCrossTabTooltipBody(0.25, "proportion")).toBe(
      "VBAC success rate: 25.00%",
    );
  });
});
