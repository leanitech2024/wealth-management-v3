import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
// import { useInView } from 'react-intersection-observer';

import { plannings, services } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LazyPixelTransition } from './extends/lazy-components';
import { LazyRiskProfileDialog } from './forms/lazy-components';
import ResponsiveButton from './shared/responsive-button';
import ServiceDrawer from './service-drawer';

export default function PlanningCard({
  plan,
  idx,
}: {
  plan: (typeof plannings)[0];
  idx: number;
}) {
  // find the last index
  const isLast = idx === plannings.length - 1;

  const isSecondLast = idx === plannings.length - 2;

  const goalPlanningService = services.find(
    (s) => s.title === 'Goal Based Financial Planning'
  );

  return (
    <div
      data-aos={
        isLast
          ? 'fade-right'
          : isSecondLast
            ? 'fade-left'
            : idx % 2 === 0
              ? 'fade-right'
              : 'fade-left'
      }
      data-aos-duration='700'
      // data-aos-easing='linear'
      data-aos-easing='ease-in-sine'
      key={plan.category}
      className={cn(
        'flex flex-col md:flex-row items-center gap-x-12 gap-y-6',
        // plan.direction === 'left'
        //   ? 'md:even:flex-row-reverse'
        //   : 'md:odd:flex-row-reverse',
        'md:even:flex-row-reverse',
      )}>
      <div className='w-full h-full rounded-xl'>
        <div className={'aspect-square w-full h-full'}>
          <Image
            src={plan.image}
            alt='default pixel transition content, a cat!'
            width={500}
            height={500}
            className='w-full h-full object-cover overflowHidden rounded-xl'
          />
        </div>
      </div>
      <div className='basis-1/2 shrink-0'>
        <span className='uppercase font-medium text-xs md:text-sm text-muted-foreground'>
          {plan.category}
        </span>
        <h3 className='my-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.02em]'>
          {plan.title}
        </h3>
        <p className='text-muted-foreground text-sm md:text-base'>
          {plan.details}
        </p>
        {!isLast ? (
          plan.category === 'Smart Investing' && goalPlanningService ? (
            <ServiceDrawer
              {...goalPlanningService}
              triggerVariant='default'
              triggerClassName='mt-6 rounded-full gap-3'
              triggerText='Know more'
              showIcon={true}
            />
          ) : (
            <ResponsiveButton
              data-aos='fade-right'
              asChild
              className='mt-6 rounded-full gap-3'>
              <Link scroll={true} href={plan.tutorialLink} aria-label={`Learn more about ${plan.title}`}>
                Learn More <ArrowRightIcon />
              </Link>
            </ResponsiveButton>
          )
        ) : (
          <LazyRiskProfileDialog />
        )}
      </div>
    </div>
  );
}

export function PlanningAnimatedImage({
  plan,
}: {
  plan: (typeof plannings)[0];
}) {
  return (
    <div className='w-full h-full rounded-xl border border-primary/50'>
      {/* <LazyPixelImage
          ref={ref}
          src={plan.image}
          customGrid={{ rows: 8, cols: 8 }}
          grayscaleAnimation
          inView={inView}
        /> */}
      <LazyPixelTransition
        firstContent={
          // <img
          //   src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
          //   alt='default pixel transition content, a cat!'
          //   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          // />
          <Image
            src={plan.image}
            alt='default pixel transition content, a cat!'
            width={500}
            height={500}
            className='w-full h-full object-cover'
          />
        }
        secondContent={
          <div
            // style={{
            //   width: '100%',
            //   height: '100%',
            //   display: 'grid',
            //   placeItems: 'center',
            //   backgroundColor: '#111',
            // }}
            className={'bg-white w-full h-full grid place-items-center'}>
            <p
              className='text-xl font-extrabold text-muted-foreground'
              // style={{ fontWeight: 900, fontSize: '3rem', color: '#ffffff' }}
            >
              {plan.title}
            </p>
          </div>
        }
        gridSize={50}
        pixelColor='#dcd5b5'
        once={false}
        animationStepDuration={0.4}
        className='custom-pixel-card'
      />
    </div>
  );
}
