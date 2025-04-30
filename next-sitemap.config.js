/* eslint-disable @typescript-eslint/no-require-imports */
const siteConfig = require("./src/config/site.js");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteConfig.siteUrl, //process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
};
