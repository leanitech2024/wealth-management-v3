import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { googleReviews, testimonials } from '@/constants';
import { IconStar, IconStarHalf } from '@tabler/icons-react';
import Image from 'next/image';
import { Blockquote, BlockquoteAuthor } from './extends/blockquote';
import { Marquee } from './marque';
import LocationDialog from './location-dialog';

type Testimonial = {
  id: string;
  message: string;
  name: string;
  designation: string;
  image: string;
  rating: number;
  createdAt?: string;
};

export function TestimonialCard({
  image,
  name,
  designation,
  message,
  createdAt,
}: Testimonial) {
  return (
    <Card className='max-w-md w-full h-fit items-center justify-center mx-auto'>
      <CardContent className={'space-y-2'}>
        <figure className='flex items-center gap-2.5'>
          <Avatar className='size-9'>
            <Image src={image} alt={name} width={50} height={50} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <figcaption className='text-sm font-medium text-foreground flex items-center gap-1'>
              {name}
            </figcaption>
            <div className={'w-full flex items-center gap-2'}>
              <div className='inline-flex items-center gap-0.5'>
                <IconStar className={'size-4 stroke-primary fill-primary'} />
                <IconStar className={'size-4 stroke-primary fill-primary'} />
                <IconStar className={'size-4 stroke-primary fill-primary'} />
                <IconStar className={'size-4 stroke-primary fill-primary'} />
                <IconStarHalf
                  className={'size-4 stroke-primary fill-primary'}
                />
              </div>
              <time dateTime={createdAt} className={'text-xs font-medium'}>
                {createdAt}
              </time>
            </div>
          </div>
        </figure>
        <blockquote className='text-sm text-black dark:text-white space-y-1'>
          <p>&ldquo;{message}&rdquo;</p>
          <footer>
            — <cite className={'font-medium text-muted-foreground dark:text-gray-300'}>{designation}</cite>
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialMarquee() {
  const filteredGoogleReviews = googleReviews.filter(
    (review) => review.message && review.name,
  );
  const reviewCount = googleReviews.length + testimonials.length;

  return (
    <section
      id='testimonials'
      className='w-full max-w-(--breakpoint-xl) mx-auto text-center pt-10'>
      <div className={'relative space-y-4 px-4 lg:px-0'}>
        <div className='mx-auto mb-2 lg:mb-0 lg:absolute lg:top-0 lg:left-2 flex justify-center items-center z-20'>
          <LocationDialog triggerText='Write a Review' />
        </div>

        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.15]! font-semibold tracking-[-0.035em]'>
          What Our Clients Say About Us
        </h2>

        <p
          data-aos='fade-up'
          className='text-center text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl'>
          Real stories from people about our professional financial services
        </p>

        <div
          className={
            'size-36 mx-auto relative lg:absolute lg:top-0 lg:right-2'
          }>
          <Image
            src='/google-reviews.png'
            alt='Google Reviews'
            width={200}
            height={24}
            className='w-full h-full object-contain lg:object-top'
          />
          <span
            className={
              'ring-1 rounded-full text-xs md:text-sm lg:text-base p-1 py-0.5 font-bold absolute top-0 right-0'
            }>
            {reviewCount}
          </span>
        </div>

        <Blockquote className='mx-auto'>
          Learn from the past, set vivid, detailed goals for the future, and
          live in the only moment of time over which you have any control now
          <BlockquoteAuthor>Denis Waitley</BlockquoteAuthor>
        </Blockquote>
      </div>

      <div className='relative flex w-full flex-col items-center justify-center gap-1!0 overflow-hidden'>
        {/* Marquee moving left to right (default) */}
        <Marquee
          pauseOnHover
          repeat={3}
          className='items-center [--duration:120s]'>
          {testimonials.map((review) => (
            <TestimonialCard key={review.id} {...review} />
          ))}
        </Marquee>
        {/* Marquee moving right to left (reverse) */}
        <Marquee
          pauseOnHover
          reverse
          repeat={3}
          className='items-center [--duration:120s]'>
          {filteredGoogleReviews.map((review) => (
            <TestimonialCard key={review.id} {...review} />
          ))}
        </Marquee>
        {/* Stylish gradient overlays */}
        <div className='pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background/95 to-transparent'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background/95 to-transparent'></div>
        <div className='pointer-events-none absolute top-0 left-0 w-full h-12 bg-linear-to-b from-background/90 to-transparent'></div>
        <div className='pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-background/90 to-transparent'></div>
      </div>
    </section>
  );
}
