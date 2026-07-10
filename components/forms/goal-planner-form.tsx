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
import { goalPlannerSchema, type GoalPlannerCalculatorValues } from '@/lib/zod.schemas';
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

type GoalPlannerFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function GoalPlannerForm(props: GoalPlannerFormProps) {
  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<GoalPlannerFormValues>({
    resolver: zodResolver(goalPlannerSchema),
    defaultValues: {
      name: '',
      targetAmount: '5000000',
      timePeriod: 10,
      expectedReturn: 12,
    },
    mode: 'onChange',
  });

  useFormPersist('goal-planner-form', {
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

  const onError: SubmitErrorHandler<GoalPlannerFormValues> = (errors) => {
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof GoalPlannerFormValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<GoalPlannerFormValues> = (data) => {
    toast.success('Goal Planner calculation submitted successfully!', {
      description: 'Your plan is being generated.',
      position: 'bottom-right',
    });
    onOpenEmail(true);
    onParentClose(false);
    onUpdateSessionKey('goal-planner-form');
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
            name='targetAmount'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='target-amount'>Target Goal Amount (₹)</FieldLabel>
                <Input
                  id='target-amount'
                  placeholder='ex. 5000000'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error ? (
                  <FieldError role='alert' errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Enter the target amount of money to accumulate
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className='grid grid-cols-1 gap-4 mt-4'>
          <Controller
            name='timePeriod'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='time-period'>
                  Time Period: <span className='font-semibold tabular-nums'>{field.value} years</span>
                </FieldLabel>
                <Slider
                  id='time-period'
                  value={[field.value]}
                  onValueChange={(e) => field.onChange(e[0])}
                  min={1}
                  max={40}
                  step={1}
                />
                {fieldState.error && <FieldError role='alert' errors={[fieldState.error]} />}
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
                  max={25}
                  step={0.5}
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

type GoalPlannerFormValues = GoalPlannerCalculatorValues;
