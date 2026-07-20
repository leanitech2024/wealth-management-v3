'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="default"
      onClick={scrollToTop}
      className={cn(
        'fixed z-40 rounded-full shadow-lg transition-all duration-300 ease-in-out',
        'w-[60px] h-[60px] p-0! flex items-center justify-center',
        'bottom-[108px] right-[32px]', // 16px above the 60px WhatsApp button (which is at bottom-[32px] right-[32px])
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-7 w-7" />
    </Button>
  );
}
