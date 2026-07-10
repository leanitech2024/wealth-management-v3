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
  educationSchema,
  type EducationCalculatorValues,
} from '@/lib/zod.schemas';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

type EducationFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function EducationForm(props: EducationFormProps) {
  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<EducationCalculatorValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      name: 'jhon', // '',
      childName: 'jack', // '',
      childAge: 5, // 0,
      higherEducationAge: 23, // 0,
      inflationRate: 6, //0,
      existingInvestmentRate: 7, // 0,
      newInvestmentRate: 8, // 0,
      currentCost: '50000', // '',
      currentInvestment: '4545454', // '',
    },
    mode: 'onChange',
  });

  useFormPersist('education-form', {
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

  const onError: SubmitErrorHandler<EducationCalculatorValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof EducationCalculatorValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<EducationCalculatorValues> = () => {
    // console.log('Form data:', values);
    // toast.success(<pre>{`${JSON.stringify(values, null, 2)}`}</pre>, {
    //   description: 'Education calculation submitted successfully!',
    //   position: 'bottom-right',
    // });
    onOpenEmail(true); // open next dialog
    onParentClose(false); // close the calculator modal
    onUpdateSessionKey('education-form');
  };

  return (
    <form
      className={'space-y-4 h-full'}
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
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Enter your full name</FieldDescription>
                    )}
                  </Field>
                )}
              />

              <Controller
                name='childName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='child-name'>Child name</FieldLabel>
                    <Input
                      id='child-name'
                      placeholder='ex. Little Rabbit'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Enter your child full name
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className={'gap-4'}>
              <Controller
                name='childAge'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='child-age'>Child Age</FieldLabel>
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set your children age (
                        <span className='font-medium tabular-nums'>
                          {/* {childAge[0]} */}
                          {field.value}
                        </span>
                        ).
                      </FieldDescription>
                    )}

                    <Slider
                      id='child-age'
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
                name='higherEducationAge'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='higher-education-age'>
                      Higher education age
                    </FieldLabel>
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set higher education age(
                        <span className='font-medium tabular-nums'>
                          {/* {higherEducationAge[0]} */}
                          {field.value}
                        </span>
                        ).
                      </FieldDescription>
                    )}
                    <Slider
                      id='higher-education-age'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={50}
                      min={18}
                      step={1}
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
              <Controller
                name='currentCost'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='current-cost'>
                      Current cost of higher education
                    </FieldLabel>
                    <Input
                      id='current-cost'
                      placeholder='e.g., 25,00,000'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Provide details about current education cost
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />

              <Controller
                name='currentInvestment'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='current-investment'>
                      Current investment for the goal
                    </FieldLabel>
                    <Input
                      id='current-investment'
                      placeholder='e.g., 5,00,000'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Provide details about your current investment
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className={'gap-4'}>
              <Controller
                name='inflationRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='inflation-rate'>
                      Inflation Rate
                    </FieldLabel>
                    {fieldState?.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Set inflation rate for education cost (
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
                      max={15}
                      min={4}
                      step={0.1}
                    />
                  </Field>
                )}
              />

              <Controller
                name='existingInvestmentRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='existing-investment'>
                      Return on existing investment
                    </FieldLabel>
                    {fieldState?.error ? (
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
                      id='existing-investment'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={13}
                      min={2}
                      step={0.1}
                    />
                  </Field>
                )}
              />

              <Controller
                name='newInvestmentRate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='new-investment'>
                      Return on new investment
                    </FieldLabel>
                    <FieldDescription>
                      Set return on your new investment (
                      <span className='font-medium tabular-nums'>
                        {/* {newInvestment[0]} */}
                        {field.value}
                      </span>
                      %)
                    </FieldDescription>
                    <Slider
                      id='new-investment'
                      value={[field.value]}
                      onValueChange={(e) => {
                        field.onChange(e[0]);
                      }}
                      max={13}
                      min={2}
                      step={0.1}
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
