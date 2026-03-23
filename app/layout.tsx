import type { Metadata } from 'next';
import { Cinzel_Decorative, Cinzel, Crimson_Pro, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

// Component imports
import Navbar from '@/components/layout/Navbar';

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Dalan', template: '%s | Dalan' },
  description:
    'AI-driven education for K–12 and STEM. Where Philippine mythology meets the future of learning.',
  keywords: ['AI education', 'K-12 Philippines', 'STEM learning', 'adaptive education'],
  openGraph: {
    siteName: 'Dalan',
    type: 'website',
    title: 'Dalan — AI-Driven Education',
    description: 'Where the ancient serpent of knowledge meets the future of learning.',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${cinzelDecorative.variable}
        ${cinzel.variable}
        ${crimsonPro.variable}
        ${spaceMono.variable}
        ${dmSans.variable}
      `}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
