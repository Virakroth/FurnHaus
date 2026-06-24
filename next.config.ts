import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const apiOrigin = new URL(apiUrl).origin;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(`${apiOrigin}/products/**`),
    ],
  },
};

export default nextConfig;
