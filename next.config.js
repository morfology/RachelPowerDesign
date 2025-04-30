const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. @MP Reenable later!
    // ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
