'use client';
import { useTransition } from 'react';
import { removeFromCart } from '@/actions/cart';

export default function RemoveFromCartButton({ product }) {
  const [pending, start] = useTransition();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    start(() => removeFromCart(product));
  }

  return (
    <button disabled={pending} onClick={handleClick}>
      {pending ? 'Removing…' : 'Remove'}
    </button>
  );
}
