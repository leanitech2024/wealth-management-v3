'use client';

import { BackgroundPattern } from '@/components/extends/background-pattern';
import Link from 'next/link';
import { AuroraText } from './extends/aurora-text';
import { LazyConsultationDialog } from './forms/lazy-components';
import { LazyBrochureDownload, LazyLocationDialog } from './lazy-components';
import { ShadCNShinyButton } from './extends/shadcn-shiny-btn';
import { buttonVariants } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center px-6'>
      <BackgroundPattern />

      <div className='relative z-10 text-center max-w-3xl space-y-4 md:space-y-6'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter'>
          <span data-aos='flip-up'>
            <AuroraText
              colors={['#7c6707', '#c5b984', '#968021', '#dcd5b5']}
              speed={2}>
              Ascent Wealth
            </AuroraText>
          </span>
          <br />{' '}
          <span>Welcomes You!</span>
        </h1>
        <p className='text-sm md:text-base lg:text-lg text-foreground/80'>
          Build your wealth with expert guidance. We offer mutual funds, bonds,
          insurance, and personalized investment solutions tailored to help you
          achieve your financial goals.
        </p>
        <div className='mt-12 flex flex-wrap items-center justify-center gap-4'>
          <LazyConsultationDialog />
          <LazyBrochureDownload />
          <LazyLocationDialog />
        </div>
      </div>
    </section>
  );
}
