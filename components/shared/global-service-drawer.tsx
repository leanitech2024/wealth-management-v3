'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { services } from '@/constants';
import { useInView } from 'react-intersection-observer';
import { Highlighter } from '../extends/highlighter';
import ResponsiveButton from './responsive-button';
import { Blockquote, BlockquoteAuthor } from '../extends/blockquote';
import { useQueryState } from 'nuqs';
import { getServiceSlug } from '../service-drawer';

export function GlobalServiceDrawer() {
  const [activeService, setActiveService] = useQueryState('service');

  const currentService = services.find(
    (s) => getServiceSlug(s.title) === activeService
  );

  const isOpen = !!currentService;

  const { ref, inView } = useInView({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    triggerOnce: true,
    trackVisibility: true,
    delay: 100,
  });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setActiveService(null);
        }
      }}>
      <DrawerContent ref={ref} className='min-h-fit'>
        {currentService && (
          <div className='w-full flex flex-col h-full'>
            <div className='mx-auto w-full max-w-(--breakpoint-sm) px-4 py-0'>
              <DrawerHeader>
                <DrawerTitle
                  className='text-sm font-medium md:font-semibold md:text-base lg:text-lg'>
                  <Highlighter
                    action='underline'
                    color='#a18e39'
                    isView={inView}
                    multiline>
                    {currentService.title}
                  </Highlighter>
                </DrawerTitle>
                <DrawerDescription className='sr-only'>
                  Details about {currentService.title}
                </DrawerDescription>
              </DrawerHeader>
            </div>

            <div className='h-96 w-full overflow-y-auto'>
              <div className='mx-auto w-full max-w-(--breakpoint-sm) px-4 pt-4 pb-2'>
                {currentService.quote && (() => {
                  const parts = currentService.quote.split(/ - | – /);
                  const text = parts[0]?.replace(/^"+|"+$/g, '') || '';
                  const author = parts[1] || '';
                  return (
                    <Blockquote size='sm' className='mb-6 mx-auto'>
                      {text}
                      {author && <BlockquoteAuthor>{author}</BlockquoteAuthor>}
                    </Blockquote>
                  );
                })()}
                {currentService.description.map((para, index) => (
                  <p
                    key={index}
                    className='mb-2 lg:mb-4 text-sm text-muted-foreground'>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className='mx-auto w-full max-w-(--breakpoint-sm) px-4 mt-auto p-2'>
              <DrawerFooter className='p-0'>
                <DrawerClose asChild>
                  <ResponsiveButton className='bg-[#5A2328] hover:bg-[#451a1e] text-white hover:text-white! border-none'>
                    Close
                  </ResponsiveButton>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
