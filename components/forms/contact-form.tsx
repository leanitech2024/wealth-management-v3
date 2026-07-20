'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconReload } from '@tabler/icons-react';
import Link from 'next/link';
import { useTransition } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { type ContactFormData, contactFormSchema } from '@/lib/zod.schemas';

import ResponsiveButton from '../shared/responsive-button';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const isDev = process.env.NODE_ENV === 'development';

type APIResponse = {
  success: boolean;
  message: string;
  data: ContactFormData | null;
};

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  const onError: SubmitErrorHandler<ContactFormData> = (errors) => {
    // console.log('Form errors:', errors);
    Object.entries(errors).forEach(([fieldName, error]) => {
      // You can customize this to show errors next to each field if desired
      toast.error(`Please fix the errors in the form.`, {
        description: `Error in ${fieldName}: ${
          error?.message ?? 'Invalid inputs.'
        }`,
      });
    });
  };

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    // console.log('Form submitted successfully:', data);
    const accessKey = process.env.NEXT_PUBLIC_WEB3_ACCESS_KEY;
    if (!accessKey) {
      throw new Error('Missing WEB_3_ACCESS_KEY environment variable');
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append('access_key', accessKey);

    startTransition(async () => {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = (await response.json()) as APIResponse;
      // console.log('Response from Web3Forms:', data);
      if (data.success) {
        toast.success('Success', {
          description: 'Your Query Submitted Successfully',
        });
        form.reset();
      } else {
        toast.error('Error', {
          description:
            data.message || 'There was an error submitting the form.',
        });
      }
    });
  };

  return (
    <div className='border p-1 bg-muted w-full min-h-full sm:min-h-0 sm:h-fit'>
      <Card className='relative isolate bg-background/70 shadow-none lg:ms-auto rounded-none p-4 gap-4 min-h-full sm:min-h-0 sm:h-fit flex flex-col justify-start'>
        <CardHeader className={'px-0'}>
          <CardTitle>Contact Us</CardTitle>

          {isDev && (
            <CardAction>
              <Button
                size={'icon-sm'}
                variant='destructive'
                type='button'
                onClick={() => form.reset()}
                aria-label='Reset form'
                disabled={!isDev}>
                <IconReload className={' size-4'} />
              </Button>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className='px-0 flex-1 flex flex-col'>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className='flex-1 flex flex-col'>
            <FieldSet className='flex-1 flex flex-col gap-4'>
              <FieldGroup className='flex-1 flex flex-col gap-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Controller
                    name='firstName'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='firstName'>First Name</FieldLabel>
                        <Input
                          placeholder='First name'
                          id='firstName'
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                          <FieldError
                            role='alert'
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='lastName'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='lastName'>Last Name</FieldLabel>
                        <Input
                          placeholder='Last name'
                          id='lastName'
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                          <FieldError
                            role='alert'
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Controller
                    name='email'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='email'>Email</FieldLabel>
                        <Input
                          type='email'
                          placeholder='Email'
                          id='email'
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldError role='alert' errors={[fieldState.error]} />
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
                          type='tel'
                          placeholder='Phone Number'
                          id='phone'
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldError role='alert' errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name='message'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='message'>Message</FieldLabel>
                      <Input
                        type='text'
                        id='message'
                        placeholder='Message'
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error && (
                        <FieldError role='alert' errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <div className='mt-auto pt-6 w-full'>
              <ResponsiveButton
                disabled={isPending}
                className='w-full'
                type='submit'>
                {isPending ? 'Sending...' : 'Send Message'}
              </ResponsiveButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
