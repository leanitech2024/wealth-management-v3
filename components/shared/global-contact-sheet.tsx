'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import ContactForm from '@/components/forms/contact-form';
import { useQueryState, parseAsBoolean } from 'nuqs';

export function GlobalContactSheet() {
  const [isContactOpen, setIsContactOpen] = useQueryState(
    'contact',
    parseAsBoolean.withDefault(false)
  );

  return (
    <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
      <SheetContent side="left" className="w-full sm:w-[450px] sm:max-w-[450px] sm:h-fit sm:max-h-[90vh] sm:inset-y-auto sm:top-auto sm:bottom-0 sm:rounded-r-none sm:rounded-tr-xl overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        <SheetHeader className="sr-only">
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Send us a message and we'll get back to you shortly.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <ContactForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
