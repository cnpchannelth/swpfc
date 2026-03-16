import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Railway: รองรับ standalone output สำหรับ production
  output: "standalone",
};

export default nextConfig;
