import Item from '@/components/Items/Item';
// import { getItemById } from '@/lib/server/db/MongoDB/items';
import { getItemById } from '@/lib/server/db/SQL/items';

export default async function ItemPage({ params }) {
  const { id } = await params;

  const data = await getItemById(id);

  return <Item item={data} pageType="detail" />;
}
