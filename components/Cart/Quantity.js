'use client';
import { useTransition, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { setQuantity } from '@/actions/cart';
import s from './Cart.module.scss';

export default function Quantity({ productId, quantity, price }) {
  const [optimisticQty, setOptimisticQty] = useOptimistic(quantity, (_current, next) => next);

  const [pending, start] = useTransition();
  const router = useRouter();

  function update(newQty) {
    if (newQty < 0) return;

    start(async () => {
      setOptimisticQty(newQty);
      await setQuantity(productId, newQty);
    });
    router.refresh();
  }

  return (
    <div className={s.quantity}>
      <p className={s.quantity__price}>
        {price} X {optimisticQty}
      </p>
      <div className={s.quantity__btns}>
        <button className={s.quantity__btn} onClick={() => update(optimisticQty - 1)} disabled={pending}>
          -
        </button>
        <button className={s.quantity__btn} onClick={() => update(optimisticQty + 1)} disabled={pending}>
          +
        </button>
      </div>
    </div>
  );
}
