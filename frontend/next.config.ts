import type { NextConfig } from "next";
import { withRelatedProject } from "@vercel/related-projects";

const backendHost = withRelatedProject({
  projectName: "natality-stats-backend",
  defaultHost: "https://natality-stats-backend.vercel.app",
});

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:5000/api/:path*",
        },
      ];
    }
    return [
      {
        source: "/api/:path*",
        destination: `${backendHost}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
