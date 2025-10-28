'use client';
import { signIn } from 'next-auth/react';
import s from './styles.module.scss';
import clsx from 'clsx';

export default function ProvidersClient({ providers, callbackUrl }) {
  if (!providers) return null;

  return (
    <>
      <button
        className={clsx([s.providers__btn, s.providers__btn_local])}
        key={'cognito'}
        onClick={() => signIn('cognito', { callbackUrl })}
      >
        Log in with email
      </button>
      or
      {Object.values(providers).map(
        (p) =>
          p.id !== 'cognito' && (
            <button className={s.providers__btn} key={p.id} onClick={() => signIn(p.id, { callbackUrl })}>
              Sign in with {p.name}
            </button>
          )
      )}
    </>
  );
}
