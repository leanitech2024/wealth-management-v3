import { Button } from '@/components/ui/button';
import {
  BinocularsIcon,
  CheckCircle2Icon,
  FootprintsIcon,
  PencilIcon,
  RocketIcon,
  SproutIcon,
} from 'lucide-react';
import Image from 'next/image';
import AboutUsImg from '@/public/images/about-us.jpeg';

// import Banner from '@/components/shared/banner';
import { CTABlock } from '@/components/shared/cta-block';
import GlareEffect from '@/components/shared/glare-effect';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const aboutListItems = [
  {
    id: crypto.randomUUID(),
    heading: 'Decisions were often influenced by:',
    items: [
      'Short-term market movements',
      'Scattered advice',
      'Lack of long-term clarity',
    ],
  },
  {
    id: crypto.randomUUID(),
    heading: 'The goal was to create a practice that focuses on:',
    items: [
      'Structured thinking',
      'Clear communication',
      'Disciplined execution',
    ],
  },
];

const statsList = [
  {
    id: crypto.randomUUID(),
    title: 'Years Of Experience',
    number: '10+',
    description:
      'Delivering trusted financial guidance with expertise and consistency.',
  },
  {
    id: crypto.randomUUID(),
    title: 'Trusted Families',
    number: '150+',
    description:
      'Helping families grow, manage, and preserve wealth confidently.',
  },
];

/*
PROCESS SECTION
 
Heading:
How We Work
 
Subheading:
Structured financial guidance designed to help individuals and families build, protect, and grow wealth with confidence.
*/

// https://play.tailwindcss.com/nRy3spfqVd

const processSteps = [
  {
    id: crypto.randomUUID(),
    title: 'Discover',
    description: 'Understanding your goals, priorities, and financial vision.',
    icon: BinocularsIcon,
  },
  {
    id: crypto.randomUUID(),
    title: 'Strategize',
    description: 'Building a tailored wealth plan aligned to your needs.',
    icon: FootprintsIcon,
  },
  {
    id: crypto.randomUUID(),
    title: 'Execute',
    description: 'Implementing the right financial solutions seamlessly.',
    icon: RocketIcon,
  },
  {
    id: crypto.randomUUID(),
    title: 'Grow',
    description: 'Monitoring, protecting, and growing your wealth long term.',
    icon: SproutIcon,
  },
];

