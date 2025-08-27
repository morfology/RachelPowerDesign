/* eslint-disable @typescript-eslint/no-require-imports */
const dynamicConfig = require("./src/config/dynamic.js");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: dynamicConfig.siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Single sitemap file for better control
  
  // Exclude development and utility pages
  exclude: [
    '/elements',
    '/tags/sitemap.xml',
    '/categories/sitemap.xml',
    '/projects/sitemap.xml'
  ],

  // Transform function to set custom priorities and change frequencies
  transform: async (config, path) => {
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Core service and contact pages - very high priority
    if (['/contact', '/services'].includes(path)) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Individual service pages - very high priority
    if (path.startsWith('/services/') && path !== '/services') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // About, Projects index, Gallery - high priority
    if (['/about', '/projects', '/gallery'].includes(path)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Individual project pages - medium-high priority
    if (path.startsWith('/projects/') && !path.includes('/page/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    // Category and tag index pages - medium priority
    if (['/categories', '/tags'].includes(path)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // Individual category pages - medium priority
    if (path.startsWith('/categories/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      }
    }

    // Individual tag pages - lower priority
    if (path.startsWith('/tags/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      }
    }

    // Legal/utility pages - low priority
    if (['/privacy-policy', '/cookies'].includes(path)) {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      }
    }

    // Pagination pages - lowest priority
    if (path.includes('/page/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.1,
        lastmod: new Date().toISOString(),
      }
    }

    // Default for any other pages
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },

  // Enhanced robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/elements', '/.tmp', '/api']
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/'
      }
    ],
    additionalSitemaps: []
  }
};
