import Item from './Item';
import s from './ItemList.module.scss';
import Link from 'next/link';
import { getItems } from '@/lib/server/db/SQL/items';

export default async function ItemList() {
  const items = await getItems();
  const noItemList = !items || items.length === 0;

  return (
    <div className={s.container}>
      {noItemList ? (
        <Link className={s.link} href="/upload">
          Please, upload csv data &#8594;
        </Link>
      ) : (
        <>
          {items.map((item) => (
            <Link href={`/items/${item.article}`} key={item.article}>
              <Item item={item} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
