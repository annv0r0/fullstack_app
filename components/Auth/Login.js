import { auth } from '@/auth';

import s from './styles.module.scss';
import Link from 'next/link';
import Logout from './Logout';
import Image from 'next/image';

export default async function Login() {
  const session = await auth();
  if (session) return <Logout className={s.logout} />;
  const S3_IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/user.png`;

  return (
    <Link className={s.signin} href="/auth">
      {/* <p className={s.signin__text}>sign in | sign up</p> */}
      <Image className={s.signin__icon} src={S3_IMG_URL} alt="logo" width={100} height={100} />
    </Link>
  );
}
