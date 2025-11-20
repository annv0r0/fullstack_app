import { prisma } from '@/lib/server/db/SQL/prisma';

export async function addItemToCart(userId, cartId, product) {
  await prisma.cart.upsert({
    where: { id: cartId },
    create: { id: cartId, userId },
    update: { userId },
  });
  const res = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId: product.id } },
    update: { quantity: { increment: 1 } },
    create: {
      cartId,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    },
  });

  return res;
}

export async function removeItemFromCart(cartId, productId) {
  try {
    await prisma.cartItem.delete({
      where: { cartId_productId: { cartId, productId } },
    });
  } catch (e) {
    return { removed: 0 };
  }
}

export async function getCartItems(cartId) {
  try {
    const res = await prisma.cartItem.findMany({
      where: { cartId },
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
    return res;
  } catch (e) {
    return { cartItems: 0 };
  }

  return;
}

export async function setCartItemQty(cartId, productId, qty) {
  const res = await prisma.cartItem.updateMany({
    where: { cartId, productId: productId },
    data: { quantity: qty },
  });

  if (res.count === 0) {
    console.warn('cartItem not found for update', cartId);
    return { ok: false, reason: 'not_in_cart' };
  }
  return { ok: true, quantity: qty };
}
