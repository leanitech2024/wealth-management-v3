import { Blockquote, BlockquoteAuthor } from './extends/blockquote';
import { services } from '@/constants';
import ServiceCard from './service-card';

export default function Services() {
  return (
    <section
      id='services'
      className='max-w-(--breakpoint-xl) mx-auto w-full py-10 px-6'>
      <div className='text-center space-y-6 lg:space-y-8'>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto'>
          Discover Our Exceptional Services
        </h2>
        <div data-aos='fade-down' data-aos-delay='100' className='flex justify-center'>
          <Blockquote size='lg' className='w-fit mx-auto'>
            Wealth is not about having lot of money: Its about having a lot of options.
            <BlockquoteAuthor>Chris Rock</BlockquoteAuthor>
          </Blockquote>
        </div>

        <div className='w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {services
            .filter(
              (service) =>
                service.title !== 'Goal Based Financial Planning' &&
                service.title !== "It's Time To Begin Your Ascent!"
            )
            .map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
        </div>
      </div>
    </section>
  );
}
