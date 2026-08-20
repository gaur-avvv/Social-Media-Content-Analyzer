import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Social Media Content Analyzer | AI-Powered Engagement & Extraction',
  description: 'Clean, modern social media content analyzer with PDF extraction, Vision OCR, Web-grounded trends, and multi-platform engagement optimization.',
  openGraph: {
    title: 'Social Media Content Analyzer | AI-Powered Engagement & Extraction',
    description: 'Clean, modern social media content analyzer with PDF extraction, Vision OCR, Web-grounded trends, and multi-platform engagement optimization.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#090b10] text-[#f1f5f9] selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

