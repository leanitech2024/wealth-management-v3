'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ResponsiveButton from './shared/responsive-button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { useState } from 'react';

type LocationDialogProps = {
  triggerText?: string;
  triggerClassName?: string;
};

export default function LocationDialog({
  triggerText = 'Write a Review',
  triggerClassName,
}: LocationDialogProps = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ResponsiveButton
          type='button'
          onClick={() => setIsOpen(true)}
          className={
            triggerClassName ||
            'rounded-full h-10! md:h-11! cursor-pointer flex! items-center! justify-center! py-0! gap-2 z-20'
          }>
          <Star className='h-5! w-5! fill-yellow-400 stroke-yellow-400' />
          {triggerText}
        </ResponsiveButton>
      </DialogTrigger>
      <DialogContent className='data-[state=open]:zoom-in-0! data-[state=open]:duration-600 sm:max-w-lg w-full gap-2'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Star className='h-5 w-5 fill-yellow-400 stroke-yellow-400' />
            Google Review
          </DialogTitle>
          <DialogDescription>
            Scan the QR code or view our location to write a review on Google and explore personalized financial solutions.
          </DialogDescription>
        </DialogHeader>
        <Separator className={'my-2'} />
        <div className='w-(--radix-dialog-content-width)! mx-auto h-full relative'>
          <Image
            src={
              'https://res.cloudinary.com/dxgckfhti/image/upload/v1768549237/business-location_x7pl9i.avif'
            }
            alt='Our Location'
            width={4746}
            height={5280}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-full object-cover rounded-md'
            preload={true}
            placeholder='blur'
            blurDataURL='https://res.cloudinary.com/dxgckfhti/image/upload/v1768549237/business-location_x7pl9i.avif'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
