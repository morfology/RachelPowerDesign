import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://rachelpowerdesign.com',
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap(),
  ],
  output: 'static',
});
