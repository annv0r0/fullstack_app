'use server';

// import Stripe from 'stripe';
import { getCartItems } from '@/lib/server/db/SQL/cart';
import { getCartId } from '@/lib/cart-cookie';
import { redirect } from 'next/navigation';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function startCheckout(cartId) {
  const items = await getCartItems(cartId);

  // temporary
  redirect('/placeholder');

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: items.map((i) => ({
  //     price_data: {
  //       currency: 'usd',
  //       product_data: { name: i.title },
  //       unit_amount: Math.round(i.price * 100),
  //     },
  //     quantity: i.quantity,
  //   })),
  //   mode: 'payment',
  //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  // });

  // return session.url;
}
