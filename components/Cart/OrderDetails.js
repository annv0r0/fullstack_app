import s from './Cart.module.scss';

export default function OrderDetails({ items }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = 0;
  const promo = 0;
  const total = subtotal - discount - promo;

  return (
    <div className={s.details}>
      <h2 className={s.details__header}>Order details</h2>

      <div className={s.details__sum}>
        <p>
          {items.length} items — {subtotal.toLocaleString('en-US')} USD
        </p>
        <p>Discount — {discount ? `-${discount.toLocaleString('en-US')} USD` : '0 USD'}</p>
        <p>Promo Codes — {promo ? `-${promo.toLocaleString('en-US')} USD` : '0 USD'}</p>
      </div>

      <div className={s.details__total}>
        <strong>Total — {total.toLocaleString('en-US')} USD</strong>
      </div>

      <button className={s.details__btn} type="button">
        Pay now
      </button>
    </div>
  );
}
