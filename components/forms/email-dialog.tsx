import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useTransition } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useGetSessionStorage } from '@/hooks/use-session-storage';
import { sendEmail } from '@/lib/resend';
import { emailFormSchema, EmailFormValues } from '@/lib/zod.schemas';

type EmailDialogProps = {
  isEmailDialogOpen: boolean;
  onCloseEmailDialog: Dispatch<SetStateAction<boolean>>;
  sessionStorageKey: SessionKey | undefined;
};

// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function EmailDialog(props: EmailDialogProps) {
  const { isEmailDialogOpen, onCloseEmailDialog, sessionStorageKey } = props;
  const [isPending, startTransition] = useTransition();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const storedValues = useGetSessionStorage(sessionStorageKey);

  const onError: SubmitErrorHandler<EmailFormValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof EmailFormValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<EmailFormValues> = (values) => {
    // console.log('Form data:', values);

    if (!storedValues || !sessionStorageKey) {
      toast.error('No calculation data found to send.', {
        description: 'Please complete the calculation form first.',
      });
      return;
    }

    startTransition(async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation

      const result = await sendEmail({
        type: sessionStorageKey,
        to: values.email,
        phone: values.phone,
        data: storedValues,
      });

      if (!result) {
        toast.error('Failed to send email.', {
          description: 'Please try again later.',
        });
        return;
      }

      toast.success('Email submitted!', {
        description: 'Thank you! We will be in touch soon.',
        duration: 8000,
      });
      onCloseEmailDialog(false);
      form.reset();
    });

    // wait().then(() => onCloseEmailDialog(false));
  };

  return (
    <AlertDialog open={isEmailDialogOpen} onOpenChange={onCloseEmailDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Provide your details to receive the calculation
          </AlertDialogTitle>
          <AlertDialogDescription>
            We will send the detailed calculation report to your email address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          className={'space-y-4'}
          onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className='grid gap-4'>
            {/* {JSON.stringify(storedValues) !== '{}' && storedValues ? (
              <pre className='p-4 mb-4 overflow-x-auto text-sm bg-background rounded-md'>
                {JSON.stringify(storedValues, null, 2)}
              </pre>
            ) : null} */}
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email'>Email Address</FieldLabel>
                  <Input
                    id='email'
                    type='email'
                    placeholder='someone@example.com'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState?.error ? (
                    <FieldError role='alert' errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Enter your email address</FieldDescription>
                  )}
                </Field>
              )}
            />
            <Controller
              name='phone'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='phone'>Phone Number</FieldLabel>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='+91 98765 43210'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState?.error ? (
                    <FieldError role='alert' errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Enter your phone number</FieldDescription>
                  )}
                </Field>
              )}
            />
          </div>
          <AlertDialogFooter className='flex flex-row items-center justify-end gap-3'>
            <AlertDialogCancel asChild>
              <Button
                variant={'outline'}
                type='button'
                className='h-9 px-4 py-2 text-sm font-medium rounded-lg'
                disabled={isPending}>
                Cancel
              </Button>
            </AlertDialogCancel>

            <Button
              type='submit'
              className='h-9 px-4 py-2 text-sm font-medium rounded-lg'
              disabled={isPending}>
              {isPending ? (
                <span className={'inline-flex items-center gap-2'}>
                  Submitting... <Spinner />
                </span>
              ) : (
                <span className={'inline-flex items-center gap-2'}>
                  Continue
                </span>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
