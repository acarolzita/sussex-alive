import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // No static-export mode. This app uses dynamic NextAuth routes and API handlers,
  // so it must run in a Node environment (SSR/API-ready).
};

export default nextConfig;

