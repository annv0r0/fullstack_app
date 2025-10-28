import Image from 'next/image';
import { addToCart } from '@/actions/cart';
import { removeFromCart } from '@/actions/cart';
import clsx from 'clsx';
import s from './Item.module.scss';

export default function Item({
  pageType: pageType = 'card',
  article,
  title,
  description,
  weight,
  unit,
  price,
  available,
  rating,
  image,
  date,
}) {
  return (
    <div className={clsx(s.container, pageType === 'detail' ? s.container_detail : s.container_card)}>
      <div className={s.imageWrapper}>
        <Image className={s.image} src={image || '/placeholder.png'} alt={title} fill={true} />
      </div>
      <div className={s.card}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__desc}>{description}</p>
        <p className={s.card__price}>Price: {price ? `$${price}` : 'N/A'}</p>
        <p className={s.card__weight}>
          Weight: {weight}
          {unit}
        </p>
        <p className={s.card__available}>Available: {available === 'TRUE' ? 'Yes' : 'No'}</p>
        <p className={s.card__rating}>Rating: {rating} / 5</p>
        <p className={s.card__article}>Article: {article}</p>
      </div>
      <div className={s.actions}>
        <div className={s.btns}>
          <form className={s.add} action={addToCart}>
            <input className={s.add__article} type="hidden" name="article" value={article} />
            <button className={s.add__btn} type="submit">
              Add
            </button>
          </form>

          <form className={s.romove} action={removeFromCart}>
            <input className={s.remove__article} type="hidden" name="article" value={article} />
            <button className={s.remove__btn} type="submit">
              Remove
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
