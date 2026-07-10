'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import ResponsiveButton from '../shared/responsive-button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Blockquote, BlockquoteAuthor } from './blockquote';

export function Accordion02() {
  const [value, setValue] = useState<string>();
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const faqToShow =
    (!isShowMore && !isMobile) || (isMobile && !isShowMore)
      ? faqs.slice(0, 4)
      : faqs;

  return (
    <section
      id='faqs'
      className='max-w-(--breakpoint-xl) mx-auto w-full px-6 xl:px-0 space-y-6 lg:space-y-8 py-10'>
      <div className='text-center w-full'>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.15]! font-semibold tracking-[-0.035em]'>
          Frequently Asked Questions
        </h2>
      </div>



      {isMobile && !isShowMore ? (
        <Accordion
          type='single'
          collapsible
          className='w-full border rounded-md'
          value={value}
          onValueChange={setValue}>
          {faqToShow.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className='text-left data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden'>
                <div className='flex flex-1 items-center gap-2 lg:gap-4'>
                  <div className='relative ml-2 lg:ml-4'>
                    <Plus
                      id='plus'
                      className={cn(
                        'shrink-0 transition-all duration-500',
                        'data-[state=open]:opacity-0 data-[state=closed]:opacity-100',
                        'data-[state=open]:rotate-180',
                        'size-4 lg:size-6',
                      )}
                    />
                    <Minus
                      id='minus'
                      className={cn(
                        'absolute inset-0 opacity-100 transition-all duration-500',
                        'hover:opacity-100 [data-state=close]:opacity-100',
                        'data-[state=open]:rotate-180',
                        'size-4 lg:size-6',
                      )}
                    />
                  </div>
                  <h3 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold'>
                    {item.question}
                  </h3>
                </div>
              </AccordionTrigger>

              <AccordionContent className='px-0 pb-6 ml-3 lg:ml-6 text-xs sm:text-sm lg:text-base'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}

      {!isShowMore && !isMobile ? (
        <Accordion
          type='single'
          collapsible
          className='w-full border rounded-md'
          value={value}
          onValueChange={setValue}>
          {faqToShow.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className='text-left data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden'>
                <div className='flex flex-1 items-center gap-2 lg:gap-4'>
                  <div className='relative ml-2 lg:ml-4'>
                    <Plus
                      id='plus'
                      className={cn(
                        'shrink-0 transition-all duration-500',
                        'data-[state=open]:opacity-0 data-[state=closed]:opacity-100',
                        'data-[state=open]:rotate-180',
                        'size-4 lg:size-6',
                      )}
                    />
                    <Minus
                      id='minus'
                      className={cn(
                        'absolute inset-0 opacity-100 transition-all duration-500',
                        'hover:opacity-100 [data-state=close]:opacity-100',
                        'data-[state=open]:rotate-180',
                        'size-4 lg:size-6',
                      )}
                    />
                  </div>
                  <h3 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold'>
                    {item.question}
                  </h3>
                </div>
              </AccordionTrigger>

              <AccordionContent className='px-0 pb-6 ml-3 lg:ml-6 text-xs sm:text-sm lg:text-base'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}

      <Collapsible open={isShowMore} onOpenChange={setIsShowMore}>
        <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-2 overflow-hidden transition-all duration-300'>
          <div className='w-full'>
            <Accordion
              type='single'
              collapsible
              className='w-full border rounded-md'
              value={value}
              onValueChange={setValue}>
              {faqs.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className='text-left data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden'>
                    <div className='flex flex-1 items-center gap-2 lg:gap-4'>
                      <div className='relative ml-2 lg:ml-4'>
                        <Plus
                          id='plus'
                          className={cn(
                            'shrink-0 transition-all duration-500',
                            'data-[state=open]:opacity-0 data-[state=closed]:opacity-100',
                            'data-[state=open]:rotate-180',
                            'size-4 lg:size-6',
                          )}
                        />
                        <Minus
                          id='minus'
                          className={cn(
                            'absolute inset-0 opacity-100 transition-all duration-500',
                            'hover:opacity-100 [data-state=close]:opacity-100',
                            'data-[state=open]:rotate-180',
                            'size-4 lg:size-6',
                          )}
                        />
                      </div>
                      <h3 className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold'>
                        {item.question}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='px-0 pb-6 ml-3 lg:ml-6 text-xs sm:text-sm lg:text-base'>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CollapsibleContent>
        <div data-aos='fade-up' className='flex items-center justify-center'>
          <CollapsibleTrigger
            asChild
            className='flex items-center justify-center data-[state=open]:my-6 data-[state=close]:mb-6'>
            <ResponsiveButton className={'rounded-full!'}>
              {isShowMore ? 'Show Less' : 'Show More'}
            </ResponsiveButton>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </section>
  );
}
