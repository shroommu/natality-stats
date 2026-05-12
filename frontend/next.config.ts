import type { NextConfig } from "next";

/** Backend origin for /api/* proxy. Must be available at build time on Vercel. */
function backendProxyBase(): string {
  const raw = process.env.BACKEND_PROXY_URL?.trim() ?? "";
  const base = raw.replace(/\/$/, "");
  return base || "https://natality-stats-backend.vercel.app";
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
