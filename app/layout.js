import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';
import Providers from './providers';
import Navigation from '@/components/Navigation/Navigation';
import CartIcon from '@/components/Cart/CartIcon';
import Login from '@/components/Auth/Login';
import s from './layout.module.scss';

const geistSans = Geist({
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Launch your shop',
  description: 'Study fullstack',
};

export default async function RootLayout({ children }) {
  const S3_IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/menu.png`;

  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <Providers>
          <nav className={s.nav}>
            <div className={s.left}>
              <Navigation />
            </div>
            <div className={s.right}>
              <CartIcon />
              <div className={s.auth}>
                <Login />
              </div>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
