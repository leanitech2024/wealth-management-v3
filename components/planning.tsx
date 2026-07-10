import { plannings } from '@/constants';
import PlanningCard from './planning-card';

export default function Planning() {
  return (
    <section id='planning' className='max-w-(--breakpoint-xl) mx-auto w-full'>
      <div className='py-10 px-6'>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-2xl text-pretty sm:mx-auto sm:text-center'>
          Your Financial Future,<br className='md:hidden' /> Thoughtfully Planned
        </h2>
        <div className='mt-8 md:mt-16 w-full mx-auto space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20 overflow-hidden'>
          {/* {plannings.map((plan, idx) => (
            <ScrollSectionAnimation
              direction={plan.direction as 'left' | 'right'}
              key={plan.id}>
              <PlanningCard key={plan.id} plan={plan} idx={idx} />
            </ScrollSectionAnimation>
          ))} */}
          {plannings.map((plan, idx) => (
            <PlanningCard key={plan.id} plan={plan} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
