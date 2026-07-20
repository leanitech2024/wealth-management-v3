import BlogsCard from '@/components/blogs-card';

import BlogBanner from '@/components/shared/blog-banner';
import { CTABlock } from '@/components/shared/cta-block';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogsPage(props: PageProps<'/blogs'>) {
  // const sortedPosts = allPosts.sort((a, b) => {
  //   // sort by createdAt: string;
  //   // if (sortOrder === 'asc') {
  //   //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  //   // } else {
  //   //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //   // }
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  return (
    <main
      className={
        'max-w-(--breakpoint-xl) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16'
      }>
      <BlogBanner />

      <section className={'space-y-6'}>
        <Suspense fallback={<Skeleton className='h-96 w-full' />}>
          <div className='mb-6'>
            <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight'>
              Our Latest Posts
            </h2>
          </div>

          <BlogsCard />
        </Suspense>
      </section>

      <CTABlock />
    </main>
  );
}
