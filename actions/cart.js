'use server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

import { CART_COOKIE } from '@/lib/cart-cookie';
import { getCartId } from '@/lib/cart-cookie';
import { addItemToCart, removeItemFromCart, setCartItemQty } from '@/lib/server/db/SQL/cart';
import getUserId from '@/lib/userId';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function ensureCartId() {
  const store = cookies();
  let cartId = store.get(CART_COOKIE)?.value;

  if (!cartId) {
    cartId = randomUUID();
    store.set(CART_COOKIE, cartId);
  }

  return { cartId };
}

export async function addToCart(product) {
  const { cartId } = await getCartId();
  const userId = await getUserId();
  await addItemToCart(userId, cartId, product);
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
    const r = await setCartItemQty(cartId, productId, qty);
    if (r?.ok) return r;
    revalidatePath('/cart');

    return { ok: true };
  } catch (e) {
    console.error('setQuantity error', { cartId, productId, qty, e });
    return { ok: false, code: 'SERVER_ACTION_ERROR' };
  }
}
