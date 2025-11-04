import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
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
  const ICON_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/cart.png`;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <nav className={s.nav}>
            <div className={s.left}>
              <Link href="/">Main</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/upload">Upload file</Link>
            </div>
            <div className={s.right}>
              <Link className={s.cart} href="/cart">
                <Image src={ICON_URL} width={30} height={30} alt="icon" />
              </Link>
              <div className={s.auth}>
                <AuthButtons />
              </div>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
