import { withContentCollections } from '@content-collections/next';
// import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlaiceholder from '@plaiceholder/next';
import type { NextConfig } from 'next';

// const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedEnv: true,
    // turbopackFileSystemCacheForDev: isDev,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  turbopack: {
    root: process.cwd(),
  },
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: '/ascentwealth.in',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      // it will allow images from all external domains
      // {
      //   protocol: 'https',
      //   hostname: '**',
      //   port: '',
      //   pathname: '/**',
      // },

      // allow images from res.cloudinary.com/dxgckfhti
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dxgckfhti/**',
        port: '',
      },

      // allow images from images.unsplash.com
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
        port: '',
      },

      // allow images from lh3.googleusercontent.com
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
        port: '',
      },
    ],
  },
};

//usage of withBundleAnalyzer
// const withAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: isDev,
// });

// export default nextConfig;
export default withContentCollections(withPlaiceholder(nextConfig));