export default function AboutPage() {
  return (
    <main
      className={
        'max-w-(--breakpoint-lg) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16'
      }>
      {/* <Banner /> */}

      <section className={'grid grid-cols-3 gap-8 mt-30'}>
        {/* <div className={'col-span-full md:col-span-1'}>
          <GlareEffect
            className={
              'relative aspect-square w-full h-full rounded-tl-4xl rounded-br-4xl'
            }>
            <Image
              // src='https://placehold.co/600x1200/png?text=Founder+Image'
              src='/assets/1.jpg'
              alt='founder'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className={'object-cover rounded-tl-4xl rounded-br-4xl'}
            />
          </GlareEffect>
        </div> */}
        <div className={'col-span-full space-y-2 md:space-y-3'}>
          <h2
            className={
              'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary'
            }>
            <PencilIcon className={'inline-block size-4 md:size-6 mr-2'} />
            Founder’s Note
          </h2>

          <h3
            className={
              'text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold'
            }>
            Ascent Wealth was built on a simple observation.
          </h3>
          <p
            className={'text-xs sm:text-sm md:text-base text-muted-foreground'}>
            People were earning well and saving regularly, yet many still felt
            unsure about their financial direction. There was no shortage of
            products. But there was a lack of structure.
          </p>

          <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            {aboutListItems.map((list) => (
              <div key={list.id} className={'space-y-2'}>
                <p
                  className={
                    'text-muted-foreground text-xs sm:text-sm md:text-base font-semibold'
                  }>
                  {list.heading}
                </p>
                <ul className={'space-y-2'}>
                  {list.items.map((item) => (
                    <li
                      key={item}
                      className={
                        'group flex items-center gap-2 transition-colors duration-200 hover:cursor-pointer text-xs sm:text-sm md:text-base'
                      }>
                      <CheckCircle2Icon
                        className={
                          'size-4 md:size-5 group-hover:stroke-chart-1 dark:group-hover:stroke-primary group-hover:cursor-pointer'
                        }
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* <div>
              <p className={'text-muted-foreground text-base font-semibold'}>
                Decisions were often influenced by:
              </p>
              <ul className={'group'}>
                <li
                  className={
                    'flex items-center gap-2 group-hover:cursor-pointer'
                  }>
                  <CheckCircle2Icon
                    className={
                      'size-4 group-hover:stroke-primary transition-colors duration-200'
                    }
                  />
                  Short-term market movements
                </li>
                <li
                  className={
                    'flex items-center gap-2 group-hover:cursor-pointer'
                  }>
                  <CheckCircle2Icon
                    className={
                      'size-4 group-hover:stroke-primary transition-colors duration-200'
                    }
                  />
                  Scattered advice
                </li>
                <li
                  className={
                    'flex items-center gap-2 group-hover:cursor-pointer'
                  }>
                  <CheckCircle2Icon
                    className={
                      'size-4 group-hover:stroke-primary transition-colors duration-200'
                    }
                  />
                  Lack of long-term clarity
                </li>
              </ul>
            </div>

            <div>
              <p className={'text-muted-foreground text-base font-semibold'}>
                The goal was to create a practice that focuses on:
              </p>
              <ul className={'list-[upper-roman] list-inside'}>
                <li>Structured thinking</li>
                <li>Clear communication</li>
                <li>Disciplined execution</li>
              </ul>
            </div> */}
          </div>

          <p
            className={'text-xs sm:text-sm md:text-base text-muted-foreground'}>
            Over the last decade, working with 150+ clients, the approach has
            remained the same. Not chasing complexity, but building consistency.
            Because in the long run, disciplined decisions tend to matter more
            than perfect ones.
          </p>

          {/* <div className={'inline-flex items-center gap-2'}>
            <SignatureIcon className={'size-6'} />
            <p
              className={
                'text-muted-foreground text-lg font-medium underline decoration-dotted underline-offset-2'
              }>
              Ascent Wealth
            </p>
          </div> */}
        </div>
      </section>

      <section className={'h-full w-full'}>
        <div className={'grid grid-cols-12 gap-6'}>
          <div className={'col-span-12 lg:col-span-6 w-full h-full'}>
            <GlareEffect
              className={
                'relative w-fit h-fit rounded-tl-4xl rounded-br-4xl overflow-hidden flex'
              }>
              <Image
                src={AboutUsImg}
                alt='about us'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className={
                  'w-full h-auto object-contain rounded-tl-4xl rounded-br-4xl'
                }
              />
            </GlareEffect>
          </div>
          <div
            className={
              'col-span-12 lg:col-span-6 grid grid-cols-subgrid gap-4 w-full h-full'
            }>
            {statsList.map((stat) => (
              <div
                className={'col-span-full md:col-span-6 lg:col-span-3'}
                key={stat.id}>
                <div
                  className={cn(
                    'border border-dashed border-border/70 hover:border-primary flex h-full items-start p-1 rounded-xl group transition-colors duration-150 w-full',
                  )}
                  key={stat.id}>
                  <Card className='rounded-lg bg-muted/20 h-full gap-4 p-4 justify-center group-hover:dark:bg-primary group-hover:bg-primary transition-colors duration-150 w-full'>
                    <CardHeader>
                      <CardTitle
                        className={'font-semibold group-hover:text-accent'}>
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3
                        className={
                          'text-4xl font-bold text-primary group-hover:text-accent'
                        }>
                        {stat.number}
                      </h3>
                      {/* <span className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight'>
                        <SlotCounter
                          dummyCharacterCount={10}
                          useMonospaceWidth
                          value={stat.value}
                          animateOnVisible={{
                            triggerOnce: false,
                            rootMargin: '0px 0px -100px 0px',
                          }}
                        />
                        <sup
                          className={
                            'text-base sm:text-lg md:text-xl lg:text-2xl'
                          }>
                          {stat.suffix}
                        </sup>
                      </span> */}
                    </CardContent>
                    <CardContent>
                      <CardDescription>
                        <p
                          className={
                            'font-semibold text-sm group-hover:text-accent'
                          }>
                          {stat.description}
                        </p>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={'h-full w-full space-y-4 md:space-y-6 lg:space-y-8'}>
        <div
          className={'text-center spayce-y-4 md:space-y-6 max-w-3xl mx-auto'}>
          <h2
            className={
              'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-muted-foreground dark:text-foreground font-bold'
            }>
            How We <span className={'text-primary'}>Work</span>
          </h2>
          <p
            className={'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'}>
            Structured financial guidance designed to help individuals and
            families build, protect, and grow wealth with confidence.
          </p>
        </div>

        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4'
          }>
          {processSteps.map((step, idx) => (
            <Card key={step.id}>
              <CardContent className='relative group w-full cursor-pointer text-center'>
                {/* <!-- Outer Ring & Icon Container --> */}
                <div className='relative z-10 inline-flex size-10 md:size-20 lg:size-30 xl:size-40 items-center justify-center rounded-full border-[1.6px] border-accent group-hover:border-primary transition-all duration-500'>
                  {/* <!-- The "Absolute Number" / Icon --> */}
                  <span className='relative z-30 font-normal text-primary transition-colors duration-500 group-hover:text-background'>
                    <step.icon
                      className={
                        'size-6 md:size-8 lg:size-12 xl:size-16 stroke-1'
                      }
                    />
                  </span>

                  {/* <!-- The Expanding Inner Circle (Hover background) --> */}
                  <div className='absolute inset-0 z-20 m-0.4 md:m-2.5 lg:m-4.75 scale-0 rounded-full bg-primary opacity-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100'></div>

                  {/* position idx+1 top-right */}
                  <span
                    className={cn(
                      'absolute top-2 right-2 z-40 translate-x-4 lg:translate-x-2 rounded-full bg-background dark:bg-muted-foreground text-primary size-8 md:flex items-center justify-center text-sm font-bold shadow-md hidden',
                    )}>
                    {idx + 1}
                  </span>
                </div>

                {/* <!-- Typography --> */}
                <CardHeader className={'px-0'}>
                  <CardTitle className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground transition-colors duration-500 group-hover:text-primary'>
                    {step.title}
                  </CardTitle>

                  <CardDescription className='text-xs sm:text-base leading-relaxed text-muted-foreground'>
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={'grid grid-cols-4 gap-4'}>
        <div
          // className={'col-span-full lg:col-span-2 space-y-4 py-6'}
          className={'col-span-full py-6 space-y-4'}>
          <h2
            className={
              'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary'
            }>
            Who We Are
          </h2>
          <p
            className={'text-xs sm:text-sm md:text-base text-muted-foreground'}>
            At Ascent Wealth, we help individuals and families bring structure
            and clarity to their financial lives. With over{' '}
            <strong>10 years of experience</strong> and{' '}
            <strong>150+ clients served</strong>, our work is built on
            consistency, not noise. We focus on simplifying financial decisions
            so clients can move forward with confidence. We believe wealth is
            not just about returns. It is about clarity, discipline, and
            long-term alignment.
          </p>

          <div
            className={
              'grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 space-y-4'
            }>
            <div>
              <h3 className={'font-3xl font-bold'}>Our Mission</h3>
              <p
                className={
                  'text-muted-foreground text-xs sm:text-sm md:text-base'
                }>
                To help individuals make informed financial decisions through
                structured, goal-based planning. We aim to simplify investing so
                that people can focus less on market noise and more on steady
                progress.
              </p>
            </div>
            <div>
              <h3 className={'font-3xl font-bold'}>Our Vision</h3>
              <p
                className={
                  'text-muted-foreground text-xs sm:text-sm md:text-base'
                }>
                To build a trusted financial services practice where advice is
                clear, processes are transparent, and relationships are
                long-term.
              </p>
            </div>
          </div>

          <Button asChild>
            <Link prefetch href={'?contact=true'}>
              Let&apos;s Connect
            </Link>
          </Button>
        </div>
        {/* <div className={'col-span-full lg:col-span-2 w-full h-full'}>
          <div className={'grid grid-cols-12 gap-4 w-full h-full'}>
            <div
              className={
                'col-start-1 col-end-4 col-span-full row-start-1 row-end-6 row-span-full pb-12'
              }>
              <Image
                src='/assets/5.jpg'
                alt='founder'
                width={300}
                height={600}
                // fill
                // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className={
                  'object-cover rounded-tl-3xl rounded-br-3xl h-full w-full'
                }
              />
            </div>

            <div
              className={
                'col-start-4 row-start-1 row-end-6 row-span-full col-end-13 col-span-full grid-span-12'
              }>
              <Image
                src='/assets/3.jpg'
                alt='founder'
                width={600}
                height={600}
                // fill
                // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className={
                  'object-cover rounded-tl-3xl rounded-br-3xl w-full h-full '
                }
              />
            </div>
          </div>
        </div> */}
      </section>

      <CTABlock />
    </main>
  );
}
