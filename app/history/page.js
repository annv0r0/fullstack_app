import { getOrders } from '@/lib/server/db/SQL/orders';
import s from './page.module.scss';
import OrderItem from '@/components/Orders/OrderItem';
import getUserId from '@/lib/utils/userId';

export default async function History() {
  const userId = await getUserId();
  const orders = await getOrders(userId);

  const noOrders = !orders || orders.length === 0;
  return (
    <div className={s.history}>
      <h1 className={s.history__header}>Orders</h1>
      <ul className={s.history__list}>
        {noOrders && <p>No orders found</p>}
        {!noOrders && orders.map((order) => <OrderItem key={order.id} order={order} />)}
      </ul>
    </div>
  );
}
