import Image from 'next/image';
import s from './OrderItem.module.scss';

export default async function OrderItem({ order }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColor = s[`order__status${order.status}`] || s.order__statusDEFAULT;

  return (
    <li className={s.order}>
      <div className={s.order__header}>
        <div className={s.order__header_wrapping}>
          <h3 className={s.order__id}>Order #{order.id.slice(-8)}</h3>
          <p className={s.order__date}>{formatDate(order.createdAt)}</p>
        </div>
        <div className={`${s.order__status} ${statusColor}`}>{order.status}</div>
      </div>

      <div className={s.order__items}>
        {order.items?.map((item) => (
          <div key={item.id} className={s.order__item}>
            {item.image && (
              <div className={s.order__item_image}>
                <Image src={item.image} alt={item.title} width={80} height={80} className={s.order__image} />
              </div>
            )}
            <div className={s.order__item_info}>
              <h4 className={s.order__item_title}>{item.title}</h4>
              <div className={s.order__item_details}>
                <span className={s.order__item_quantity}>Qty: {item.quantity}</span>
                <span className={s.order__item_price}>
                  ${(item.price * item.quantity).toFixed(2)} {item.currency || 'USD'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.order__summary}>
        <div className={s.order__summary_row}>
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div className={s.order__summary_row}>
            <span>Discount</span>
            <span className={s.order__discount}>-${order.discount.toFixed(2)}</span>
          </div>
        )}
        <div className={`${s.order__summary_row} ${s.order__summary_row_total}`}>
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </li>
  );
}
