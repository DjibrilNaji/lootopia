import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { mockArtifacts } from '~/client/data/mockData';
// eslint-disable-next-line import/no-unresolved
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});


export async function action({ request }: ActionFunctionArgs) {
  const { items } = await request.json();

  const line_items = items.map((id: number) => {
    const artifact = mockArtifacts.find((a) => Number(a.id) === id);
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: artifact?.name ?? 'Objet inconnu'
        },
        unit_amount: (artifact?.price ?? 0) * 100
      },
      quantity: 1
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cart'
  });

  return json({ url: session.url });
}
