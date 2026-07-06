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
import { ScrollArea } from './ui/scroll-area';
import { ArrowRightIcon } from 'lucide-react';

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
      <DrawerContent ref={ref} className={'min-h-fit'} inert>
        <div className='mx-auto w-full max-w-(--breakpoint-sm) flex flex-col h-full px-4'>
          <div className={'py-0'}>
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
              <DrawerDescription>
                When a management with a reputation for brilliance, tackles a
                business with a reputation for bad economics, it is the
                reputation of the business that remains intact...
              </DrawerDescription>
            </DrawerHeader>
          </div>

          <ScrollArea className='h-96 w-full pt-4'>
            {props.description.map((para, index) => (
              <p
                key={index}
                className='mb-2 lg:mb-4 text-sm text-muted-foreground'>
                {para}
              </p>
            ))}
          </ScrollArea>
          <DrawerFooter className='mt-auto p-2'>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <ResponsiveButton variant='outline'>Close</ResponsiveButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
