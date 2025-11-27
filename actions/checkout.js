'use server';
// import Stripe from 'stripe';
import { getCartItems } from '@/lib/server/db/SQL/cart';
import { addOrder } from '@/lib/server/db/SQL/orders';
import { revalidatePath } from 'next/cache';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function startCheckout(userId) {
  const items = await getCartItems(userId);

  const order = await addOrder(userId);
  revalidatePath('/cart');
  return { ok: true };

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
