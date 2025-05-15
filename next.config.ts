import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true, // <-- Important for Next.js 13+ App Router support
  },
};

export default nextConfig;









