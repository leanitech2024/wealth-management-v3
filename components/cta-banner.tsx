import { cn } from '@/lib/utils';
import { LazyAnimatedGridPattern } from './extends/animated-grid-pattern';
import { LazyConsultationDialog } from './forms/lazy-components';

export default function CTABanner() {
  return (
    <section
      id='free-consultation'
      className='max-w-(--breakpoint-xl) mx-auto w-full px-4 sm:px-6 py-10'>
      <div className='dark:border relative overflow-hidden dark:bg-background text-foreground rounded-2xl px-6 md:px-14 py-12 md:py-16 w-full flex flex-col items-center justify-center'>
        <LazyAnimatedGridPattern
          numSquares={90}
          maxOpacity={0.1}
          duration={10}
          className={cn(
            'mask-[radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]',
            'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
          )}
        />
        <LazyAnimatedGridPattern
          numSquares={90}
          maxOpacity={0.1}
          duration={10}
          className={cn(
            'mask-[radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]',
            'inset-x-0 inset-y-0 h-[200%] skew-y-12',
          )}
        />
        <div className='relative z-0 flex flex-col gap-3 lg:gap-6 text-center'>
          <h3
            data-aos='flip-down'
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold'>
            Are You Ready to Transform Your Financial Journey?
          </h3>
          <p
            data-aos='flip-up'
            className='text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Let&apos;s transform your financial future together. Get a
            personalized investment strategy tailored to your goals and risk
            comfort in just one conversation.
          </p>
        </div>
        <div
          data-aos='zoom-in'
          className='relative z-0 mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4'>
          <LazyConsultationDialog />
        </div>
      </div>
    </section>
  );
}
