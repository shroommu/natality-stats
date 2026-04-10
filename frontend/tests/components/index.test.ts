import { describe, expect, it } from "vitest";

import * as Components from "@/components";

describe("components barrel exports", () => {
  it("exports reusable component modules", () => {
    expect(Components.Badge).toBeDefined();
    expect(Components.Button).toBeDefined();
    expect(Components.Card).toBeDefined();
    expect(Components.ChartCard).toBeDefined();
    expect(Components.DataTable).toBeDefined();
    expect(Components.Input).toBeDefined();
    expect(Components.Select).toBeDefined();
  });
});
