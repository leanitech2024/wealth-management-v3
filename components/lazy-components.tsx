'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

export const LazyBlogSort = dynamic(() => import('./blog-sort'), {
  loading: () => (
    <Skeleton className='w-full md:w-45 rounded-full h-11 animate-pulse' />
  ),
  ssr: false,
});

export const LazyStatCard = dynamic(() => import('./stat-card'), {
  ssr: false,
  loading: () => (
    <div
      className={
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'
      }>
      {Array.from({ length: 5 }).map((_, index) => {
        const isLast = index === 4;

        return (
          <div
            className={cn(
              'border rounded-xl border-border/70 p-1',
              isLast ? 'sm:col-span-full md:col-span-2 xl:col-span-1' : '',
            )}
            key={index}>
            <Card className='rounded-lg bg-muted/20 h-full gap-4 p-4'>
              <CardHeader>
                <CardTitle className={'font-normal'}>
                  <Skeleton className='h-6 w-20' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-12 w-full' />
              </CardContent>
              <CardDescription>
                <Skeleton className='h-4 w-3/4 mx-auto' />
              </CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  ),
});

export const LazyBlogCarousel = dynamic(
  () => import('./blog-carousel').then((mod) => mod.BlogCarousel),
  {
    ssr: false,
    loading: () => {
      return (
        <div
          className={
            'px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          }>
          {Array.from({ length: 3 }).map(() => (
            <Card key={crypto.randomUUID()} className='shadow-none py-0 gap-3'>
              <CardHeader className='p-2 pb-0'>
                <Skeleton className='aspect-video w-full rounded-lg' />
              </CardHeader>
              <CardContent className='pt-0 pb-5 px-5'>
                <div className='flex flex-wrap gap-2 line-clamp-1'>
                  {Array.from({ length: 3 }).map((category, index) => (
                    <Skeleton key={index} className='h-4 w-20 rounded-full' />
                  ))}
                </div>

                <Skeleton className='mt-4 h-4 w-full' />

                <CardAction className={'mt-4'}>
                  <Skeleton className='h-4 w-24 rounded-full' />
                </CardAction>

                <div className='mt-6 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <Skeleton className='h-4 w-20 rounded-full' />
                  </div>

                  <span className='text-muted-foreground text-xs'>
                    <Skeleton className='h-4 w-24 rounded-full' />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    },
  },
);

export const LazyLocationDialog = dynamic(() => import('./location-dialog'), {
  loading: () => <Skeleton className='w-32 rounded-full h-11 md:h-12 animate-pulse' />,
  ssr: false,
});

export const LazyBrochureDownload = dynamic(() => import('./brochure-dialog'), {
  loading: () => <Skeleton className='w-48 rounded-full h-11 md:h-12 animate-pulse' />,
  ssr: false,
});

export const LazyWhatsappWidget = dynamic(() => import('./whatsapp-widget'), {
  loading: () => null,
  ssr: false,
});
