import s from './page.module.scss';
import ProvidersClient from '@/components/Auth/ProvidersClient';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import authConfig from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthPage({ searchParams }) {
  const session = await getServerSession(authConfig);
  const sp = await searchParams;
  const callbackUrl = sp?.callbackUrl;

  if (session) return redirect(callbackUrl || '/upload');

  const providers = await getProviders();

  return (
    <main className={s.main}>
      <section className={s.section}>
        <h1 className={s.header}>Authentication</h1>
        <ProvidersClient providers={providers} callbackUrl={callbackUrl} />
      </section>
    </main>
  );
}
