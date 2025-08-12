// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://growth.fawad.ai',
  integrations: [
    mdx(), 
    sitemap({
      filter: (page) => {
        // Filter out draft blog posts in production
        if (import.meta.env.PROD && page.includes('/blog/')) {
          // This will be handled by the content collection filter
          // The sitemap will only include published posts
          return true;
        }
        return true;
      }
    })
  ],
  adapter: vercel(),
});