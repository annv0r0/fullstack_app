import s from './page.module.scss';
import ProvidersClient from '@/components/Auth/ProvidersClient';
import Logout from '@/components/Auth/Logout';
import { getServerSession } from 'next-auth';
import authConfig from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthPage({ searchParams }) {
  const session = await getServerSession(authConfig);
  const callbackUrl = searchParams?.callbackUrl;
  if (session) return redirect(callbackUrl || '/upload');

  const { mode } = await searchParams;

  if (mode == 'logout') return <Logout />;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`, { cache: 'no-store' });
  const providers = await res.json();

  return (
    <main className={s.main}>
      <section className={s.section}>
        <h1 className={s.header}>Authentication</h1>
        <ProvidersClient providers={providers} callbackUrl={callbackUrl} />
      </section>
    </main>
  );
}
