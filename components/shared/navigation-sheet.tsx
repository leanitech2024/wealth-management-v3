'use client';

// import { Logo } from '@/components/shared/logo';
import NavMenu from '@/components/shared/nav-menu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Separator } from '../ui/separator';
// import LogoSVG from './logo-svg';
// import LogoSVG1 from './logo-svg1';
import Logo from './logo';

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-full' aria-label='Toggle menu'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='px-6 py-3 data-[state=open]:zoom-in-100! data-[state=open]:slide-in-from-right-20 data-[state=open]:duration-600'>
        <VisuallyHidden>
          <SheetDescription>
            Use this menu to navigate through the website.
          </SheetDescription>
        </VisuallyHidden>
        <div className={'relative'}>
          <Link href='/' aria-label='Home' className={'w-full h-16'}>
            {/* <LogoSVG /> */}
            {/* <LogoSVG1 /> */}
            <Logo />
          </Link>
        </div>
        <Separator />
        <NavMenu
          orientation='vertical'
          className='[&>div]:h-full'
          onOpenChange={isMobile ? setIsOpen : () => {}}
        />
      </SheetContent>
    </Sheet>
  );
};
