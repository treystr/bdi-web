import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import { getPressSlugPath } from './src/utils/pressSlug.js';
import { getMerchantSlugPath } from './src/utils/merchantSlug.js';

// Get the site URL from environment variable or use a default for local development
const site = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';
const staticSitemapPaths = [
  '/',
  '/news',
  '/merchants',
  '/initiatives/100-local-businesses-by-2026',
];
const toAbsoluteUrl = (path) => new URL(path, site).toString();

async function getNewsSitemapPages() {
  const directusUrl = process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
  if (!directusUrl) return [];

  try {
    const baseUrl = directusUrl.replace(/\/+$/, '');
    const endpoint = new URL('/items/Press', baseUrl);
    endpoint.searchParams.set('fields', 'id,Title,slug,url_slug,Slug,permalink');
    endpoint.searchParams.set('filter[status][_eq]', 'published');
    endpoint.searchParams.set('limit', '-1');

    const headers = {};
    if (process.env.DIRECTUS_STATIC_TOKEN) {
      headers.Authorization = `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`;
    }

    const response = await fetch(endpoint, { headers });
    if (!response.ok) return [];

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];
    return items
      .filter((item) => typeof item?.id === 'number')
      .map((item) => toAbsoluteUrl(getPressSlugPath(item)));
  } catch {
    return [];
  }
}

async function getMerchantSitemapPages() {
  const directusUrl = process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
  if (!directusUrl) return [];

  try {
    const baseUrl = directusUrl.replace(/\/+$/, '');
    const endpoint = new URL('/items/Merchants', baseUrl);
    endpoint.searchParams.set('fields', 'id,Name');
    endpoint.searchParams.set('filter[status][_eq]', 'published');
    endpoint.searchParams.set('limit', '-1');

    const headers = {};
    if (process.env.DIRECTUS_STATIC_TOKEN) {
      headers.Authorization = `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`;
    }

    const response = await fetch(endpoint, { headers });
    if (!response.ok) return [];

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];
    return items
      .filter((item) => typeof item?.id === 'number')
      .map((item) => toAbsoluteUrl(getMerchantSlugPath(item)));
  } catch {
    return [];
  }
}

const newsSitemapPages = await getNewsSitemapPages();
const merchantSitemapPages = await getMerchantSitemapPages();
const staticSitemapPages = staticSitemapPaths.map(toAbsoluteUrl);
const customSitemapPages = [...new Set([...staticSitemapPages, ...newsSitemapPages, ...merchantSitemapPages])];

export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  site,
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "aos/dist/aos.css";`
        }
      }
    },
    optimizeDeps: {
      include: ['aos']
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: [],
      transformers: [],
      showLineNumbers: false,
      lineNumbersPrefix: ''
    }
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'),
      customPages: customSitemapPages,
      entryLimit: 10000,
    }),
  ],
  image: {
    domains: [
      'localhost',
      'directus',
      'cms.bitcoindistrict.org',
    ],
    remotePatterns: [
      {
        protocol: "https"
      },
      {
        protocol: "http"
      }
    ]
  }
});