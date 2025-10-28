import ItemList from '@/components/Items/ItemList';
import { getItems } from '@/lib/server/db/items';
import s from './Dashboard.module.scss';

export default async function Dashboard() {
  const items = await getItems();

  return (
    <div className={s.container}>
      <h1 className={s.title}>YOUR ITEMS</h1>
      <ItemList items={items} />
    </div>
  );
}
