import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Lexend } from 'next/font/google';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import App from '@/components/app';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: {
    template: '%s | Xhetic Shadows',
    default: 'Xhetic Shadows',
  },
};

const fontCode = localFont({
  src: '../assets/fonts/GeistMonoVF.woff2',
  variable: '--font-code',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-lexend antialiased',
          lexend.variable,
          fontCode.variable
        )}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
