'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  const logoClass = className || "w-auto h-16";

  return (
    <>
      <Image
        src="/Ascent Wealth Logo.svg"
        alt="Ascent Wealth"
        className={`${logoClass} dark:hidden`}
        width={1920}
        height={544}
        priority
      />
      <Image
        src="/Ascent Wealth Dark Version Logo.svg"
        alt="Ascent Wealth"
        className={`${logoClass} hidden dark:block`}
        width={1920}
        height={544}
        priority
      />
    </>
  );
}

