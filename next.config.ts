import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@resvg/resvg-js"],
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
