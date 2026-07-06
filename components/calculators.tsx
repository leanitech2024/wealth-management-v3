import { calculators } from '@/constants';

import { ShineBorder } from './extends/shine-border';
import { LazyCaclculatorDrawerDialog } from './forms/lazy-components';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export default function Calculators() {
  return (
    <section
      id='calculators'
      className='container max-w-(--breakpoint-xl) mx-auto w-full px-4 py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='space-y-6 lg:space-y-8'>
        <h2
          data-aos='fade-up'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center'>
          Calculators
        </h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {calculators.map((calculator) => (
            <Card
              data-aos='zoom-in-up'
              key={calculator.title}
              className='relative overflow-hidden gap-4'>
              <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
              <CardHeader className={'text-center'}>
                <div className='mb-4 size-12 mx-auto flex items-center justify-center bg-accent rounded-full'>
                  <calculator.icon className='size-6' />
                </div>
                <CardTitle>
                  <h3 className='text-base lg:text-lg font-semibold'>
                    {calculator.title}
                  </h3>
                </CardTitle>
                <CardDescription>
                  <p className='mt-1 text-foreground/80 text-sm md:text-base'>
                    {calculator.description}
                  </p>
                </CardDescription>
              </CardHeader>

              <CardFooter className='mt-auto'>
                <LazyCaclculatorDrawerDialog
                  title={calculator.title}
                  desc={calculator.description}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
