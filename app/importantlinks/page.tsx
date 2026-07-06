import type { Metadata } from 'next';
import Banner from '@/components/shared/banner';
import ImportantLinks from '@/components/important-links';
import { CTABlock } from '@/components/shared/cta-block';

export const metadata: Metadata = {
  title: 'Important Links | Ascent Wealth',
  description:
    'A comprehensive directory of important links, including government regulators, securities market bodies, industry associations, and financial institutions in India.',
};

export default function ImportantLinksPage() {
  return (
    <main className="max-w-(--breakpoint-xl) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
      <Banner />
      <ImportantLinks />
      <CTABlock />
    </main>
  );
}
