import { HoverFooter } from '@/components/hover-footer';
import { DevtoolsBlocker } from '@/components/shared/devtools-blocker';
import Navbar from '@/components/shared/navbar';
import { GlobalContactSheet } from '@/components/shared/global-contact-sheet';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { seo } from '@/constants';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

import { LazyAnalytics } from '@/components/analytics';
import { LazyWhatsappWidget } from '@/components/lazy-components';
import VercelProducts from '@/components/vercel-products';
import AOSProvider from '@/providers/aos-provider';
import ScrollToTop from '@/components/scroll-to-top';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

const fontHeading = Cormorant_Garamond({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  applicationName: 'Ascent Wealth App',
  authors: [
    { name: 'Abhijit K.', url: 'https://abhijitdev.tech' },
    {
      name: 'Shobana R.',
      url: 'https://leanitech.com',
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  creator: 'Abhijit K.',
  publisher: 'Ascent Wealth',
  metadataBase: 'https://www.ascentwealth.in',
  alternates: {
    canonical: 'ascentwealth.in',
  },
  openGraph: {
    determiner: 'the',
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Ascent Wealth',
      },
    ],
    phoneNumbers: ['+917305953668'],
    emails: ['info@ascentwealth.in', 'ascentwealth.invest@gmail.com'],
    siteName: 'Ascent Wealth',
    locale: 'en_US',
    alternateLocale: ['en-IN', 'hi-IN'],
    type: 'website',
    videos: ['https://www.youtube.com/embed/RKicpV2qvZU'],
    url: 'https://www.ascentwealth.in',
    countryName: 'India',
    ttl: 86400,
  },
  abstract:
    'Ascent Wealth - Your Trusted Partner in Financial Growth and Investment Solutions.',
  category: 'Finance',
  classification: 'Business',
  appLinks: {
    web: {
      url: 'https://www.ascentwealth.in',
      should_fallback: true,
    },
  },
  verification: {
    google: 'UewwuDpvYm-5Y9gRE5o7TRE1G3FNr8kfEN69qi7tsm4',
    // yandex: 'yandex-verification=abc123',
    // other: {
    //   'facebook-domain-verification': 'abc123',
    // },
  },
};

const isDev = process.env.NODE_ENV === 'development';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-scroll-behavior='smooth' suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <AOSProvider>
            {!isDev ? <DevtoolsBlocker /> : null}
            <NuqsAdapter>
              <Suspense fallback={null}>
                <Navbar />
                <GlobalContactSheet />
              </Suspense>
              {children}
              <HoverFooter />
            </NuqsAdapter>
            <Toaster richColors closeButton position='top-center' />
          </AOSProvider>
          <LazyWhatsappWidget />
          <ScrollToTop />
        </ThemeProvider>
        <VercelProducts />
        <LazyAnalytics />
      </body>
    </html>
  );
}
