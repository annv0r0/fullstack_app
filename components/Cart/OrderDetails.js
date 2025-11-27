import s from './Cart.module.scss';
import { getCartItems } from '@/lib/server/db/SQL/cart';
import PayButton from './PayButton';
import getUserId from '@/lib/utils/userId';

export default async function OrderDetails() {
  const userId = await getUserId();
  const items = await getCartItems(userId);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  // TODO: implement discount and promo codes in DB
  const discount = 0;
  const promo = 0;
  const total = subtotal - discount - promo;

  return (
    <div className={s.details}>
      <h2 className={s.details__header}>Order details</h2>

      <div className={s.details__sum}>
        <p>
          {items.reduce((sum, i) => sum + i.quantity, 0)} items — {subtotal.toLocaleString('en-US')} USD
        </p>
        <p>Discount — {discount ? `${discount.toLocaleString('en-US')} USD` : '0 USD'}</p>
        <p>Promo Codes — {promo ? `${promo.toLocaleString('en-US')} USD` : '0 USD'}</p>
      </div>

      <div className={s.details__total}>
        <strong>Total — {total.toLocaleString('en-US')} USD</strong>
      </div>
      <PayButton userId={userId} total={total} />
    </div>
  );
}
