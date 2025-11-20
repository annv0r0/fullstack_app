import { prisma } from '@/lib/server/db/SQL/prisma';
import { normalizeOrder } from '@/lib/server/db/SQL/normalize';

export async function addOrder(cartId, userId) {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
  });
  if (!cartItems.length) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  // TODO: implement discount and promo codes in DB
  const discount = 0;
  const promo = 0;
  const total = subtotal - discount - promo;

  const [order] = await prisma.$transaction([
    prisma.order.create({
      include: { items: true },
      data: {
        userId,
        subtotal: subtotal,
        discount: discount + promo,
        total: total,
        status: 'PAID',
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
    }),
    prisma.cart.delete({ where: { id: cartId } }),
  ]);
  if (!order) return null;
  return normalizeOrder(order);
}

export async function getOrders(userId) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  if (!orders) return null;
  return orders.map(normalizeOrder);
}

// TODO: chech if it is required
export async function getOrderById(orderId, userId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId, userId },
    include: { items: true },
  });
  if (!order || order.userId !== userId) return null;
  return normalizeOrder(order);
}
