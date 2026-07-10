import { cn } from '@/lib/utils';
import React from 'react';

type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: '1' | '2' | '3' | 'default' | 'variant2' | 'variant3';
};

const Blockquote = ({ children, className, variant = 'default' }: BlockquoteProps) => {
  const childrenArray = React.Children.toArray(children);
  const author = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      (child.type === BlockquoteAuthor || (child.type as any).name === 'BlockquoteAuthor')
  );
  const mainContent = childrenArray.filter(
    (child) =>
      !(
        React.isValidElement(child) &&
        (child.type === BlockquoteAuthor || (child.type as any).name === 'BlockquoteAuthor')
      )
  );

  const isVariant2 = variant === '2' || variant === 'variant2';
  const isVariant3 = variant === '3' || variant === 'variant3';

  const clonedAuthor = author && React.isValidElement(author)
    ? React.cloneElement(author as React.ReactElement<any>, { variant })
    : author;

  return (
    <div
      className={cn(
        isVariant3
          ? "border-l-2 border-primary/30 pl-6 py-1 italic text-muted-foreground text-left text-sm sm:text-base md:text-lg bg-transparent"
          : isVariant2
            ? "relative bg-primary/[0.04] border border-primary/10 border-l-4 border-l-primary rounded-r-xl rounded-l-md py-4 px-6 sm:px-8 text-foreground/90 text-left text-sm sm:text-base md:text-lg leading-snug font-sans italic"
            : "relative rounded-xl bg-primary py-6 px-8 sm:px-12 md:px-16 font-sans italic text-primary-foreground shadow-md text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-snug",
        className,
      )}>
      <span
        className={cn(
          isVariant3
            ? "font-serif text-lg sm:text-xl select-none mr-1 inline-block"
            : "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none mr-2 inline-block h-0 leading-[0] align-middle translate-y-[8px] sm:translate-y-[10px]",
          isVariant3 ? "text-primary/50" : isVariant2 ? "text-primary/60" : "text-primary-foreground/20"
        )}>
        “
      </span>
      <span className="inline">
        {mainContent}
      </span>
      <span
        className={cn(
          isVariant3
            ? "font-serif text-lg sm:text-xl select-none ml-1 inline-block"
            : "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none ml-2 inline-block h-0 leading-[0] align-middle translate-y-[8px] sm:translate-y-[10px]",
          isVariant3 ? "text-primary/50" : isVariant2 ? "text-primary/60" : "text-primary-foreground/20"
        )}>
        ”
      </span>
      {clonedAuthor}
    </div>
  );
};

const BlockquoteAuthor = ({ children, className, variant = 'default' }: BlockquoteProps) => {
  const isVariant2 = variant === '2' || variant === 'variant2';
  const isVariant3 = variant === '3' || variant === 'variant3';

  return (
    <p
      className={cn(
        'font-bold not-italic text-xs sm:text-sm md:text-base',
        isVariant3
          ? 'text-left text-foreground/75 mt-1 font-semibold text-[11px] sm:text-xs'
          : isVariant2
            ? 'text-left text-primary/80 mt-2 tracking-wider uppercase text-[11px] sm:text-xs'
            : 'mt-1.5 text-center sm:text-right text-primary-foreground/80',
        className,
      )}>
      — {children}
    </p>
  );
};

export { Blockquote, BlockquoteAuthor };
