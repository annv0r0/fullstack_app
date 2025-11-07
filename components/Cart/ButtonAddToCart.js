'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { addToCart } from '@/actions/cart';

export default function ButtonAddToCart({ product }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    start(() => addToCart(product));
    router.refresh();
  }

  return (
    <button disabled={pending} onClick={handleClick}>
      {pending ? 'Adding…' : 'Add to cart'}
    </button>
  );
}
