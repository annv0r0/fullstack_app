import { auth } from '@/auth';

import s from './styles.module.scss';
import Link from 'next/link';
import Logout from './Logout';

export default async function AuthButtons() {
  const session = await auth();

  if (session) return <Logout className={s.logout} />;

  return (
    <Link className={s.signin} href="/auth">
      sign in | sign up
    </Link>
  );
}
