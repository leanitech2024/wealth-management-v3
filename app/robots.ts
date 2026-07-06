import type { MetadataRoute } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const BASE_URL = isDev
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ascentwealth.in');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
