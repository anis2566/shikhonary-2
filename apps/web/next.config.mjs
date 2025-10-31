import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig = {
  transpilePackages: [
  "@workspace/db",
  "@workspace/ui",
  "@workspace/api",
  "@workspace/auth",
  "@workspace/schema",
  "@workspace/env",
  ],

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { isServer }) => {
    // Server-side: Add Prisma plugin
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    // Client-side: Add fallbacks for Firebase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;