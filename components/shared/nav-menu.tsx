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
import { Dispatch, SetStateAction, type ComponentProps } from 'react';

type NavMenuProps = ComponentProps<typeof NavigationMenu> & {
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

export default function NavMenu(props: NavMenuProps) {
  const { onOpenChange, ...navigationMenuProps } = props;
  // const [trackHash, setTrackHash] = useState('');

  const pathname = usePathname();

  // const isBlogsPage = pathname?.startsWith('/blogs');

  // const isBlogPage = pathname?.startsWith('/blogs/');

  // const isMobile = useMediaQuery('(max-width: 1024px)');

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedHash = localStorage.getItem('trackHash');
  //     if (storedHash) {
  //       // eslint-disable-next-line
  //       setTrackHash(storedHash);

  //       if (!isMobile) {
  //         window.location.hash = trackHash;
  //       }
  //     }
  //   }
  // }, [isMobile, trackHash]);

  return (
    <NavigationMenu {...navigationMenuProps}>
      <NavigationMenuList className='space-x-0 data-[orientation=vertical]:flex-col lg:gap-4 data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start'>
        {navlinks.map((link) => (
          <NavigationMenuItem key={link.id}>
            <NavigationMenuLink
              asChild
              className={cn(
                // trackHash === `#${link.href.split('#')[1]}` &&
                //   'border-primary!',
                // ? 'data-[active=true]:border-primary data-[active=true]:text-accent-foreground'
                // : 'border-primary',

                pathname === link.href &&
                  'border-primary! text-accent-foreground!',

                // active styles
                'data-[active=true]:focus:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-accent-foreground',

                // hover styles
                'hover:bg-transparent hover:text-foreground border-b-2 border-transparent hover:border-b-2 hover:border-primary',

                // focus styles
                'focus:text-accent-foreground focus-visible:ring-ring/50 focus:bg-transparent focus:hover:bg-transparent focus:border-primary',

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
                // onClick={() => {
                //   if (onOpenChange && isMobile) {
                //     onOpenChange(false);
                //   }

                //   localStorage.setItem('trackHash', link.href);
                //   return setTrackHash(link.href);
                // }}
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
