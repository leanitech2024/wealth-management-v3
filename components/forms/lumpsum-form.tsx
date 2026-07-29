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
import { lumpSumSchema, type LumpSumCalculatorValues } from '@/lib/zod.schemas';
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

type LumpsumFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function LumpsumForm(props: LumpsumFormProps) {
  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<LumpSumCalculatorValues>({
    resolver: zodResolver(lumpSumSchema),
    defaultValues: {
      name: '',
      investmentAmount: '',
      noOfYears: 0,
      expectedReturn: 0,
    },
    mode: 'onChange',
  });

  useFormPersist('lumpsum-form', {
    control: form.control,
    setValue: form.setValue,
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    validate: false, // Trigger validation when data is restored
    dirty: true, // Mark form as dirty
    touch: true, // Mark fields as touched
    debounceDelay: 300, // Save after 300ms of inactivity
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
    timeout: 1000 * 60 * 60 * 24, // 24 hours
  });

  const onError: SubmitErrorHandler<LumpSumCalculatorValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof LumpSumCalculatorValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<LumpSumCalculatorValues> = (data) => {
    // console.log('Form data:', data);
    toast.success('Lump sum calculation submitted successfully!', {
      position: 'bottom-right',
    });
    onOpenEmail(true); // open next dialog
    onParentClose(false); // close the calculator modal
    onUpdateSessionKey('lumpsum-form');
  };

  return (
    <form
      className={'space-y-4'}
      onSubmit={form.handleSubmit(onSubmit, onError)}>
      <FieldSet className={'pb-2'}>
        <FieldLegend className={cn(isDesktop ? '' : 'sr-only')}>
          {title}
        </FieldLegend>
        <FieldDescription className={cn(isDesktop ? '' : 'sr-only')}>
          {desc}
        </FieldDescription>

        {isDesktop ? <FieldSeparator /> : null}

        <FieldGroup className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
          <Controller
            name='name'
            control={form.control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  id='name'
                  placeholder='ex. Evil Rabbit'
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
            name='investmentAmount'
            control={form.control}
            defaultValue=''
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='investment-amount'>
                  Investment amount
                </FieldLabel>
                <Input
                  id='investment-amount'
                  placeholder='ex. 10000'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Enter the amount you plan to invest as a lump sum
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className={'gap-4'}>
          <Controller
            name='noOfYears'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='no-of-years'>No. of years</FieldLabel>
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Set the number of years you plan to invest (
                    <span className='font-medium tabular-nums'>
                      {/* {noOfYears[0]} */}
                      {field.value}
                    </span>
                    )
                  </FieldDescription>
                )}
                <Slider
                  id='no-of-years'
                  value={[field.value]}
                  onValueChange={(e) => {
                    field.onChange(e[0]);
                  }}
                  max={50}
                  step={1}
                />
              </Field>
            )}
          />

          <Controller
            name='expectedReturn'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='expected-return'>
                  Expected Return
                </FieldLabel>
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Set expected return rate (
                    <span className='font-medium tabular-nums'>
                      {/* {expectedReturn[0]} */}
                      {field.value}
                    </span>
                    %)
                  </FieldDescription>
                )}
                <Slider
                  id='higher-education-age'
                  value={[field.value]}
                  onValueChange={(e) => {
                    field.onChange(e[0]);
                  }}
                  max={13}
                  min={2}
                  step={1}
                />
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
