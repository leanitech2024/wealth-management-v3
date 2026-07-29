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
        if (window.scrollY < 80) {
          setActiveHash('');
          return;
        }

        const sections = navlinks
          .map((link) => link.href.split('#')[1])
          .filter(Boolean);

        const HEADER_OFFSET = 140;

        // Check if scrolled near bottom of page
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50
        ) {
          const lastSection = sections[sections.length - 1];
          if (lastSection) {
            setActiveHash(`#${lastSection}`);
            return;
          }
        }

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= HEADER_OFFSET && rect.bottom > HEADER_OFFSET) {
              setActiveHash(`#${section}`);
              return;
            }
          }
        }
      };

      window.addEventListener('hashchange', onHashChange);
      window.addEventListener('scroll', handleScroll, { passive: true });
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
                  'flex flex-col gap-1 px-0 py-1 text-sm font-semibold rounded-none outline-none focus:outline-none focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none focus:hover:bg-transparent shadow-none border-b-2 transition-colors duration-200',
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50',
                )}>
                <Link
                  scroll={true}
                  href={link.href}
                  onClick={() => {
                    if (isHashLink) {
                      setActiveHash(hashValue);
                    }
                    if (onOpenChange) {
                      onOpenChange(false);
                    }
                  }}>
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
