import { Blockquote, BlockquoteAuthor } from './extends/blockquote';
import { LazyStatCard } from './lazy-components';

export default function Stats() {
  return (
    <section className='max-w-(--breakpoint-xl) mx-auto w-full py-10 px-6'>
      <div className='text-center space-y-4 md:space-y-6 lg:space-y-8'>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter'>
          Why Should You Choose Us?
        </h2>


        <Blockquote>
          When a management with a reputation for brilliance, tackles a business
          with a reputation for bad economics, it is the reputation of the
          business that remains intact
          <BlockquoteAuthor>Warren Buffett</BlockquoteAuthor>
        </Blockquote>

        <LazyStatCard />
      </div>
    </section>
  );
}
