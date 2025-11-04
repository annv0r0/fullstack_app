import { Suspense } from 'react';
import ItemList from '@/components/Items/ItemList';
import s from './Dashboard.module.scss';

export default async function Dashboard() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>YOUR ITEMS</h1>
      <Suspense fallback={<p className={s.loading}>Loading items...</p>}>
        <ItemList />
      </Suspense>
    </div>
  );
}
