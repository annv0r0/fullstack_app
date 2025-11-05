import { getCartId } from '@/lib/cart-cookie';
import { getCartItems } from '@/lib/server/db/SQL/cart';
import RemoveFromCartButton from '@/components/Cart/RemoveFromCartButton';
import Quantity from '@/components/Cart/Quantity';
import s from './page.module.scss';
import CartItem from '@/components/Cart/CartItem';
import OrderDetails from '@/components/Cart/OrderDetails';

export default async function CartPage() {
  const { cartId } = await getCartId();
  const items = await getCartItems(cartId);

  if (!items.length)
    return (
      <div className={s.cart}>
        <h1 className={s.header}>Cart</h1>
        <p className={s.cart__empty}>Cart is empty</p>
      </div>
    );

  return (
    <div className={s.cart}>
      <h1 className={s.header}>Cart</h1>

      <div className={s.list}>
        {items.map((i) => (
          <form className={s.form} key={i.productId}>
            <CartItem i={i} />
            <Quantity productId={i.productId} quantity={i.quantity} price={Number(i.price)} />
            <RemoveFromCartButton productId={i.productId} cart={true} />
          </form>
        ))}
      </div>

      <div className={s.details}>
        <OrderDetails items={items}></OrderDetails>
      </div>
    </div>
  );
}
