import Image from 'next/image';
import clsx from 'clsx';
import s from './Item.module.scss';
import AddToCartButton from '../Cart/AddToCartButton';
import RemoveFromCartButton from '../Cart/RemoveFromCartButton';

export default function Item({ item, pageType: pageType = 'card' }) {
  const { id, article, title, description, weight, unit, price, available, rating, image, date } = item;

  const productForCart = {
    id: String(id),
    title,
    price: item.price ? Number(item.price) : null,
    image: item.image,
  };

  return (
    <div className={clsx(s.container, pageType === 'detail' ? s.container_detail : s.container_card)}>
      <div className={s.imageWrapper}>
        <Image className={s.image} src={image} alt={title} fill sizes={100} />
      </div>
      <div className={s.card}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__desc}>{description}</p>
        <br />
        <p className={s.card__article}>Article: {article}</p>
        <p className={s.card__price}>Price: {price ? `$${price}` : 'N/A'}</p>
        <p className={s.card__weight}>
          Weight: {weight}
          {unit}
        </p>
        <p className={s.card__available}>Available: {available === 'TRUE' ? 'Yes' : 'No'}</p>
        <p className={s.card__rating}>Rating: {rating} / 5</p>
      </div>
      <div className={s.actions}>
        <div className={s.btns}>
          <AddToCartButton product={productForCart} />
          <RemoveFromCartButton productId={productForCart.id} />
        </div>
      </div>
    </div>
  );
}
