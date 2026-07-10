import { zodResolver } from '@hookform/resolvers/zod';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import { Dispatch, SetStateAction } from 'react';
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import { toast } from 'sonner';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { swpSchema, type SWPCalculatorValues } from '@/lib/zod.schemas';
import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { DrawerClose, DrawerFooter } from '../ui/drawer';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';

type SWPFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function SWPForm(props: SWPFormProps) {
  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<SWPFormValues>({
    resolver: zodResolver(swpSchema),
    defaultValues: {
      name: '',
      totalCorpus: '5000000',
      monthlyWithdrawal: '30000',
      expectedReturn: 8,
      projectionPeriod: 20,
    },
    mode: 'onChange',
  });

  useFormPersist('swp-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage,
    validate: false,
    dirty: true,
    touch: true,
    debounceDelay: 300,
    onDataRestored: () => {
      toast.success('Restored your previous calculation data!', {
        description: 'You can continue where you left off.',
        position: 'bottom-left',
      });
    },
    onTimeout: () => {
      toast.error('Previous calculation data expired!', {
        description: 'The saved data was older than 24 hours.',
        position: 'bottom-left',
      });
    },
    timeout: 1000 * 60 * 60 * 24,
  });

  const onError: SubmitErrorHandler<SWPFormValues> = (errors) => {
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof SWPFormValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<SWPFormValues> = (data) => {
    toast.success('SWP calculation submitted successfully!', {
      description: 'Your cash flow roadmap is being compiled.',
      position: 'bottom-right',
    });
    onOpenEmail(true);
    onParentClose(false);
    onUpdateSessionKey('swp-form');
  };

  return (
    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit, onError)}>
      <FieldSet className='pb-2'>
        <FieldLegend className={cn(isDesktop ? '' : 'sr-only')}>
          {title}
        </FieldLegend>
        <FieldDescription className={cn(isDesktop ? '' : 'sr-only')}>
          {desc}
        </FieldDescription>

        {isDesktop ? <FieldSeparator /> : null}

        <FieldGroup className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  id='name'
                  placeholder='ex. John Doe'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>Enter your full name</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='totalCorpus'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='total-corpus'>Total Corpus (₹)</FieldLabel>
                <Input
                  id='total-corpus'
                  placeholder='ex. 5000000'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Enter the initial lump-sum corpus amount
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className='grid grid-cols-1 gap-4 mt-4'>
          <Controller
            name='monthlyWithdrawal'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='monthly-withdrawal'>Monthly Withdrawal (₹)</FieldLabel>
                <Input
                  id='monthly-withdrawal'
                  placeholder='ex. 30000'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Enter the fixed amount to withdraw each month
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name='expectedReturn'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='expected-return'>
                  Expected Return: <span className='font-semibold tabular-nums'>{field.value}% p.a.</span>
                </FieldLabel>
                <Slider
                  id='expected-return'
                  value={[field.value]}
                  onValueChange={(e) => field.onChange(e[0])}
                  min={1}
                  max={20}
                  step={0.5}
                />
                {fieldState.error && <FieldError role='alert' errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='projectionPeriod'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='projection-period'>
                  Projection Period: <span className='font-semibold tabular-nums'>{field.value} years</span>
                </FieldLabel>
                <Slider
                  id='projection-period'
                  value={[field.value]}
                  onValueChange={(e) => field.onChange(e[0])}
                  min={5}
                  max={50}
                  step={1}
                />
                {fieldState.error && <FieldError role='alert' errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <Separator />

      {!isDesktop ? (
        <DrawerFooter className='pt-2'>
          <Button type='submit' size='sm'>
            Calculate
          </Button>
          <DrawerClose asChild>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      ) : (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' size='sm'>
            Calculate
          </Button>
        </DialogFooter>
      )}
    </form>
  );
}

type SWPFormValues = SWPCalculatorValues;
