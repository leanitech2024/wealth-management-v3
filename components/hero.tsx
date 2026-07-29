'use client';

import { BackgroundPattern } from '@/components/extends/background-pattern';
import Link from 'next/link';
import { AuroraText } from './extends/aurora-text';
import { LazyBrochureDownload } from './lazy-components';
import { ShadCNShinyButton } from './extends/shadcn-shiny-btn';
import { buttonVariants } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowUpRight, Star } from 'lucide-react';
import ResponsiveButton from './shared/responsive-button';

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center px-6'>
      <BackgroundPattern />

      <div className='relative z-10 text-center max-w-3xl space-y-4 md:space-y-6'>
        <h1 className='font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter'>
          <span data-aos='flip-up' className='animate-hero-breathe'>
            <AuroraText
              colors={['#7c6707', '#c5b984', '#968021', '#dcd5b5']}
              speed={2}>
              Ascent Wealth
            </AuroraText>
          </span>
          <br />{' '}
          <span className='font-sans'>Welcomes You!</span>
        </h1>
        <p className='font-sans text-sm md:text-base lg:text-lg text-foreground/80'>
          Build your wealth with expert guidance. We offer mutual funds, bonds,
          insurance, and personalized investment solutions tailored to help you
          achieve your financial goals.
        </p>
        <div className='mt-12 flex flex-wrap items-center justify-center gap-4'>
          <ResponsiveButton
            asChild
            className='rounded-full! h-11! md:h-12! cursor-pointer flex! items-center! justify-center! py-0!'>
            <Link scroll={true} href='#free-consultation'>
              Take a free consultation
            </Link>
          </ResponsiveButton>
          <LazyBrochureDownload />
          <ResponsiveButton
            asChild
            className='rounded-full! h-11! md:h-12! cursor-pointer flex! items-center! justify-center! py-0! gap-2!'>
            <Link scroll={true} href='#testimonials'>
              <Star className='h-5! w-5! fill-yellow-400 stroke-yellow-400' /> Google Review
            </Link>
          </ResponsiveButton>
        </div>
      </div>
    </section>
  );
}
