import s from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ScrollButton from '@/components/ScrollButton';

export default async function Home() {
  const S3_VIDEO_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/videos/background.mp4`;
  // const S3_IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/hero.png`;
  return (
    <main className={s.main}>
      <div className={s.hero__wrapper}>
        <video className={s.hero__video} autoPlay muted loop playsInline>
          <source src={S3_VIDEO_URL} type="video/mp4" />
        </video>
        <div className={s.hero__overlay}>
          <h1 className={s.hero__title}>FULLSTACK-APP</h1>
          <p className={s.hero__subtitle}>Build your own shopping world</p>
        </div>
        <ScrollButton />
      </div>
      <div className={s.content}>
        <p>Save all the information about your favorite items.</p>
        <br />
        <ol className={s.content__list}>
          <li>Sign in with email or social accounts</li>
          <li>
            Upload a CSV file and add images (optional)&nbsp;
            <Link className={s.content__textLink} href="/upload">
              upload
            </Link>
          </li>
          <li>
            Check out your gallery&nbsp;
            <Link className={s.content__textLink} href="/dashboard">
              /dashboard
            </Link>
          </li>
          <li>
            Add items to your shopping cart. Check out your cart&nbsp;
            <Link className={s.content__textLink} href="/cart">
              /cart
            </Link>
          </li>
          <li>Prees Pay button to checkout your order</li>
          <li>
            Check out your order history&nbsp;
            <Link className={s.content__textLink} href="/history">
              /history
            </Link>
          </li>
        </ol>
        <br />
        <p>
          Store everything securely, visualize your data and never forget your items.
          <br />
          Updates are comming.
        </p>
      </div>
      {/* <Image className={s.hero} src={S3_IMG_URL} alt="hero" fill></Image> */}
      {/* </div> */}
    </main>
  );
}
