'use client';

import { useState, useTransition } from 'react';
import { startCheckout } from '@/actions/checkout';
import { useRouter } from 'next/navigation';

import s from './Cart.module.scss';

export default function PayButton({ userId, total }) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState(null);
  const router = useRouter();

  function handlePay() {
    start(async () => {
      try {
        const result = await startCheckout(userId);
        if (result?.ok) {
          setMessage({ type: 'success', text: 'Order placed successfully!' });
          router.refresh();
        } else {
          setMessage({ type: 'error', text: result?.code || 'Payment failed' });
        }
      } catch (e) {
        setMessage({ type: 'error', text: 'An error occurred' });
      }
      setTimeout(() => setMessage(null), 5000);
    });
  }

  return (
    <>
      <button className={s.details__btn} onClick={handlePay} disabled={pending}>
        {pending ? 'Processing...' : 'Pay now'}
      </button>
      {message && (
        <div className={`${s.popup} ${message.type === 'success' ? s.popup__success : s.popup__error}`}>
          {message.text}
        </div>
      )}
    </>
  );
}
