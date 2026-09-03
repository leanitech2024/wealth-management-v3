'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { InteractiveHoverButton } from '../extends/interactive-hover-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

import { LumpsumCalculator } from '@/components/calculators/lumpsum-calculator';
import { SipReturnsCalculator } from '@/components/calculators/sip-returns-calculator';
import { GoalSettingCalculator } from '@/components/calculators/goal-setting-calculator';
import { RetirementFundCalculator } from '@/components/calculators/retirement-fund-calculator';
import { EducationCalculator } from '@/components/calculators/education-calculator';
import { EmiCalculator } from '@/components/calculators/emi-calculator';
import { CompoundInterestCalculator } from '@/components/calculators/compound-interest-calculator';
import { InflationCalculator } from '@/components/calculators/inflation-calculator';

import EmailDialog from './email-dialog';

type CaclculatorDrawerDialogProps = {
  title: string;
  desc: string;
};

export default function CaclculatorDrawerDialog(
  props: CaclculatorDrawerDialogProps,
) {
  const { title, desc } = props;
  const [open, setOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  const [sessionStorageKey, setSessionStorageKey] = useState<SessionKey>();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const animation = {
    top: 'data-[state=open]:zoom-in-100! data-[state=open]:slide-in-from-bottom-20 data-[state=open]:duration-600',
    bottom:
      'data-[state=open]:zoom-in-100! data-[state=open]:slide-in-from-top-20 data-[state=open]:duration-600',
    left: 'data-[state=open]:zoom-in-100! data-[state=open]:slide-in-from-right-20 data-[state=open]:duration-600',
    right:
      'data-[state=open]:zoom-in-100! data-[state=open]:slide-in-from-left-20 data-[state=open]:duration-600',
    zoom: 'data-[state=open]:zoom-in-0! data-[state=open]:duration-600',
  };

  const renderCalculator = () => {
    switch (title) {
      case 'Lumpsum Calculator':
        return (
          <LumpsumCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'SIP Returns Calculator':
      case 'SIP Calculator':
        return (
          <SipReturnsCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'Goal Setting Calculator':
      case 'Goal Planner':
        return (
          <GoalSettingCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'Retirement Fund Calculator':
      case 'Retirement Planning':
        return (
          <RetirementFundCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'Education Calculator':
        return (
          <EducationCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'EMI Calculator':
        return (
          <EmiCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'Compound Interest Calculator':
        return (
          <CompoundInterestCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      case 'Inflation Calculator':
        return (
          <InflationCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
      default:
        return (
          <LumpsumCalculator
            onOpenEmail={setIsEmailDialogOpen}
            onUpdateSessionKey={setSessionStorageKey}
          />
        );
    }
  };

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <InteractiveHoverButton
              className='w-full rounded-full h-11! md:h-12! cursor-pointer flex! items-center! justify-center! py-0!'
              icon={<SparklesIcon className='h-5! w-5!' />}>
              Get free calculation
            </InteractiveHoverButton>
          </DialogTrigger>
          <DialogContent className={cn('sm:max-w-5xl max-h-[90vh] overflow-y-auto p-6', animation.zoom)}>
            <DialogHeader className={'sr-only'}>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{desc}</DialogDescription>
            </DialogHeader>

            {renderCalculator()}
          </DialogContent>
        </Dialog>
        <EmailDialog
          isEmailDialogOpen={isEmailDialogOpen}
          onCloseEmailDialog={setIsEmailDialogOpen}
          sessionStorageKey={sessionStorageKey}
        />
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <InteractiveHoverButton
            className='w-full rounded-full h-11! md:h-12! cursor-pointer flex! items-center! justify-center! py-0!'
            icon={<SparklesIcon className='h-5! w-5!' />}>
            Get free calculation
          </InteractiveHoverButton>
        </DrawerTrigger>
        <DrawerContent className='p-4 max-h-[90vh] flex flex-col'>
          <DrawerHeader className='text-left pb-2 shrink-0'>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{desc}</DrawerDescription>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto p-1' data-vaul-no-drag>
            {renderCalculator()}
          </div>
        </DrawerContent>
      </Drawer>
      <EmailDialog
        isEmailDialogOpen={isEmailDialogOpen}
        onCloseEmailDialog={setIsEmailDialogOpen}
        sessionStorageKey={sessionStorageKey}
      />
    </>
  );
}
