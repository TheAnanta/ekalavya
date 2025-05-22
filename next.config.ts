import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/codelabs/:slug",
        destination: "/codelabs/:slug.html",
      }
    ]
  },
  /* config options here */
};

export default nextConfig;
