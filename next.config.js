/* eslint-disable @typescript-eslint/no-require-imports */
//const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  trailingSlash: false,
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. @MP Reenable later!
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
