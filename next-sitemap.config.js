/* eslint-disable @typescript-eslint/no-require-imports */
const dynamicConfig = require("./src/config/dynamic.js");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: dynamicConfig.siteUrl,
  generateRobotsTxt: true,
};
