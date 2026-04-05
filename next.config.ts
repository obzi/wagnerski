import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wagnerski",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
