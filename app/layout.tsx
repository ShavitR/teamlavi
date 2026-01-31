import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const heebo = Heebo({ subsets: ['hebrew', 'latin'] });

export const metadata: Metadata = {
  title: 'Team Lavi | טים לביא',
  description: 'Premium Martial Arts Training in Rehovot, Israel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={heebo.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
