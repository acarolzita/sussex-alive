// next.config.ts
import path from "path";

const nextConfig = {
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname); // ✅ Tell Webpack what "@" means
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;





