import Item from '@/components/Items/Item';
import { getItemById } from '@/lib/server/db/items';
import { redirect } from 'next/navigation';

export default async function ItemPage({ params }) {
  const { id } = await params;

  const data = await getItemById(id);

  return <Item pageType="detail" {...data} />;
}
