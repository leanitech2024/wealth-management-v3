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
import {
  retirementSchema,
  type RetirementCalculatorValues,
} from '@/lib/zod.schemas';
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
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';

type RetirementFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function RetirementForm(props: RetirementFormProps) {
  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<RetirementCalculatorValues>({
    resolver: zodResolver(retirementSchema),
    defaultValues: {
      name: '',
      currentMonthlyExpenses: '',
      existingInvestment: '',
      currentAge: 0,
      retirementAge: 0,
      lifeExpectancy: 0,
      inflationRate: 0,
      postRetirementInflationRate: 0,
      postRetirementRiskFreeRate: 0,
      returnOnExistingInvestment: 0,
      returnOnNewInvestment: 0,
    },
    mode: 'onChange',
  });

  useFormPersist('retirement-form', {
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

  const onError: SubmitErrorHandler<RetirementCalculatorValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof RetirementCalculatorValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<RetirementCalculatorValues> = (data) => {
    // console.log('Form data:', data);
    toast.success(<pre>{`${JSON.stringify(data, null, 2)}`}</pre>, {
      description: 'Retirement calculation submitted successfully!',
      position: 'bottom-right',
    });
    onOpenEmail(true); // open next dialog
    onParentClose(false); // close the calculator modal
    onUpdateSessionKey('retirement-form');
  };

  return (
    <form
      className={'space-y-4'}
      onSubmit={form.handleSubmit(onSubmit, onError)}>
      <FieldSet>
        <FieldLegend className={cn(isDesktop ? '' : 'sr-only')}>
          {title}
        </FieldLegend>
        <FieldDescription className={cn(isDesktop ? '' : 'sr-only')}>
          {desc}
        </FieldDescription>

        {isDesktop ? <FieldSeparator /> : null}

        <ScrollArea className='h-96 w-full'>
          <div className={'space-y-4 pl-2 pr-4 pb-4'}>
            <FieldGroup className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
              <Controller
                name='name'
                control={form.control}
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
                name='currentMonthlyExpenses'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='current-expenses'>
                      Current monthly expenses
                    </FieldLabel>
                    <Input
                      id='current-expenses'
                      placeholder='ex. 10000'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Enter your current monthly expenses
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Controller
              name='existingInvestment'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='existing-investment'>
                    Existing investment
                  </FieldLabel>
                  <Input
                    id='existing-investment'
                    placeholder='ex. 500000'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error ? (
                    <FieldError role='alert' errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      Enter the amount you have already saved for retirement
                    </FieldDescription>
                  )}
                </Field>
              )}
            />

            <FieldGroup className={'gap-4'}>
              <Controller
                name='currentAge'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='current-age'>Current age</FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set your current age (
                        <span className='font-medium tabular-nums'>
                          {/* {currentAge[0]} */}
                          {field.value}
                        </span>
                        ).
                      </FieldDescription>
                    )}
                    <Slider
                      id='current-age'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={55}
                      min={1}
                      step={1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='retirementAge'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='retirement-age'>
                      Retirement age
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set your desired retirement age (
                        <span className='font-medium tabular-nums'>
                          {/* {retirementAge[0]} */}
                          {field.value}
                        </span>
                        ).
                      </FieldDescription>
                    )}
                    <Slider
                      id='retirement-age'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={75}
                      min={18}
                      step={1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='lifeExpectancy'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='life-expectance'>
                      Life expectance (Years)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set your life expectance (
                        <span className='font-medium tabular-nums'>
                          {/* {lifeExpectancy[0]} */}
                          {field.value}
                        </span>
                        ).
                      </FieldDescription>
                    )}
                    <Slider
                      id='life-expectance'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={80}
                      min={18}
                      step={1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='inflationRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='inflation-rate'>
                      Inflation Rate (%)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set inflation rate (
                        <span className='font-medium tabular-nums'>
                          {/* {inflationRate[0]} */}
                          {field.value}
                        </span>
                        %)
                      </FieldDescription>
                    )}
                    <Slider
                      id='inflation-rate'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={20}
                      min={4}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='postRetirementInflationRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='post-retirement-inflation-rate'>
                      Post retirement inflation (%)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set post-retirement inflation rate (
                        <span className='font-medium tabular-nums'>
                          {/* {postRetirementInflationRate[0]} */}
                          {field.value}
                        </span>
                        %)
                      </FieldDescription>
                    )}
                    <Slider
                      id='post-retirement-inflation-rate'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={20}
                      min={4}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='postRetirementRiskFreeRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='post-retirement-risk-free-rate'>
                      Post retirement risk free rate of return (%)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set post-retirement risk free rate (
                        <span className='font-medium tabular-nums'>
                          {/* {postRetirementRiskFreeRate[0]} */}
                          {field.value}
                        </span>
                        %)
                      </FieldDescription>
                    )}
                    <Slider
                      id='post-retirement-risk-free-rate'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={13}
                      min={2}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='returnOnExistingInvestment'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='return-on-existing-investment'>
                      Return on existing investment (%)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set return on your existing investment (
                        <span className='font-medium tabular-nums'>
                          {/* {existingInvestment[0]} */}
                          {field.value}
                        </span>
                        %)
                      </FieldDescription>
                    )}
                    <Slider
                      id='return-on-existing-investment'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={13}
                      min={2}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name='returnOnNewInvestment'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='return-on-new-investment'>
                      Return on new investment (%)
                    </FieldLabel>
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set return on your new investment (
                        <span className='font-medium tabular-nums'>
                          {/* {newInvestment[0]} */}
                          {field.value}
                        </span>
                        %)
                      </FieldDescription>
                    )}
                    <Slider
                      id='return-on-new-investment'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={13}
                      min={2}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </ScrollArea>
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
