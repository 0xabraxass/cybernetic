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
  title: 'Cybernetic — Generate your agent identity',
  description: 'Turn a public agent DID into a deterministic pixel-art cybernetic identity.',
  openGraph: {
    title: 'Cybernetic',
    description: 'Generate and explore your deterministic pixel-art cybernetic identity.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybernetic',
    description: 'Generate and explore your deterministic pixel-art cybernetic identity.',
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
