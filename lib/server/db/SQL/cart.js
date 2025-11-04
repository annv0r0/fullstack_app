import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function addItemToCart(cartId, product) {
  console.log('cartId, product', cartId, product);
  await prisma.cart.upsert({
    where: { id: cartId },
    create: { id: cartId },
    update: {},
  });
  await prisma.cartItem.upsert({
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
  return prisma.cartItem.findMany({
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
}

export async function setCartItemQty(cartId, productId, qty) {
  console.log('cartId, productId, qty', cartId, productId, qty);
  await prisma.cartItem.update({
    where: { cartId_productId: { cartId, productId: String(productId) } },
    data: { quantity: qty },
  });
}

export async function getCartById(cartId) {
  return prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  });
}
