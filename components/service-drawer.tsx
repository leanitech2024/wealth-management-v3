'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { services } from '@/constants';
import { useInView } from 'react-intersection-observer';
import { Highlighter } from './extends/highlighter';
import ResponsiveButton from './shared/responsive-button';

import { ArrowRightIcon } from 'lucide-react';
import { Blockquote, BlockquoteAuthor } from './extends/blockquote';

type ServiceDrawerProps = (typeof services)[number] & {
  triggerClassName?: string;
  triggerVariant?: 'link' | 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  triggerText?: string;
  showIcon?: boolean;
};

export default function ServiceDrawer(props: ServiceDrawerProps) {
  const {
    triggerClassName,
    triggerVariant = 'link',
    triggerText = 'Know more',
    showIcon = false,
    ...service
  } = props;

  const { ref, inView } = useInView({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    triggerOnce: true,
    trackVisibility: true,
    delay: 100,
  });

  const handleOpenChange = (open: boolean) => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;
    if (open) {
      servicesSection.setAttribute('inert', '');
    } else {
      servicesSection.removeAttribute('inert');
    }
  };

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <ResponsiveButton
          variant={triggerVariant}
          className={
            triggerClassName ||
            'underline underline-offset-2 hover:no-underline h-fit! px-0! rounded-none!'
          }>
          {triggerText} {showIcon && <ArrowRightIcon className='size-4' />}
        </ResponsiveButton>
      </DrawerTrigger>
      <DrawerContent ref={ref} className={'min-h-fit'}>
        <div className='w-full flex flex-col h-full'>
          <div className='mx-auto w-full max-w-(--breakpoint-sm) px-4 py-0'>
            <DrawerHeader className={''}>
              <DrawerTitle
                className={
                  'text-sm font-medium md:font-semibold md:text-base lg:text-lg'
                }>
                <Highlighter
                  action='underline'
                  color='#a18e39'
                  isView={inView}
                  multiline>
                  {props.title}
                </Highlighter>
              </DrawerTitle>
              <DrawerDescription className='sr-only'>
                Details about {props.title}
              </DrawerDescription>
            </DrawerHeader>
          </div>

          <div className='h-96 w-full overflow-y-auto'>
            <div className='mx-auto w-full max-w-(--breakpoint-sm) px-4 pt-4 pb-2'>
              {props.quote && (() => {
                const parts = props.quote.split(/ - | – /);
                const text = parts[0]?.replace(/^"+|"+$/g, '') || '';
                const author = parts[1] || '';
                return (
                  <Blockquote variant='3' className='mb-6 text-start py-1 pr-0 text-sm sm:text-base md:text-lg'>
                    {text}
                    {author && <BlockquoteAuthor>{author}</BlockquoteAuthor>}
                  </Blockquote>
                );
              })()}
              {props.description.map((para, index) => (
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
                <ResponsiveButton variant='outline'>Close</ResponsiveButton>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
