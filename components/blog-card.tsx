'use client';
import { PostValues } from '@/content-collections';
// import Image from 'next/image';
import Link from 'next/link';
// import Image from './blur-image';
import CloudinaryImage from './shared/cloudinary-loader';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';
import { Card, CardAction, CardContent, CardHeader } from './ui/card';

type BlogCardProps = {
  post: PostValues;
};

export default function BlogCard(props: BlogCardProps) {
  const { post } = props;

  function splitUrl(url: string) {
    // https://res.cloudinary.com/dxgckfhti/image/upload/v1768552174/blog_cover_54_xp6ma0.jpg

    // cut the url from here /v1768552174
    // take only blog_cover_54_xp6ma0.jpg
    const parts = url.split('/v')[1].split('/');
    return parts.slice(1).join('/');
  }

  return (
    <Card className='shadow-none py-0 gap-3 h-full w-full flex flex-col'>
      <CardHeader className='p-2 pb-0'>
        <div className='aspect-video w-full h-full bg-muted rounded-lg overflow-hidden'>
          {/* <Image
            src={post.image}
            alt={post.title}
            className='object-cover w-full h-full rounded-lg'
            width={500}
            height={500}
            // priority={i < 3}
          /> */}
          <CloudinaryImage
            src={splitUrl(post.image)}
            width={500}
            quality={50}
            className='object-contain w-full h-full rounded-lg'
            // priority={i < 3}
          />
          {/* <Image
            src={post.image}
            alt={post.title}
            className='object-cover w-full h-full rounded-lg'
          /> */}
        </div>
      </CardHeader>
      <CardContent className='pt-0 pb-5 px-3 lg:px-5 flex-1 flex flex-col justify-between gap-4'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-wrap gap-2 line-clamp-1'>
            {post.categories.slice(0, 2).map((category, index) => (
              <Badge key={index} variant='outline'>
                {category}
              </Badge>
            ))}
          </div>

          <Link prefetch='auto' href={`/blogs/${post.slug}`} className={'block'}>
            <h3 className='mt-4 text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold underline underline-offset-2 tracking-[-0.015em] hover:no-underline'>
              {post.title}
            </h3>
          </Link>

          <CardAction className={''}>
            <Link
              className={buttonVariants({
                variant: 'link',
                size: 'sm',
                className:
                  'text-muted-foreground! p-0! h-fit! rounded-none! hover:text-primary! transition-colors! delay-150! duration-300! ease-linear!',
              })}
              href={`/blogs/${post.slug}`}
              aria-label={`Read more about ${post.title}`}>
              Read more &rarr;
            </Link>
          </CardAction>
        </div>

        <div className='flex flex-wrap gap-2 items-center justify-between pt-4 border-t mt-auto'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src='/icon.png' alt='Ascent Wealth' className='p-1 object-contain bg-white' />
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>
            <span className='text-muted-foreground text-sm font-medium'>
              Ascent Wealth
            </span>
          </div>

          <span className='text-muted-foreground text-xs'>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
