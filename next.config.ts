import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Set to false to disable the dev filesystem cache
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    dangerouslyAllowSVG: true, // If using SVGs
    dangerouslyAllowLocalIP: true, // This allows private/local IP addresses
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/**`)],
  },
};

export default nextConfig;
