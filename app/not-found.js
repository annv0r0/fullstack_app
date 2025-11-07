import Link from 'next/link';
import Image from 'next/image';
import s from './page.module.scss';

export default function NotFound() {
  const IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/404.png`;

  return (
    <div className={s.notfound}>
      <Image className={s.notfound__img} src={IMG_URL} alt="not_found" width={100} height={100}></Image>
      <Link className={s.notfound__link} href="/">
        Home &rarr;
      </Link>
      <Link className={s.notfound__link} href="/cart">
        &larr; To cart
      </Link>
    </div>
  );
}
