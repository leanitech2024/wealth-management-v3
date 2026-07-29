import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { LazyBlogCarousel } from './lazy-components';
import ResponsiveButton from './shared/responsive-button';

export default function Blogs() {
  return (
    <section
      id='blogs'
      className='max-w-(--breakpoint-xl) mx-auto w-full px-6 xl:px-0 space-y-6 py-10'>
      <div className='flex items-center justify-center mb-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center'>
          Our Blogs
        </h2>
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
