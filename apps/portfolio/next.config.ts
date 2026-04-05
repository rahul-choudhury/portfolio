import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  transpilePackages: ["@workspace/design-system"],
}

export default nextConfig
