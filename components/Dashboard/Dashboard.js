import ItemList from '@/components/Items/ItemList';
import s from './Dashboard.module.scss';
// import { getItems } from '@/lib/server/db/MongoDB/items';
import { getItems } from '@/lib/server/db/SQL/items';

export default async function Dashboard() {
  const items = await getItems();

  return (
    <div className={s.container}>
      <h1 className={s.title}>YOUR ITEMS</h1>
      <ItemList items={items} />
    </div>
  );
}
