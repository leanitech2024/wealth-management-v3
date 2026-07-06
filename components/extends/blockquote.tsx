import { cn } from '@/lib/utils';
import React from 'react';

type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
};

const Blockquote = ({ children, className }: BlockquoteProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg border-l-8 border-l-primary bg-primary/5 dark:bg-primary/10 py-5 pr-5 font-sans italic leading-relaxed text-foreground before:absolute before:left-3 before:top-3 before:font-serif before:text-primary before:content-['“']",
        className,
        'text-xs sm:text-sm md:text-base lg:text-lg text-start pl-10 sm:pl-12 md:pl-14 lg:pl-16 before:text-3xl before:sm:text-4xl before:md:text-5xl before:lg:text-6xl',
      )}>
      {children}
    </div>
  );
};

const BlockquoteAuthor = ({ children, className }: BlockquoteProps) => {
  return (
    <p
      className={cn(
        'mt-5 pr-4 text-right font-bold not-italic text-primary',
        className,
      )}>
      {children}
    </p>
  );
};

export { Blockquote, BlockquoteAuthor };
