import Item from './Item';
import s from './ItemList.module.scss';
import Link from 'next/link';

export default async function ItemList({ items }) {
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
