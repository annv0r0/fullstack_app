'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { removeFromCart } from '@/actions/cart';
import clsx from 'clsx';
import s from './Cart.module.scss';

export default function ButtonRemoveFromCart({ productId, cart }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    start(() => removeFromCart(productId));
    router.refresh();
  }

  return (
    <button className={clsx(cart && s.cart__remove)} disabled={pending} onClick={handleClick}>
      {pending ? 'Removing…' : 'Remove'}
    </button>
  );
}
