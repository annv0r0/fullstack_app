import { prisma } from '@/lib/server/db/SQL/prisma';

export async function addItemToCart(userId, product) {
  if (!userId) {
    throw new Error('UNAUTHENTICATED');
  }

  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  const item = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    update: { quantity: { increment: 1 } },
    create: {
      cartId: cart.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    },
  });

  return item;
}

export async function removeItemFromCart(userId, productId) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    return { removed: 0, reason: 'CART_NOT_FOUND' };
  }

  try {
    await prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    return { removed: 1 };
  } catch (e) {
    return { removed: 0, reason: 'NOT_IN_CART' };
  }
}

export async function getCartItems(userId) {
  const items = await prisma.cartItem.findMany({
    where: { cart: { userId } },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      cartId: true,
      productId: true,
      title: true,
      price: true,
      image: true,
      quantity: true,
    },
  });

  return items;
}

export async function setCartItemQty(userId, productId, qty) {
  const res = await prisma.cartItem.updateMany({
    where: { cart: { userId }, productId },
    data: { quantity: qty },
  });

  return res;
}
