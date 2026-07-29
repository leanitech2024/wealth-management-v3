import { cn } from "@/lib/utils";
import React from "react";

type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  isShortQuote?: boolean;
};

const Blockquote = ({ children, className, size = "lg" }: BlockquoteProps) => {
  const childrenArray = React.Children.toArray(children);
  const author = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      (child.type === BlockquoteAuthor ||
        (child.type as any).name === "BlockquoteAuthor"),
  );
  const mainContent = childrenArray.filter(
    (child) =>
      !(
        React.isValidElement(child) &&
        (child.type === BlockquoteAuthor ||
          (child.type as any).name === "BlockquoteAuthor")
      ),
  );

  let textContent = "";
  React.Children.forEach(mainContent, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      textContent += String(child);
    } else if (
      React.isValidElement(child) &&
      typeof (child.props as any).children === "string"
    ) {
      textContent += (child.props as any).children;
    }
  });
  const isShortQuote =
    textContent.trim().length > 0 && textContent.trim().length < 80;

  const clonedAuthor =
    author && React.isValidElement(author)
      ? React.cloneElement(author as React.ReactElement<any>, {
          size,
          isShortQuote,
        })
      : author;

  const containerSizes = {
    sm: "py-3 px-5 sm:px-8 text-xs sm:text-sm md:text-base",
    md: "py-4 px-6 sm:px-10 text-sm sm:text-base md:text-lg",
    lg: "py-6 px-8 sm:px-12 md:px-16 text-base sm:text-lg md:text-lg lg:text-xl",
  };

  const quoteSizes = {
    sm: "text-lg sm:text-xl md:text-2xl",
    md: "text-xl sm:text-2xl md:text-3xl",
    lg: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  };

  let rightQuoteNode = (
    <span
      className={cn(
        "font-serif select-none ml-1.5 inline-block h-0 leading-none align-text-top text-primary-foreground/30",
        quoteSizes[size],
      )}
    >
      ”
    </span>
  );

  const processedMainContent = [...mainContent];
  if (processedMainContent.length > 0) {
    const lastIdx = processedMainContent.length - 1;
    const lastChild = processedMainContent[lastIdx];
    if (typeof lastChild === "string") {
      const str = lastChild as string;
      const trimIdx = str.trimEnd().lastIndexOf(" ");
      if (trimIdx !== -1) {
        const restText = str.slice(0, trimIdx + 1);
        const lastWord = str.slice(trimIdx + 1);
        processedMainContent[lastIdx] = (
          <React.Fragment key="last-node">
            {restText}
            <span className="whitespace-nowrap">
              {lastWord}
              {rightQuoteNode}
            </span>
          </React.Fragment>
        );
        rightQuoteNode = <React.Fragment key="empty" />;
      } else {
        processedMainContent[lastIdx] = (
          <span key="last-node" className="whitespace-nowrap">
            {str}
            {rightQuoteNode}
          </span>
        );
        rightQuoteNode = <React.Fragment key="empty" />;
      }
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-xl bg-primary font-sans italic text-primary-foreground shadow-md text-center leading-snug w-fit",
        containerSizes[size],
        className,
      )}
    >
      <span
        className={cn(
          "font-serif select-none mr-1.5 inline-block h-0 leading-none align-text-top text-primary-foreground/30",
          quoteSizes[size],
        )}
      >
        “
      </span>
      {processedMainContent}
      {rightQuoteNode}
      {clonedAuthor}
    </div>
  );
};

const BlockquoteAuthor = ({
  children,
  className,
  size = "lg",
  isShortQuote,
}: BlockquoteProps) => {
  const authorSizes = {
    sm: "text-[10px] sm:text-[11px]",
    md: "text-[11px] sm:text-xs md:text-sm",
    lg: "text-xs sm:text-sm md:text-base",
  };

  return (
    <span
      className={cn(
        "font-bold not-italic text-primary-foreground/80",
        authorSizes[size],
        isShortQuote
          ? "inline-block align-middle ml-3 -translate-y-[1px] whitespace-nowrap sm:block sm:mt-2 sm:ml-0 sm:translate-y-0 sm:text-right sm:whitespace-normal"
          : "inline-block align-middle ml-3 -translate-y-[1px] whitespace-nowrap",
        className,
      )}
    >
      — {children}
    </span>
  );
};

export { Blockquote, BlockquoteAuthor };
