import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the Microsoft Dev Tunnel (e.g. r4fb58rx-3001.uks1.devtunnels.ms) load dev assets and live reload.
  allowedDevOrigins: ["**.devtunnels.ms"],
  // Visitors on the tunnel shouldn't see the Next.js dev badge.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
