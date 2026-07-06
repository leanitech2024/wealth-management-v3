'use client';

import { allPosts } from '@/.content-collections/generated';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogCard from './blog-card';

const POSTS_PER_PAGE = 9;
const MOBILE_LOAD_THRESHOLD = 1200;
const DESKTOP_LOAD_THRESHOLD = 1600;
const LOAD_MORE_DELAY = 700;

export default function BlogsCard() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    // sort by createdAt: string;
    // if (sortOrder === 'asc') {
    //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // } else {
    //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visiblePosts = sortedPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < sortedPosts.length;
  const isMobile = useIsMobile();

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

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMorePosts || isLoadingMore) {
        return;
      }

      const scrollPosition = window.innerHeight + window.scrollY;
      const loadThreshold = isMobile
        ? MOBILE_LOAD_THRESHOLD
        : DESKTOP_LOAD_THRESHOLD;
      const bottomThreshold =
        document.documentElement.scrollHeight - loadThreshold;

      if (scrollPosition >= bottomThreshold) {
        triggerLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    hasMorePosts,
    isLoadingMore,
    isMobile,
    sortedPosts.length,
    triggerLoadMore,
  ]);

  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {visiblePosts.map((post, index) => (
          <div key={index} className='flex'>
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {isLoadingMore ? (
        <div className='py-4 text-center text-sm text-muted-foreground'>
          Loading more posts...
        </div>
      ) : null}
    </>
  );
}
