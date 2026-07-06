'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import { ArrowUpRight } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';
import { useState, useTransition } from 'react';
import {
  FormProvider,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { sendEmail } from '@/lib/resend';
import {
  consultationSchema,
  type ConsultationFormValues,
} from '@/lib/zod.schemas';
import ResponsiveButton from '../shared/responsive-button';
import { Spinner } from '../ui/spinner';
import ConsultationForm from './consultation-form';

export default function ConsultationDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      householdExpenses: '',
      consultationType: undefined,
      specifyReason: undefined,
      age: '',
      spouseAge: '',
      firstChildAge: '',
      secondChildAge: '',
      isTermInsurance: '',
      isHealthInsurance: '',
      consent: false,
    },
  });

  const { clear } = useFormPersist('consultation-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    validate: false, // Do not trigger validation when data is restored
    dirty: false, // Do not mark form as dirty on load
    touch: false, // Do not mark fields as touched on load
    debounceDelay: 300, // Save after 300ms of inactivity
    // onDataRestored: () => {
    //   toast.success('Restored your previous consultation data!', {
    //     description: 'You can continue where you left off.',
    //     position: 'bottom-left',
    //   });
    // },
    onTimeout: () => {
      toast.error('Previous consultation was data expired!', {
        description: 'The saved data was older than 24 hours.',
        position: 'bottom-left',
      });
    },
    timeout: 1000 * 60 * 60 * 24, // 24 hours
  });

  function toggleDialog() {
    setIsOpen((prev) => !prev);
  }

  const onError: SubmitErrorHandler<ConsultationFormValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.values(errors).forEach((error) => {
      toast.error('Form Error', {
        description: error.message,
      });
    });
  };

  const onSubmit: SubmitHandler<ConsultationFormValues> = (values) => {
    // console.log('Form submitted successfully:', values);

    startTransition(async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation

      const result = await sendEmail({
        type: 'consultation-form',
        to: values.email,
        data: values,
      });

      if (!result) {
        toast.error(
          'Failed to submit consultation request. Please try again later.',
        );
        toggleDialog();
        return;
      }

      toast.success('Consultation request submitted!', {
        description:
          'Thank you for reaching out. We will get back to you shortly.',
        duration: 8000,
      });

      clear(); // Clear the persisted form data upon successful submission
      form.reset(); // Reset the form fields

      // Close the dialog upon successful submission
      toggleDialog();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <FormProvider {...form}>
        <DialogTrigger asChild>
          <ResponsiveButton className={'rounded-full! h-11! md:h-12! cursor-pointer flex! items-center! justify-center!'}>
            Take a free consultation <ArrowUpRight className='size-4' />
          </ResponsiveButton>
        </DialogTrigger>
        <DialogContent className='min-w-6/12 mx-auto w-full'>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className={'space-y-4'}>
            <DialogHeader className={'sr-only'}>
              <DialogTitle>
                <VisuallyHidden.Root>
                  Consultation Form - Goal Based Financial Planning
                </VisuallyHidden.Root>
              </DialogTitle>
              <DialogDescription>
                <VisuallyHidden.Root>
                  A well thought out financial plan alone can pave way for
                  achieving financial independence.
                </VisuallyHidden.Root>
              </DialogDescription>
            </DialogHeader>

            <ConsultationForm />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' size={'sm'} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' size={'sm'} disabled={isPending}>
                {isPending ? (
                  <span className={'inline-flex items-center gap-2'}>
                    Submitting... <Spinner />
                  </span>
                ) : (
                  <span>Submit Consultation</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
