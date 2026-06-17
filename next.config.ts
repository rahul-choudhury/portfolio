import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  transpilePackages: ["next-mdx-remote"],
}

export default nextConfig
