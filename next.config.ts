import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'cdn.jsdelivr.net',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
