'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { navlinks } from '@/constants';
// import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, type ComponentProps, useState, useEffect } from 'react';

type NavMenuProps = ComponentProps<typeof NavigationMenu> & {
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

export default function NavMenu(props: NavMenuProps) {
  const { onOpenChange, ...navigationMenuProps } = props;
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveHash(window.location.hash);
      const onHashChange = () => setActiveHash(window.location.hash);
      
      const handleScroll = () => {
        const sections = navlinks
          .map(link => link.href.split('#')[1])
          .filter(Boolean);
          
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveHash(`#${section}`);
              return;
            }
          }
        }
        
        if (window.scrollY < 100) {
          setActiveHash('');
        }
      };

      window.addEventListener('hashchange', onHashChange);
      window.addEventListener('scroll', handleScroll);
      // Run once to set initial state based on current scroll position
      setTimeout(handleScroll, 100);

      return () => {
        window.removeEventListener('hashchange', onHashChange);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <NavigationMenu {...navigationMenuProps}>
      <NavigationMenuList className='space-x-0 data-[orientation=vertical]:flex-col lg:gap-4 data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start'>
        {navlinks.map((link) => {
          const isHome = link.href === '/';
          const isHashLink = link.href.includes('#');
          const hashValue = isHashLink ? `#${link.href.split('#')[1]}` : '';
          
          let isActive = false;
          if (isHome) {
            isActive = pathname === '/' && !activeHash;
          } else if (isHashLink) {
            isActive = pathname === '/' && activeHash === hashValue;
          } else {
            isActive = pathname.startsWith(link.href);
          }

          return (
          <NavigationMenuItem key={link.id}>
            <NavigationMenuLink
              asChild
              className={cn(
                isActive &&
                  'border-primary! text-foreground!',

                // active styles
                'data-[active=true]:focus:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-foreground',

                // hover styles
                'hover:bg-transparent hover:text-foreground border-b-2 border-transparent hover:border-b-2 hover:border-primary',

                // focus styles
                'focus:text-foreground focus-visible:ring-ring/50 focus:bg-transparent focus:hover:bg-transparent focus:border-primary',

                // inactive styles
                "[&_svg:not([class*='text-'])]:text-muted-foreground",

                // common styles
                "flex flex-col gap-4 px-0 py-1 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 font-semibold rounded-none",

                // animation styles
                'data-[active=true]:transition-all data-[active=true]:duration-300 data-[active=true]:ease-in-out focus:data-[active=true]:transition-all focus:data-[active=true]:duration-300 focus:data-[active=true]:ease-in-out',
              )}>
              <Link
                scroll={true}
                // href={isBlogPage ? '/' : link.href}
                href={link.href}
                // prefetch={isBlogPage ? true : false}
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
