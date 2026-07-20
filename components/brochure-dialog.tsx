'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IconPdf } from '@tabler/icons-react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Options } from 'react-pdf/dist/shared/types.js';
import { InteractiveHoverButton } from './extends/interactive-hover-button';
import { Skeleton } from './ui/skeleton';

const PDF_URL =
  '/Ascent Wealth Brochure.pdf';

// const version = pdfjs.version;

export default function BrochureDialog() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile();

  const options = useMemo<Options>(
    () => ({
      cMapUrl: `/pdf-js/cmaps/`,
      wasmUrl: `/pdf-js/wasm/`,
    }),
    [],
  );
  // Configure worker only on client-side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf-js/pdf.worker.mjs`;
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function nextPage() {
    if (pageNumber < (numPages || 0)) {
      setPageNumber(pageNumber + 1);
    }
  }

  function prevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleDownload() {
    startTransition(async () => {
      try {
        const response = await fetch(PDF_URL);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Ascent_Wealth_Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <InteractiveHoverButton
          className={cn(
            'rounded-full h-11! md:h-12! cursor-pointer flex! items-center! justify-center! py-0!',
            isMobile && 'text-sm'
          )}
          icon={<IconPdf className='h-5! w-5!' />}>
          Download Brochure
        </InteractiveHoverButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-4xl w-full min-h-6/12 h-full'>
        <DialogHeader>
          <DialogTitle>Ascent Wealth Brochure</DialogTitle>

          <DialogDescription>
            Explore our comprehensive brochure to discover how Ascent Wealth can
            help you achieve your financial goals with tailored investment
            solutions.
          </DialogDescription>
        </DialogHeader>
        <div className='w-(--radix-dialog-content-width)! h-full overflow-y-auto'>
          <Document
            file={PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            noData={
              <Skeleton className='w-(--radix-dialog-content-width)! h-full animate-pulse' />
            }
            loading={
              <Skeleton className='w-(--radix-dialog-content-width)! h-full animate-pulse' />
            }
            className={'w-(--radix-dialog-content-width)! h-full'}>
            <Page
              className={'w-(--radix-dialog-content-width)! h-full'}
              _className='w-(--radix-dialog-content-width)! h-full'
              canvasBackground='transparent'
              noData={
                <Skeleton className='w-(--radix-dialog-content-width)! h-full animate-pulse' />
              }
              loading={
                <Skeleton className='w-(--radix-dialog-content-width)! h-full animate-pulse' />
              }
              pageNumber={pageNumber}
            />
            <div className='flex justify-center gap-4 my-4'>
              <Button variant={'outline'} size={'sm'} onClick={prevPage}>
                Previous
              </Button>
              <Button variant={'outline'} size={'sm'} onClick={nextPage}>
                Next
              </Button>
            </div>
            <p className={'text-sm text-center'}>
              Page {pageNumber} of {numPages}
            </p>
          </Document>
        </div>
        <DialogFooter>
          <Button onClick={handleDownload} disabled={isPending} size={'sm'}>
            {isPending ? 'Downloading...' : 'Download'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
