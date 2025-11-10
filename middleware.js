import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const res = NextResponse.next({ request: { headers: req.headers } });
    const cartCookie = req.cookies.get('cartId');

    if (!cartCookie) {
      const newCartId = crypto.randomUUID();
      console.log('New cart cookie created:', newCartId);

      res.cookies.set('cartId', newCartId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return res;
  },
  {
    pages: { signIn: '/auth' },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/items/:path*', '/cart'],
};
