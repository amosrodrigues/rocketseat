import Stripe from 'stripe';
import packageJson from '../../package.json';

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignews',
    version: packageJson.version,
  },
});
