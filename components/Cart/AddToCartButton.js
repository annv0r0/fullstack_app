'use client';
import { useTransition } from 'react';
import { addToCart } from '@/actions/cart';

export default function AddToCartButton({ product }) {
  const [pending, start] = useTransition();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    start(() => addToCart(product));
  }

  return (
    <button disabled={pending} onClick={handleClick}>
      {pending ? 'Adding…' : 'Add to cart'}
    </button>
  );
}
