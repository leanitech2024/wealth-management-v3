import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMap2,
} from '@tabler/icons-react';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';
import FooterBackgroundGradient from './extends/footer-background-gradient';
import { LazyTextHoverEffect } from './extends/lazy-components';
// import LogoSVG from './shared/logo-svg';
import RiskFactor from './risk-factor';
// import LogoSVG1 from './shared/logo-svg1';
import Logo from './shared/logo';
import { Separator } from './ui/separator';

// Footer link data
const footerLinks = [
  {
    title: 'Products',
    links: [
      {
        id: crypto.randomUUID(),
        label: 'Mutual Funds',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'SIF, AIF, PMS',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'GIFT City',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'Corporate FDs, Bonds and NCDs',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'Life and Health Insurance',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'Estate Planning',
        href: '#services',
      },
      {
        id: crypto.randomUUID(),
        label: 'Goal Based Financial Planning',
        href: '#planning',
      },
    ],
  },
  {
    title: 'Helpful Links',
    links: [
      { id: crypto.randomUUID(), label: 'FAQs', href: '#faqs' },
      {
        id: crypto.randomUUID(),
        label: 'Support',
        href: '?contact=true',
      },
      {
        id: crypto.randomUUID(),
        label: 'Live Chat',
        href: 'https://api.whatsapp.com/send/?phone=919841013668&text&type=phone_number&app_absent=0',
        pulse: true,
      },
    ],
  },
];

const resources = [
  { id: crypto.randomUUID(), label: 'Important Links', href: '/importantlinks' },
  { id: crypto.randomUUID(), label: 'Disclaimer ', href: '/disclaimer' },
  { id: crypto.randomUUID(), label: 'Disclosure ', href: '/disclosure' },
  { id: crypto.randomUUID(), label: 'Privacy Policy', href: '/privacy-policy' },
  { id: crypto.randomUUID(), label: 'SID/SAI/KIM', href: 'https://www.sebi.gov.in/filings/mutual-funds.html' },
  { id: crypto.randomUUID(), label: 'Code of Conduct', href: '/codeof_conduct.pdf' },
  { id: crypto.randomUUID(), label: 'SEBI Circulars', href: 'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0' },
  { id: crypto.randomUUID(), label: 'AMFI Risk Factors', href: 'https://www.amfiindia.com/investor/knowledge-center-info?zoneName=riskInMutualFunds' },
];

// Contact info data
const contactInfo = [
  {
    id: crypto.randomUUID(),
    icon: <Mail className='stroke-primary size-6' />,
    text: 'info@ascentwealth.in',
    href: 'mailto:info@ascentwealth.in',
  },
  {
    id: crypto.randomUUID(),
    icon: <Phone className='stroke-primary size-6' />,
    text: '+91 7305953668',
    href: 'tel:+917305953668',
  },
  {
    id: crypto.randomUUID(),
    icon: <IconMap2 className='stroke-primary size-6 lg:size-10' />,
    // text: 'Thoraipakkam, Chennai, Tamilnadu - 600097, India',
    text: 'Perungudi, Chennai, 600096, India',
  },
];

