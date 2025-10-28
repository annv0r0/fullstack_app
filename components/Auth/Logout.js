'use client';

import { signOut } from 'next-auth/react';

export default function Logout({ className }) {
  return (
    <button className={className} type="submit" onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </button>
  );
}
