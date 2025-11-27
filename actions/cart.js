'use server';
import { revalidatePath } from 'next/cache';

import { addItemToCart, removeItemFromCart, setCartItemQty } from '@/lib/server/db/SQL/cart';
import getUserId from '@/lib/utils/userId';

export async function addToCart(product) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { ok: false, code: 'UNAUTHENTICATED' };
    }
    await addItemToCart(userId, product);
    return { ok: true };
  } catch (e) {
    console.error('addToCart error', e);
    return { ok: false, code: 'SERVER_ACTION_ERROR' };
  }
}

export async function removeFromCart(productId) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { ok: false, code: 'UNAUTHENTICATED' };
    }
    const res = await removeItemFromCart(userId, productId);
    if (res.removed === 0) {
      return { ok: false, code: res.reason ?? 'NOT_IN_CART' };
    }
    revalidatePath('/cart');
    return { ok: true };
  } catch (e) {
    console.error('removeFromCart error', e);
    return { ok: false, code: 'SERVER_ACTION_ERROR' };
  }
}

export async function setQuantity(productId, qty) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { ok: false, code: 'UNAUTHENTICATED' };
    }
    if (qty <= 0) {
      return removeFromCart(productId);
    }
    const res = await setCartItemQty(userId, productId, qty);
    if (res.count === 0) {
      return { ok: false, code: 'NOT_IN_CART' };
    }
    revalidatePath('/cart');
    return { ok: true, quantity: qty };
  } catch (e) {
    console.error('setQuantity error', { productId, qty, e });
    return { ok: false, code: 'SERVER_ACTION_ERROR' };
  }
}
