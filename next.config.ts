import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enables `next export` to generate a fully static site
  output: 'export',
};

export default nextConfig;

