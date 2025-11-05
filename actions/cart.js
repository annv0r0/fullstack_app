'use server';
import { revalidatePath } from 'next/cache';

import { getCartId } from '@/lib/cart-cookie';
import { addItemToCart, removeItemFromCart, setCartItemQty } from '@/lib/server/db/SQL/cart';

export async function addToCart(product) {
  // { cartId, setCookieIfNew }
  const { cartId } = await getCartId();
  await addItemToCart(cartId, product);
}

export async function removeFromCart(productId) {
  const { cartId } = await getCartId();
  await removeItemFromCart(cartId, productId);
  revalidatePath('/cart');
}

export async function setQuantity(productId, qty) {
  const { cartId } = await getCartId();
  try {
    if (qty <= 0) return removeFromCart(productId);
    else {
      const r = await setCartItemQty(cartId, productId, qty);
      if (r?.ok) return r;
    }
    revalidatePath('/cart');
    console.log('setQuantity');

    return { ok: true };
  } catch (e) {
    console.error('setQuantity error', { cartId, productId, qty, e });
    return { ok: false, code: 'SERVER_ACTION_ERROR' };
  }
}
