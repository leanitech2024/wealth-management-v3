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
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-2 rounded-r-lg shadow-lg border border-l-0 border-primary/20 transition-all duration-200 cursor-pointer select-none flex items-center justify-center [writing-mode:vertical-rl] [-webkit-writing-mode:vertical-rl]"
        style={{
          writingMode: 'vertical-rl',
          WebkitWritingMode: 'vertical-rl',
          WebkitBorderTopRightRadius: '0.5rem',
          WebkitBorderBottomRightRadius: '0.5rem',
        }}
        aria-label="Open Contact Form"
      >
        <span 
          className="inline-block font-medium tracking-wider text-sm uppercase whitespace-nowrap rotate-180" 
          style={{ transform: 'rotate(0deg)', WebkitTransform: 'rotate(0deg)' }}
        >
          Contact Us
        </span>
      </button>

      <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
        <SheetContent side="left" className="w-full sm:w-[450px] sm:max-w-[450px] sm:h-fit sm:max-h-[90vh] sm:inset-y-auto sm:top-auto sm:bottom-0 sm:rounded-r-none sm:rounded-tr-xl overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 z-[100]">
          <SheetHeader className="sr-only">
            <SheetTitle>Contact Us</SheetTitle>
            <SheetDescription>
              Send us a message and we&apos;ll get back to you shortly.
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
