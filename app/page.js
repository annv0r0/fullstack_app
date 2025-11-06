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
        Do you want to save all the information about your favorite items? Upload a CSV file and add images — the app
        will parse your dataset and show you a beautiful gallery.
        <br></br>
        Add items to your shopping cart.
        <br></br>
        Store everything securely. Sign in with email or social accounts and never forget your items.
        <br></br>
        Updates are comming.
      </p>
    </main>
  );
}
