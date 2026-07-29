'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export default function BannerBreadcrumb() {
  const pathname = usePathname().slice(1); // Remove leading slash

  const formattedPathname = pathname
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Breadcrumb>
      <BreadcrumbList className='text-[#C9B169] text-secondary-foreground'>
        <BreadcrumbItem>
          <BreadcrumbLink
            className={'text-[#C9B169] hover:text-[#C9B169]/80 md:text-xl md:font-semibold lg:text-2xl lg:font-bold'}
            href='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          className={'text-[#C9B169] md:[&>svg]:size-5 lg:[&>svg]:size-6'}
        />
        <BreadcrumbItem>
          <BreadcrumbLink
            className={'text-[#C9B169] hover:text-[#C9B169]/80 md:text-xl md:font-semibold lg:text-2xl lg:font-bold'}
            href={pathname}>
            {formattedPathname}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
