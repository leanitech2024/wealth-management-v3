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
import { Blockquote, BlockquoteAuthor } from './extends/blockquote';

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

  const ascentPlanningService = services.find(
    (s) => s.title === "It's Time To Begin Your Ascent!"
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
      <div className='w-full h-full rounded-xl lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] mx-auto'>
        <div className={'w-full h-fit flex items-center justify-center'}>
          <Image
            src={plan.image}
            alt='default pixel transition content, a cat!'
            width={500}
            height={500}
            className='w-full h-auto object-contain overflow-hidden rounded-xl'
          />
        </div>
      </div>
      <div className='basis-1/2 shrink-0 flex flex-col justify-center h-full'>

        <h3 className='my-3 xl:my-4 2xl:my-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-3xl font-semibold tracking-[-0.02em] leading-tight xl:leading-tight 2xl:leading-tight'>
          {plan.title}
        </h3>
        {plan.quote && (
          <Blockquote size='sm' className='my-1 xl:my-2 2xl:my-3'>
            {plan.quote}
            {plan.quoteAuthor && (
              <BlockquoteAuthor>{plan.quoteAuthor}</BlockquoteAuthor>
            )}
          </Blockquote>
        )}
        <p className='text-muted-foreground text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed lg:leading-loose xl:leading-loose 2xl:leading-loose'>
          {plan.details}
        </p>
        {!isLast ? (
          plan.category === 'Smart Investing' && goalPlanningService ? (
            <ServiceDrawer
              {...goalPlanningService}
              triggerVariant='default'
              triggerClassName='mt-6 xl:mt-8 2xl:mt-10 rounded-full gap-3 xl:text-lg xl:py-6 xl:px-8 xl:h-12 2xl:text-xl 2xl:py-7 2xl:px-10 2xl:h-14'
              triggerText='Know more'
              showIcon={true}
            />
          ) : plan.category === 'Dream Planning' && ascentPlanningService ? (
            <ServiceDrawer
              {...ascentPlanningService}
              triggerVariant='default'
              triggerClassName='mt-6 xl:mt-8 2xl:mt-10 rounded-full gap-3 xl:text-lg xl:py-6 xl:px-8 xl:h-12 2xl:text-xl 2xl:py-7 2xl:px-10 2xl:h-14'
              triggerText='Know more'
              showIcon={true}
            />
          ) : (
            <ResponsiveButton
              data-aos='fade-right'
              asChild
              className='mt-6 xl:mt-8 2xl:mt-10 rounded-full gap-3 xl:text-lg xl:py-6 xl:px-8 xl:h-12 2xl:text-xl 2xl:py-7 2xl:px-10 2xl:h-14'>
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
            className='w-full h-full object-contain'
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
