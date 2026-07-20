'use client';

import { allPosts } from '@/.content-collections/generated';
import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogCard from './blog-card';

const POSTS_PER_PAGE = 9;
const LOAD_MORE_DELAY = 700;

export default function BlogsCard() {
  const [sortOrder] = useQueryState('sort', {
    history: 'replace',
    defaultValue: 'desc',
  });

  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visiblePosts = sortedPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < sortedPosts.length;

  const triggerLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMorePosts) {
      return;
    }

    setIsLoadingMore(true);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = setTimeout(() => {
      setVisibleCount((currentCount) =>
        Math.min(currentCount + POSTS_PER_PAGE, allPosts.length),
      );
      setIsLoadingMore(false);
      loadingTimeoutRef.current = null;
    }, LOAD_MORE_DELAY);
  }, [isLoadingMore, hasMorePosts]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);



  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {visiblePosts.map((post, index) => (
          <div key={index} className='flex'>
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {hasMorePosts ? (
        <div className='py-8 flex justify-center'>
          <Button
            variant='outline'
            className='rounded-full px-8'
            onClick={triggerLoadMore}
            disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      ) : null}
    </>
  );
}
