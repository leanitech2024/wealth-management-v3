import { services } from '@/constants';
import ServiceCard from './service-card';

export default function Services() {
  return (
    <section
      id='services'
      className='max-w-(--breakpoint-xl) mx-auto w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6'>
      <div className='text-center space-y-6 lg:space-y-8'>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto'>
          Discover Our Exceptional Services
        </h2>

        <div className='w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {services
            .filter((service) => service.title !== 'Goal Based Financial Planning')
            .map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
        </div>
      </div>
    </section>
  );
}
