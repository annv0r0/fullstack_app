'use client';

import { useTransition } from 'react';
import { startCheckout } from '@/actions/checkout';
import { useRouter } from 'next/navigation';
import s from './Cart.module.scss';

export default function PayButton({ cartId, total }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  function handlePay() {
    start(async () => {
      const url = await startCheckout(cartId);
      router.push(url);
    });
  }

  return (
    <button className={s.details__btn} onClick={handlePay} disabled={pending}>
      {pending ? 'Processing...' : 'Pay now'}
    </button>
  );
}
