'use client';

import NavMenu from '@/components/shared/nav-menu';
import { NavigationSheet } from '@/components/shared/navigation-sheet';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedThemeToggler } from '../extends/animated-theme-toggler';
// import LogoSVG1 from './logo-svg1';
import Logo from './logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ContactForm from '@/components/forms/contact-form';
import { useQueryState, parseAsBoolean } from 'nuqs';

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useQueryState(
    'contact',
    parseAsBoolean.withDefault(false)
  );

  return (
    <nav className='fixed z-50 top-6 inset-x-4 h-16 bg-transparent border max-w-(--breakpoint-xl) mx-auto rounded-full backdrop-blur-xl border-border/50 shadow-lg shadow-black/5'>
      <div className='h-full flex items-center justify-between mx-auto px-4 relative'>
        <Link href='/' aria-label='Home' className='flex items-center shrink-0'>
          <Logo className="w-auto h-[60px]" />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className='hidden lg:block ml-auto' />

        <div className='flex items-center gap-3 ml-auto'>
          {/* <ThemeModeToggle /> */}
          <AnimatedThemeToggler />

          <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
            <div className={'hidden lg:block'}>
              <SheetTrigger asChild>
                <button
                  className={buttonVariants({
                    variant: 'default',
                    className: 'rounded-full! cursor-pointer',
                    size: 'sm',
                  })}>
                  Get a quote
                </button>
              </SheetTrigger>
            </div>
            <SheetContent side="left" className="w-[450px] sm:max-w-[450px] overflow-y-auto px-6 py-10">
              <SheetHeader className="sr-only">
                <SheetTitle>Contact Us</SheetTitle>
                <SheetDescription>
                  Send us a message and we'll get back to you shortly.
                </SheetDescription>
              </SheetHeader>
              <div className="h-full pt-4">
                <ContactForm />
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Menu */}
          <div className='lg:hidden'>
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
