import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
