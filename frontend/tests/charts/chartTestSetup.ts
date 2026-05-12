import { afterEach, beforeEach, vi } from "vitest";

/** Mock GET JSON for chart components that fetch from `/data/:year/:file`. */
export function setupChartJsonFetch(data: unknown) {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        ),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
