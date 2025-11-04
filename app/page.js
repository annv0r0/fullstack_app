import s from './page.module.scss';
import Image from 'next/image';

export default async function Home() {
  const S3_IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/hero.png`;
  return (
    <main className={s.main}>
      <h1 className={s.title}>SUPER-DUPER FULLSTACK-APP</h1>
      <div className={s.imageWrapper}>
        <Image className={s.hero} src={S3_IMG_URL} alt="hero" fill></Image>
      </div>
      <p className={s.blurb}>
        Track meals and spending in seconds. Upload receipts or CSVs, we parse them into items and expenses, store
        everything securely, and surface a clean dashboard with recent purchases, monthly budget, and a ready-to-use
        shopping list. Sign in with email or socials and start planning smarter.
      </p>
    </main>
  );
}
