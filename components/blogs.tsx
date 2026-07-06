import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { LazyBlogCarousel, LazyBlogSort } from './lazy-components';
import ResponsiveButton from './shared/responsive-button';

export default function Blogs() {
  return (
    <section
      id='blogs'
      className='max-w-(--breakpoint-xl) mx-auto w-full px-6 xl:px-0 space-y-6 py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='flex flex-wrap gap-4 items-end justify-between'>
        <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight md:ml-6'>
          Blogs
        </h2>
        <LazyBlogSort />
      </div>

      <LazyBlogCarousel />

      <div className={'flex items-center justify-center'}>
        <ResponsiveButton
          data-aos='fade-bottom'
          asChild
          className='rounded-full gap-2'>
          <Link scroll={true} href={'/blogs'} aria-label='View all blogs'>
            See More <ArrowRightIcon />
          </Link>
        </ResponsiveButton>
      </div>
    </section>
  );
}
