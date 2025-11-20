export function normalizeOrder(order) {
  // TODO: check normalization while saving to DB in /lib/server/db/SQL/orders.js
  if (!order) return null;
  const normalizedOrder = {
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    items: order.items?.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  };
  return normalizedOrder;
}
