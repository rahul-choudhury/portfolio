import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.onamp.dev"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
