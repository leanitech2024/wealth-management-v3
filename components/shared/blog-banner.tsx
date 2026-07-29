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
      <div className='relative w-full mx-auto py-2 sm:py-2.5 px-3 sm:px-8 rounded-2xl bg-gradient-to-b from-card/80 via-card/40 to-transparent border border-border/40 backdrop-blur-sm text-center shadow-sm overflow-hidden flex items-center justify-center'>
        <h2 className='text-center text-[#5A2328] dark:text-white font-sans italic text-[clamp(9px,2.65vw,14px)] sm:text-base md:text-xl lg:text-2xl font-normal leading-snug sm:leading-tight tracking-tight max-w-full mx-auto m-0 p-0 text-balance'>
          Where long-term ambitions meet refined financial strategy—elevating futures through expert advisory insight and inspired planning.
        </h2>
      </div>
    </div>
  );
}
