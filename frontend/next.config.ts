import type { NextConfig } from "next";

const backendBase =
  process.env.BACKEND_PROXY_URL?.replace(/\/$/, "") ??
  "https://natality-stats-backend.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendBase}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
