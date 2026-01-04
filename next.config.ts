import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = "Robot-Arm-Manipulator";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  output: 'export',

  images: {
    unoptimized: true,
  },

  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};

export default nextConfig;