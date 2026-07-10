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
      className='container max-w-(--breakpoint-xl) mx-auto w-full px-4 py-10'>
      <div className='space-y-6 lg:space-y-8'>
        <h2
          data-aos='fade-up'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center'>
          Calculators
        </h2>
        <p
          data-aos='fade-up'
          className='mt-2 text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-2xl mx-auto'>
          Elevate your financial journey with our intuitive tools, crafted to
          empower your decisions and bring your aspirations to life.
        </p>
        <div className='flex flex-wrap justify-center gap-6'>
          {calculators.map((calculator) => (
            <Card
              data-aos='zoom-in-up'
              key={calculator.title}
              className='relative overflow-hidden gap-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'>
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
