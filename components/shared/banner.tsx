import BannerImg from '@/public/assets/11.jpg';
import Image from 'next/image';
import BannerBreadcrumb from './banner-breadcrumb';

export default function Banner() {
  return (
    <section
      className={'aspect-video md:aspect-26/9 w-full h-full mt-24 relative'}>
      <div className={'relative w-full h-full'}>
        <Image
          src={BannerImg.src}
          alt='Banner Image'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={'object-cover brightness-50'}
          priority
          blurDataURL={BannerImg.blurDataURL}
        />
      </div>

      <div
        className={
          'absolute top-0 left-0 w-full h-full flex items-center justify-center p-12 bg-black/30 backdrop-blur-xs z-20 text-[#C9B169]'
        }>
        <BannerBreadcrumb />
      </div>
    </section>
  );
}
