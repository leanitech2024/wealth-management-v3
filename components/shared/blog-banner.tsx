import BannerImg from '@/public/images/blogs-cover.svg';
import Image from 'next/image';

export default function BlogBanner() {
  return (
    <section
      className={'aspect-video md:aspect-26/9 w-full h-full mt-24 relative'}>
      <div className={'relative w-full h-full'}>
        <Image
          src={BannerImg.src}
          alt='Blog Banner Image'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={'object-cover object-[center_10%]'}
          priority
          blurDataURL={BannerImg.blurDataURL}
        />
      </div>
    </section>
  );
}
