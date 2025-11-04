'use client';
import { useTransition } from 'react';
import { useState } from 'react';
import { setQuantity } from '@/actions/cart';
import s from './Cart.module.scss';
import clsx from 'clsx';

export default function Quantity({ productId, quantity, price }) {
  const [qwt, setQwt] = useState(quantity);
  const [pending, start] = useTransition();

  function rmv(e) {
    e.stopPropagation();
    e.preventDefault();
    const next = Math.max(0, qwt - 1);
    setQwt(next);
    start(() => setQuantity(productId, next));
  }

  function add(e) {
    e.stopPropagation();
    e.preventDefault();
    const next = qwt + 1;
    setQwt(next);
    start(() => setQuantity(productId, next));
  }

  return (
    <div className={s.quantity}>
      <p className={s.quantity__price}>
        {price} X {qwt}
      </p>
      <div className={s.quantity__btns}>
        <button className={clsx([s.quantity__btn, s.quantity__btn_rmv])} disabled={pending} onClick={rmv}>
          -
        </button>
        <button className={clsx([s.quantity__btn, s.quantity__btn_add])} disabled={pending} onClick={add}>
          +
        </button>
      </div>
    </div>
  );
}
