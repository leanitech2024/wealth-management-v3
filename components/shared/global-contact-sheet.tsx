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
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-2 rounded-r-xl shadow-lg border border-l-0 border-primary/20 transition-colors cursor-pointer"
        aria-label="Open Contact Form"
      >
        <span 
          className="block font-semibold tracking-widest text-sm uppercase" 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Contact Us
        </span>
      </button>

      <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
        <SheetContent side="left" className="w-full sm:w-[450px] sm:max-w-[450px] sm:h-fit sm:max-h-[90vh] sm:inset-y-auto sm:top-auto sm:bottom-0 sm:rounded-r-none sm:rounded-tr-xl overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 z-[100]">
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
    </>
  );
}
