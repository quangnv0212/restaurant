import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        hostname: 'api-bigboy.duthanhduoc.com',
        pathname: '/**',
      },
      {
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
