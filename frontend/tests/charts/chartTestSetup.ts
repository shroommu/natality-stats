import { afterEach, beforeEach, vi } from "vitest";

import { dirname, join } from "node:path";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const chartTestsDir = dirname(fileURLToPath(import.meta.url));
const publicDataRoot = join(chartTestsDir, "../../public/data");

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

/**
 * Serves real files from `frontend/public/data` for `/data/:year/...` URLs
 * (used when a page renders many chart datasets).
 */
export function setupChartJsonFetchFromPublicData() {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.href
              : input.url;
        const match = url.match(/\/data\/(\d{4})\/(.+)$/);
        if (!match) {
          return Promise.resolve(new Response("not found", { status: 404 }));
        }
        const [, year, rest] = match;
        const filePath = join(publicDataRoot, year, rest);
        if (!existsSync(filePath)) {
          return Promise.resolve(new Response("not found", { status: 404 }));
        }
        const body = readFileSync(filePath, "utf8");
        return Promise.resolve(
          new Response(body, {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
