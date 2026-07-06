'use client';
import { useTheme } from 'next-themes';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const isDev = process.env.NODE_ENV === 'development';
export default function WhatsappWidget() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <FloatingWhatsApp
      accountName='Ascent Wealth'
      phoneNumber='+91 7305953668'
      avatar='/icon.png'
      statusMessage='ARN-109866'
      chatMessage={`
Hi there! 👋\n\nWelcome to Ascent Wealth Management. How can we assist you today? Whether you have questions about our services, need financial advice, or want to discuss your investment goals, we're here to help! 💼💰\n\nFeel free to ask us anything! 😊
        `}
      placeholder='Type a message...'
      notification={!isDev}
      notificationSound={!isDev}
      allowClickAway={false}
      allowEsc={true}
      darkMode={isDarkMode}
    />
  );
}

