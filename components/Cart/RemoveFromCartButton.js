'use client';
import { useTransition } from 'react';
import { removeFromCart } from '@/actions/cart';
import clsx from 'clsx';
import s from './Cart.module.scss';

export default function RemoveFromCartButton({ productId, cart }) {
  const [pending, start] = useTransition();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    start(() => removeFromCart(productId));
  }

  return (
    <button className={clsx(cart && s.cart__remove)} disabled={pending} onClick={handleClick}>
      {pending ? 'Removing…' : 'Remove'}
    </button>
  );
}
