import { describe, expect, it } from "vitest";

import * as Components from "@/components/index";

describe("components barrel exports", () => {
  it("exports reusable component modules", () => {
    expect(Components.Tabs).toBeDefined();
  });
});
