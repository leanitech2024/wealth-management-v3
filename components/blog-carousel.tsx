'use client';

import { allPosts } from 'content-collections';
import type { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { useCallback, useMemo, useState } from 'react';

// import { useDotButton } from '@/hooks/use-dot-button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

import { useQueryState } from 'nuqs';
import BlogCard from './blog-card';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from './ui/carousel';

const isDev = process.env.NODE_ENV === 'development';

export function BlogCarousel() {
  // const [api, setApi] = useState<EmblaCarouselType>();
  // const plugins = useMemo(
  //   () => (isDev ? undefined : [Autoplay({ playOnInit: true })]),
  //   []
  // );

  // const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
  //   const autoplay = emblaApi?.plugins()?.autoplay;
  //   if (!autoplay) return;

  //   const resetOrStop =
  //     autoplay.options.stopOnInteraction === false
  //       ? autoplay.reset
  //       : autoplay.stop;

  //   resetOrStop();
  // }, []);

  // const isSmall = useMediaQuery('(min-width: 640px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isLarge = useMediaQuery('(min-width: 1536px)');

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
  //   api,
  //   onNavButtonClick
  // );

  const itemsPerView = isLarge ? 3 : isDesktop ? 2 : 1;

  // Desired dots: 3 (lg), 2 (md), 1 (sm)
  // const dotCount = itemsPerView;

  // const groupSize = useMemo(
  //   () => Math.max(1, Math.ceil(scrollSnaps.length / dotCount)),
  //   [scrollSnaps.length, dotCount]
  // );

  // const pageStarts = useMemo(() => {
  //   if (!scrollSnaps.length) return [];
  //   const starts = Array.from({ length: dotCount }, (_, i) =>
  //     Math.min(i * groupSize, scrollSnaps.length - 1)
  //   );
  //   // Remove any duplicates that can happen near the end
  //   return Array.from(new Set(starts));
  // }, [scrollSnaps, dotCount, groupSize]);

  // const activePage = useMemo(() => {
  //   if (!pageStarts.length) return 0;
  //   return Math.min(
  //     pageStarts.length - 1,
  //     Math.floor(selectedIndex / groupSize)
  //   );
  // }, [pageStarts, selectedIndex, groupSize]);

  const OPTIONS: EmblaOptionsType = {
    loop: true,
    slidesToScroll: itemsPerView,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: isDesktop ? 2 : 1,
      },
      '(min-width: 768px)': {
        slidesToScroll: isLarge ? 3 : 2,
      },
    },
  };

  // const posts = allPosts.sort((a, b) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });
  const [sortOrder] = useQueryState('sort', {
    history: 'replace',
    defaultValue: 'desc',
  });
  const sortedPosts = [...allPosts].sort((a, b) => {
    // sort by createdAt: string;
    if (sortOrder === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <Carousel
      // setApi={setApi}
      opts={OPTIONS}
      plugins={
        isDev
          ? undefined
          : [
              Autoplay({ playOnInit: true }),
              AutoScroll({
                speed: 0.3,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
      }
      className='w-full'>
      <CarouselContent className='-ml-1'>
        {sortedPosts.map((post, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 flex items-stretch'>
            <div className='p-1 w-full flex'>
              <BlogCard post={post} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {isLarge ? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : (
        <div className='flex justify-center gap-3 py-4'>
          <PrevButton />
          <NextButton />
        </div>
      )}

      {/* <div className='flex justify-center gap-3 py-4'>
        <PrevButton />
        <NextButton />
        {pageStarts.map((snapIndex, pageIndex) => (
          <button
            key={snapIndex}
            type='button'
            onClick={() => onDotButtonClick(snapIndex)}
            className={cn(
              'size-2 lg:size-3 rounded-full transition-colors delay-150 duration-300 ease-linear',
              pageIndex === activePage
                ? 'bg-primary outline-primary outline-2 outline-offset-2 outline-dotted'
                : 'bg-secondary outline-muted-foreground outline-2 outline-offset-2 outline-dotted'
            )}
            aria-label={`Go to slide ${pageIndex + 1}`}
          />
        ))}
      </div> */}
    </Carousel>
  );
}

export function PrevButton() {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot='carousel-previous'
      variant={'ghost'}
      size={'icon-sm'}
      className={cn('size-8 rounded-full')}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label='Previous slide'>
      <ArrowLeft />
    </Button>
  );
}

export function NextButton() {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot='carousel-next'
      variant={'ghost'}
      size={'icon-sm'}
      className={cn('size-8 rounded-full')}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label='Next slide'>
      <ArrowRight />
    </Button>
  );
}
