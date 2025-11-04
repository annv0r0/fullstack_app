import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const CART_COOKIE = 'cartId';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function getCartId() {
  const cookieStore = await cookies();
  let cartId = cookieStore.get(CART_COOKIE)?.value;
  let setCookieIfNew = false;

  if (!cartId) {
    cartId = randomUUID();
    cookieStore.set({
      name: CART_COOKIE,
      value: cartId,
      httpOnly: true,
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    setCookieIfNew = true;
  }

  return { cartId, setCookieIfNew };
}
