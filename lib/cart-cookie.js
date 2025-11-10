import { cookies } from 'next/headers';

export const CART_COOKIE = 'cartId';

export async function getCartId() {
  const cookieStore = await cookies();
  let cartId = cookieStore.get(CART_COOKIE)?.value || null;

  return { cartId };
}
