import NavMenu from '@/components/shared/nav-menu';
import { NavigationSheet } from '@/components/shared/navigation-sheet';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedThemeToggler } from '../extends/animated-theme-toggler';
// import LogoSVG1 from './logo-svg1';
import Logo from './logo';

export default function Navbar() {
  return (
    <nav className='fixed z-50 top-6 inset-x-4 h-16 bg-transparent border max-w-(--breakpoint-xl) mx-auto rounded-full backdrop-blur-xl border-border/50 shadow-lg shadow-black/5'>
      <div className='h-full flex items-center justify-between mx-auto px-6 relative'>
        <Link href='/' aria-label='Home' className='flex items-center shrink-0'>
          <Logo className="w-auto h-11" />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className='hidden lg:block ml-auto' />

        <div className='flex items-center gap-3 ml-auto'>
          {/* <ThemeModeToggle /> */}
          <AnimatedThemeToggler />

          <div className={'hidden lg:block'}>
            <Link
              scroll={true}
              href='#contact-us'
              className={buttonVariants({
                variant: 'default',
                className: 'rounded-full!',
                size: 'sm',
              })}>
              Get a quote
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className='lg:hidden'>
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
