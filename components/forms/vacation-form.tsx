import { zodResolver } from '@hookform/resolvers/zod';
import { useFormPersist } from '@liorpo/react-hook-form-persist';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
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
  vacationSchema,
  type VacationCalculatorValues,
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

type VacationFormProps = {
  title: string;
  desc: string;
  onParentClose: Dispatch<SetStateAction<boolean>>;
  onOpenEmail: Dispatch<SetStateAction<boolean>>;
  onUpdateSessionKey: Dispatch<SetStateAction<SessionKey | undefined>>;
};

export default function VacationForm(props: VacationFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { title, desc, onParentClose, onOpenEmail, onUpdateSessionKey } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<VacationCalculatorValues>({
    resolver: zodResolver(vacationSchema),
    defaultValues: {
      name: '',
      childName: '',
      afterHowManyYears: 0,
      currentCost: '',
      currentInvestment: '',
      inflationRate: 0,
      existingInvestmentRate: 0,
      newInvestmentRate: 0,
    },
    mode: 'onChange',
  });

  useFormPersist('vacation-form', {
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

  const onError: SubmitErrorHandler<VacationCalculatorValues> = (errors) => {
    // console.log('Form errors:', errors);
    Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName as keyof VacationCalculatorValues];
      toast.error(fieldError?.message, {
        description: ' Please check the ' + fieldName + ' field.',
      });
    });
  };

  const onSubmit: SubmitHandler<VacationCalculatorValues> = (data) => {
    // console.log('Form data:', data);
    toast.success(<pre>{`${JSON.stringify(data, null, 2)}`}</pre>, {
      description: 'Vacation calculation submitted successfully!',
      position: 'bottom-right',
    });
    onOpenEmail(true); // open next dialog
    onParentClose(false); // close the calculator modal
    onUpdateSessionKey('vacation-form');
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
            <FieldGroup>
              {previewUrl ? (
                <Field>
                  <FieldLabel>Vacation Image Preview</FieldLabel>
                  <div
                    className={
                      'w-(--radix-dialog-content) h-64 mx-auto relative'
                    }>
                    <Image
                      src={previewUrl}
                      alt='Vacation cover Preview'
                      width={500}
                      height={500}
                      className='mt-2 w-full h-full object-cover'
                      onLoad={
                        // Release the object URL after the image is loaded
                        () => {
                          URL.revokeObjectURL(previewUrl);
                        }
                      }
                    />
                    <Button
                      type='button'
                      size={'icon-sm'}
                      variant={'destructive'}
                      className='absolute top-2 right-2'
                      onClick={() => {
                        setPhoto(null);
                        setPreviewUrl(null);
                      }}>
                      <Trash2Icon className={'size-4'} />
                    </Button>
                  </div>
                </Field>
              ) : (
                <Field>
                  <FieldLabel htmlFor='photo'>Upload a image</FieldLabel>
                  <Input
                    id='photo'
                    type='file'
                    accept='image/*'
                    placeholder='Choose an image for vacation'
                    value={photo ? undefined : ''}
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setPhoto(file);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        // console.log(url);
                        setPreviewUrl(url);
                      } else {
                        setPreviewUrl(null);
                      }
                    }}
                  />
                  <FieldDescription>
                    Upload an image representing your vacation goal
                  </FieldDescription>
                </Field>
              )}
            </FieldGroup>

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
                    {fieldState.error ? (
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

            <Controller
              name='afterHowManyYears'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='after-how-many-years'>
                    After how many years ?
                  </FieldLabel>
                  {fieldState.error ? (
                    <FieldError role='alert' errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      Set after how many years you plan to go for vacation (
                      <span className='font-medium tabular-nums'>
                        {/* {afterHowManyYears[0]} */}
                        {field.value}
                      </span>
                      ).
                    </FieldDescription>
                  )}
                  <Slider
                    id='after-how-many-years'
                    value={[field.value]}
                    onValueChange={(e) => {
                      field.onChange(e[0]);
                    }}
                    max={30}
                    step={1}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            <FieldGroup className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
              <Controller
                name='currentCost'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='current-cost-of-vacation'>
                      Current cost of vacation
                    </FieldLabel>
                    <Input
                      id='current-cost-of-vacation'
                      placeholder='ex. 100000'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Enter the current cost of the vacation
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
                    <FieldLabel htmlFor='current-investment-for-goal'>
                      Current investment for the goal
                    </FieldLabel>
                    <Input
                      id='current-investment-for-goal'
                      placeholder='ex. 50000'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error ? (
                      <FieldError role='alert' errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Enter the amount you have already saved for this goal
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
                      aria-invalid={fieldState.invalid}
                      max={20}
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
                      aria-invalid={fieldState.invalid}
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
                      aria-invalid={fieldState.invalid}
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
