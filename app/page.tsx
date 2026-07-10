import Blogs from '@/components/blogs';
import Calculators from '@/components/calculators';
import CompanyLogos from '@/components/company-logos';
import CTABanner from '@/components/cta-banner';
import { Accordion02 } from '@/components/extends/accordion-02';
import { ScrollProgress } from '@/components/extends/scroll-progress';
import Hero from '@/components/hero';
import Planning from '@/components/planning';
import Services from '@/components/services';
import Stats from '@/components/stats';
import TestimonialMarquee from '@/components/testimonial-marquee';

import { FinancialService, WithContext } from 'schema-dts';

const jsonLd: WithContext<FinancialService> = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Ascent Wealth',
  image: 'https://www.ascentwealth.in/Ascent-Wealth-logo-2.png',
  url: 'https://www.ascentwealth.in/',
  description: 'Financial advisory and mutual fund services in Chennai.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    postalCode: '600096',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7305953668',
    contactType: 'customer support',
    email: 'info@ascentwealth.in',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'AMFI Registration',
    identifier: 'ARN-109866',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Association of Mutual Funds in India (AMFI)',
    },
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Planning />
      <Services />
      <Calculators />
      <CTABanner />
      <Blogs />
      <Accordion02 />
      <CompanyLogos />
      <TestimonialMarquee />
      <ScrollProgress />

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
