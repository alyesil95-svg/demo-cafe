import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash food/cafe imagery. remotePatterns is the v16 way (images.domains is deprecated).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
