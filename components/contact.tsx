import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './forms/contact-form';

const contactInfo = [
  {
    id: 'email',
    title: 'Email',
    description: 'Our friendly team is here to help.',
    href: 'mailto:info@ascentwealth.in',
    icon: MailIcon,
  },
  {
    id: 'live-chat',
    title: 'Live chat',
    description: 'Our friendly team is here to help.',
    href: 'https://api.whatsapp.com/send/?phone=919841013668&text&type=phone_number&app_absent=0',
    icon: MessageCircle,
  },
  {
    id: 'office',
    title: 'Office',
    description: 'Come say hello at our office HQ.',
    // href: 'https://www.google.com/maps/place/Thoraipakkam,+Tamil+Nadu+600097/@13.5126456,79.7806643,103588m/data=!3m1!1e3!4m6!3m5!1s0x3a525cfbde1d0251:0xcafd9a078a3c9270!8m2!3d12.9416037!4d80.2362096!16s%2Fm%2F0287fjs?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D',
    href: 'https://maps.app.goo.gl/UggnToKg1n3v7eeS9',
    icon: MapPinIcon,
  },
  {
    id: 'phone',
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm.',
    href: 'tel:+917305953668',
    icon: PhoneIcon,
  },
];

export default function Contact() {
  return (
    <section
      id='contact-us'
      className='min-h-screen flex items-center justify-center pb-12 sm:pb-16 md:pb-20 xl:pb-24'>
      <div className='w-full max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0 space-y-4 md:space-y-6 xl:space-y-8'>
        <b className='text-muted-foreground mb-2 uppercase font-semibold text-xs md:text-sm'>
          Contact Us
        </b>
        <h2
          data-aos='fade-down'
          className='text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold tracking-tight'>
          Chat with our friendly team!
        </h2>
        <p
          data-aos='fade-up'
          className='text-xs sm:text-sm md:text-base xl:text-lg text-muted-foreground'>
          We&apos;d love to hear from you. Please fill out this form or shoot us
          an email.
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,28rem)] gap-16 md:gap-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 *:border *:p-4 lg:*:p-6 *:bg-background gap-1 border p-1 bg-muted w-full h-full'>
            {contactInfo.map((contact) => (
              <div
                key={contact.id}
                className={'space-y-2 sm:space-y-4'}>
                <div className='size-6 sm:size-8 md:size-10 xl:size-12 flex items-center justify-center bg-foreground/5 dark:bg-foreground/10 text-foreground border border-foreground/3 rounded-xl'>
                  <contact.icon className={'size-4 xl:size-6'} />
                </div>
                <h3 className='font-semibold text-sm sm:text-base md:text-lg xl:text-xl'>
                  {contact.title}
                </h3>
                <p className='text-muted-foreground text-xs md:text-sm lg:text-base'>
                  {contact.description}
                </p>
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium text-primary block'
                  href={contact.href}>
                  {contact.id === 'email'
                    ? '' + contact.href.replace('mailto:', '')
                    : contact.id === 'phone'
                      ? '' + contact.href.replace('tel:', '')
                      : contact.id === 'office'
                        ? 'Perungudi, Chennai, 600096, India'
                        : 'Start new chat'}
                </Link>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
