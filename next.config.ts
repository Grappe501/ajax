import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required by @netlify/plugin-nextjs (expects `.next/standalone`).
  output: "standalone",
};

export default nextConfig;
