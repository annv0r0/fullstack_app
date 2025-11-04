import Image from 'next/image';
import s from './Cart.module.scss';

export default async function CartItem({ i }) {
  return (
    <div className={s.item}>
      <Image src={i.image} alt={i.title} height={50} width={50}></Image>
      <p className={s.item__desc}>{i.title}</p>
    </div>
  );
}
