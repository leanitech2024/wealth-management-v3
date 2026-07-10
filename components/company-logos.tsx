import { companyLogos } from '@/constants';
import Image from 'next/image';
import { Marquee } from './marque';
import { Card } from './ui/card';

function LogoCard({ id, imgSrc }: (typeof companyLogos)[number]) {
  return (
    <Card className='w-48 h-24 p-1 rounded-none flex items-center justify-center shrink-0 py-0! px-0! gap-0!'>
      <div className='flex items-center justify-center w-full h-full rounded-sm overflow-hidden p-1'>
        <Image
          src={imgSrc}
          alt={`Company Logo ${id}`}
          width={150}
          height={48}
          className='max-h-20 w-auto object-contain'
        />
      </div>
    </Card>
  );
}

export default function CompanyLogos() {
  const firstHalf = companyLogos.slice(0, Math.ceil(companyLogos.length / 2));
  const secondHalf = companyLogos.slice(Math.ceil(companyLogos.length / 2));

  return (
    <section
      id='company-logos'
      className='w-full max-w-(--breakpoint-xl) mx-auto text-center space-y-6 lg:space-y-8'>
      <h2
        data-aos='fade-down'
        className='text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.15]! font-semibold tracking-[-0.035em]'>
        Our Trusted Partners
      </h2>
      <div className='relative flex w-full flex-col items-center justify-center gap-1 space-y-4 overflow-hidden'>
        {/* Marquee moving left to right (default) */}
        <Marquee pauseOnHover repeat={3} className='[--duration:120s]'>
          {firstHalf.map((logo) => (
            <LogoCard key={logo.id} {...logo} />
          ))}
        </Marquee>
        {/* Marquee moving right to left (reverse) */}
        <Marquee pauseOnHover reverse repeat={3} className='[--duration:120s]'>
          {secondHalf.map((logo) => (
            <LogoCard key={logo.id} {...logo} />
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
