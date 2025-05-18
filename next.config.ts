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
  // Removed experimental.appDir flag as it's no longer needed
};

export default nextConfig;










