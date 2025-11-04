'use server';
import { getCartId } from '@/lib/cart-cookie';
import { addItemToCart, removeItemFromCart } from '@/lib/server/db/SQL/cart';

export async function addToCart(product) {
  // { cartId, setCookieIfNew }
  const { cartId } = await getCartId();
  await addItemToCart(cartId, product);
}

export async function removeFromCart(productId) {
  const { cartId } = await getCartId();
  await removeItemFromCart(cartId, productId);
}

// export async function setQuantity(productId, qty) {
//   const { cartId } = await getCartId();
//   if (qty <= 0) return removeFromCart(productId);
//   await prisma.cartItem.update({
//     where: { cartId_productId: { cartId, productId } },
//     data: { quantity: qty },
//   });
// }

export async function getCart() {
  const { cartId } = await getCartId();
  return prisma.cartItem.findMany({ where: { cartId } });
}
