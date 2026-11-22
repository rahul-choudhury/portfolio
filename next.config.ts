import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
    optimizePackageImports: ["@phosphor-icons/react"],
    // @rahul-choudhury/ui is linked from ../ui while it's developed locally.
    // Turbopack only follows symlinks out of the project into extra roots.
    turbopackAdditionalRoots: {
      ui: { path: "../ui" },
    },
  },
  turbopack: {
    // The linked library would otherwise bundle its own dev copy of this
    // peer dependency from ../ui/node_modules, next to the app's.
    resolveAlias: {
      "@base-ui/react/*": "./node_modules/@base-ui/react/*/index.mjs",
    },
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