// Social media icons
const socialLinks = [
  {
    id: crypto.randomUUID(),
    icon: <IconBrandFacebook size={20} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/ascentwealth.mf',
  },
  {
    id: crypto.randomUUID(),
    icon: <IconBrandInstagram size={20} />,
    label: 'Instagram',
    href: 'https://www.instagram.com/ascent.wealth',
  },
  {
    id: crypto.randomUUID(),
    icon: <IconBrandYoutube size={20} />,
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC1KDPVsTcCbihC9xDcP-ZWQ/featured',
  },
  {
    id: crypto.randomUUID(),
    icon: <IconBrandLinkedin size={20} />,
    label: 'LinkedIn',
    // href: 'https://www.linkedin.com/in/kannanrangaswamy-39761b8b/',
    href: 'https://www.linkedin.com/company/ascentwealth1',
  },
  {
    id: crypto.randomUUID(),
    icon: <IconBrandWhatsapp size={20} />,
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=919841013668&text&type=phone_number&app_absent=0',
  },
];
export function HoverFooter() {
  return (
    <footer className='max-w-(--breakpoint-xl) mx-auto relative overflow-hidden rounded-t-2xl pb-12 md:pb-10 lg:pb-0'>
      <div className='z-40 relative p-6 md:p-8 lg:p-10 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16'>
          {/* Brand section */}
          <div className='flex flex-col items-center text-center space-y-4 w-full'>
            <div className='flex items-center justify-center w-full h-16 relative'>
              <Logo />
            </div>
            <div className='flex flex-col items-center gap-4 pt-2 w-full'>
              <div className='relative w-28 h-28 flex items-center justify-center rounded-xl overflow-hidden bg-white p-1.5 shadow-md border border-border/50'>
                <Image
                  src='/amfi-logo.png'
                  alt='AMFI Registered Mutual Fund Distributor Logo'
                  width={100}
                  height={100}
                  className='object-contain rounded-lg'
                  priority
                />
              </div>
              <div className='space-y-2 text-sm leading-normal'>
                <div className='text-muted-foreground text-xs sm:text-sm'>
                  AMFI Registration No.:{' '}
                  <span className='font-bold text-foreground'>ARN-109866</span>
                </div>
                <div className='text-muted-foreground text-xs sm:text-sm'>
                  Date of initial registration:{' '}
                  <span className='font-bold text-foreground'>16-Mar-2016</span>
                </div>
                <div className='text-muted-foreground text-xs sm:text-sm'>
                  Current validity of ARN:{' '}
                  <span className='font-bold text-foreground'>01-Apr-2028</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='text-primary dark:text-white text-lg font-semibold mb-6'>
                {section.title}
              </h4>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.id} className='relative'>
                    <Link
                      scroll={true}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      className='hover:text-primary transition-colors'>
                      {link.label}
                    </Link>
                    {/* {link?.pulse && (
                      <span className='absolute top-0 -right-2.5 w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse'></span>
                    )} */}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className={'space-y-6'}>
            <h4 className='text-primary dark:text-white text-lg font-semibold mb-6'>
              Let&apos;s Connect
            </h4>
            <ul className='space-y-4'>
              {contactInfo.map((item) => (
                <li key={item.id} className='flex items-center space-x-3'>
                  {item.icon}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className='dark:hover:text-primary transition-colors'>
                      {item.text}
                    </Link>
                  ) : (
                    <span className='dark:hover:text-primary transition-colors'>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className='flex flex-wrap space-x-4 text-foreground border border-primary rounded-md p-2 w-max'>
              {socialLinks.map(({ id, icon, label, href }) => (
                <Link
                  key={id}
                  href={href}
                  target='_blank'
                  aria-label={label}
                  className='hover:text-primary transition-colors'>
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className='' />

        <RiskFactor />

        <Separator className='' />

        <div className='flex flex-wrap h-5 items-center justify-center space-x-2 text-sm gap-1'>
          <p>Grievance Officer- Ascent Wealth</p>
          <Separator orientation='vertical' className='hidden md:block' />
          <Link
            // href='mailto:ascentwealth.invest@gmail.com'
            href='mailto:info@ascentwealth.in'
            className='underline underline-offset-2 hover:no-underline'>
            info@ascentwealth.in
            {/* ascentwealth.invest@gmail.com */}
          </Link>
        </div>



        <Separator className='mt-18 sm:mt-14 md:mt-9 lg:mt-0' />

        {/* resources */}
        <div
          className={
            'flex items-center h-5 justify-center flex-wrap space-x-2 gap-1'
          }>
          {resources.map((resource, index) => (
            <Fragment key={resource.id}>
              <div key={resource.id} className={'text-sm'}>
                <Link
                  href={resource.href}
                  target={resource.href.startsWith('http') || resource.href.endsWith('.pdf') ? '_blank' : '_self'}
                  className='hover:text-primary transition-colors'>
                  {resource.label}
                </Link>
              </div>
              {index < resources.length - 1 && (
                <Separator orientation='vertical' />
              )}
            </Fragment>
          ))}
        </div>

        <Separator className='mt-18 sm:mt-14 md:mt-9 lg:mt-0' />

        {/* Footer bottom */}
        <div className='flex flex-col md:flex-row justify-center items-center text-sm space-y-4 md:space-y-0'>
          {/* Social icons */}
          {/* <div className='flex space-x-6 text-foreground'>
            {socialLinks.map(({ id, icon, label, href }) => (
              <Link
                key={id}
                href={href}
                target='_blank'
                aria-label={label}
                className='hover:text-primary transition-colors'>
                {icon}
              </Link>
            ))}
          </div> */}

          {/* Copyright */}
          <p className='text-center md:text-left'>
            &copy; {new Date().getFullYear()} Ascent Wealth. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className=''>
        <LazyTextHoverEffect text='Ascent Wealth' className='z-50' />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
