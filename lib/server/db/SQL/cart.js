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
