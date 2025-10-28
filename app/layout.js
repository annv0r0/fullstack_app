import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.scss';
import s from './layout.module.scss';
import AuthButtons from '@/components/Auth/AuthButtons';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Launch your shop',
  description: 'Study fullstack',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <nav className={s.nav}>
            <Link href="/">Main</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/upload">Upload file</Link>
            <div className={s.auth}>
              <AuthButtons />
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
