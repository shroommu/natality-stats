import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "https://natality-stats-backend.vercel.app/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
