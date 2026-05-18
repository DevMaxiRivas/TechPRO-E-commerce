import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Set to false to disable the dev filesystem cache
    turbopackFileSystemCacheForDev: false,
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:1337"]
    }
  },
  images: {
    dangerouslyAllowSVG: true, // If using SVGs
    dangerouslyAllowLocalIP: true, // This allows private/local IP addresses
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_STORAGE_SERVICE}/uploads/**`)
      // {
      //   protocol: 'http',
      //   hostname: 'techpro_strapi',
      //   port: '1337',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

export default nextConfig;
