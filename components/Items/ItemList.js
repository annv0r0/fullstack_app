import Item from './Item';
import s from './ItemList.module.scss';
import Link from 'next/link';
import { getItems } from '@/lib/server/db/SQL/items';

export default async function ItemList() {
  const items = await getItems();

  return (
    <div className={s.container}>
      {items.map((item) => (
        <Link href={`/items/${item.article}`} key={item.article}>
          <Item {...item} />
        </Link>
      ))}
    </div>
  );
}
