'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/Ascent Wealth Logo.svg"
      alt="Ascent Wealth"
      className={className || "w-auto h-12"}
      width={1920}
      height={544}
      priority
    />
  );
}

