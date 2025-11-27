import Image from 'next/image';
import Link from 'next/link';
import { getCartItems } from '@/lib/server/db/SQL/cart';
import s from './Cart.module.scss';
import { auth } from '@/auth';
import getUserId from '@/lib/utils/userId';

export default async function CartIcon() {
  const session = await auth();

  if (!session) return null;

  const userId = await getUserId();
  const items = await getCartItems(userId);
  const totalCount = Array.isArray(items) ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <Link href="/cart">
      <Image
        className={s.cart__icon}
        src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/images/cart.png`}
        width={30}
        height={30}
        alt="Cart"
      />
      {totalCount > 0 && <span className={s.cart__amount}>{totalCount}</span>}
    </Link>
  );
}
