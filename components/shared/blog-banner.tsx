import BannerImg from '@/public/images/our-blogs.jpeg';
import Image from 'next/image';

export default function BlogBanner() {
  return (
    <div className='w-full mt-24 space-y-4 sm:space-y-6'>
      <section
        className={'aspect-video md:aspect-26/9 w-full h-full relative'}>
        <div className={'relative w-full h-full'}>
          <Image
            src={BannerImg.src}
            alt='Blog Banner Image'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={'object-cover object-[center_10%]'}
            priority
            placeholder='blur'
            blurDataURL={BannerImg.blurDataURL}
          />
        </div>
      </section>
      <div className='relative w-full mx-auto pt-1 sm:pt-1.5 pb-2 sm:pb-2.5 px-4 sm:px-8 rounded-2xl bg-gradient-to-b from-card/80 via-card/40 to-transparent border border-border/40 backdrop-blur-sm text-center shadow-sm overflow-hidden flex items-center justify-center'>
        <h2 className='text-center text-[#5A2328] dark:text-white font-sans italic text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-tight tracking-tight max-w-full mx-auto m-0 p-0 flex flex-col items-center justify-center gap-1 sm:gap-1.5'>
          <span className='block whitespace-nowrap leading-tight'>
            Where long-term ambitions meet refined financial strategy—
          </span>
          <span className='block whitespace-nowrap leading-tight'>
            elevating futures through expert advisory insight and inspired planning.
          </span>
        </h2>
      </div>
    </div>
  );
}
