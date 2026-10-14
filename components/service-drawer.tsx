'use client';

import { services } from '@/constants';
import ResponsiveButton from './shared/responsive-button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

type ServiceDrawerProps = (typeof services)[number] & {
  triggerClassName?: string;
  triggerVariant?: 'link' | 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  triggerText?: string;
  showIcon?: boolean;
};

export const getServiceSlug = (title: string): string => {
  if (title.includes('Mutual Funds')) return 'mutual-funds';
  if (title.includes('SIF')) return 'sif-aif-pms';
  if (title.includes('GIFT City')) return 'gift-city';
  if (title.includes('Corporate FDs')) return 'corporate-fds';
  if (title.includes('Insurance')) return 'insurance';
  if (title.includes('Estate Planning')) return 'estate-planning';
  if (title.includes('Goal Based')) return 'goal-planning';
  if (title.includes('Ascent')) return 'ascent-planning';
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

export default function ServiceDrawer(props: ServiceDrawerProps) {
  const {
    triggerClassName,
    triggerVariant = 'link',
    triggerText = 'Know more',
    showIcon = false,
  } = props;

  const slug = getServiceSlug(props.title);

  return (
    <ResponsiveButton
      asChild
      variant={triggerVariant}
      className={
        triggerClassName ||
        'underline underline-offset-2 hover:no-underline h-fit! px-0! rounded-none!'
      }>
      <Link scroll={false} href={`/?service=${slug}`}>
        {triggerText} {showIcon && <ArrowRightIcon className='size-4' />}
      </Link>
    </ResponsiveButton>
  );
}
