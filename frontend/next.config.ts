import type { NextConfig } from "next";
import { withRelatedProject } from "@vercel/related-projects";

/** Strip trailing slash and optional `/api` so rewrites do not become `/api/api/...`. */
function normalizeBackendOrigin(raw: string): string {
  let base = raw.trim().replace(/\/+$/, "");
  if (base.endsWith("/api")) {
    base = base.slice(0, -4).replace(/\/+$/, "");
  }
  return base;
}

/**
 * Backend origin for `/api/*` rewrites (baked at build time on Vercel).
 * - Explicit `BACKEND_PROXY_URL` wins (Preview / Production / local).
 * - Otherwise, on Vercel, `withRelatedProject` maps Preview → matching backend
 *   preview URL using `relatedProjects` + `VERCEL_RELATED_PROJECTS`.
 * - Fallback: production backend host.
 */
function backendProxyBase(): string {
  const explicit = process.env.BACKEND_PROXY_URL?.trim() ?? "";
  if (explicit) {
    return normalizeBackendOrigin(explicit);
  }

  const fallback = "https://natality-stats-backend.vercel.app";
  const projectName =
    process.env.BACKEND_VERCEL_PROJECT_NAME?.trim() ||
    "natality-stats-backend";

  const resolved = withRelatedProject({
    projectName,
    defaultHost: fallback,
  });

  return normalizeBackendOrigin(resolved);
}

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendProxyBase()}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
