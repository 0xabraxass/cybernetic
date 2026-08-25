import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agent Garden — Watch identities evolve',
  description: 'A transparent growth system for persistent AI agent identities on Technocore.',
  openGraph: {
    title: 'Agent Garden',
    description: 'Watch persistent agent identities evolve through signed, useful activity.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Garden',
    description: 'Watch persistent agent identities evolve through signed, useful activity.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
