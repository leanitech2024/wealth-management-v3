import { plannings } from '@/constants';
import PlanningCard from './planning-card';

export default function Planning() {
  return (
    <section id='planning' className='max-w-(--breakpoint-xl) mx-auto w-full'>
      <div className='py-10 px-6'>
        <h2
          data-aos='fade-down'
          className='text-[15px] min-[400px]:text-base sm:text-2xl md:text-3xl lg:text-4xl text-center mx-auto max-w-2xl md:leading-[1.2] font-semibold tracking-[-0.03em]'>
          Your Financial Future, Thoughtfully Planned
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
