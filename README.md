# Universal Yums clone

A React + Tailwind + Supabase + Vercel e-commerce site inspired by [universalyums.com](https://www.universalyums.com/) — international snack subscription boxes plus a per-country shop.

## Quick start (local — zero config)

```bash
npm install
npm run dev
```

The site opens at http://localhost:5173 and runs with **mock data** out of the box. Auth, cart, checkout, and orders all work using localStorage.

## Connecting Supabase (real Postgres + Auth)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and fill in your project URL + anon key:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
3. In the Supabase SQL editor, run **in order**:
   - `supabase/migrations/0001_initial.sql` — creates tables, RLS, admin trigger
   - `supabase/seed.sql` — seeds countries, plans, boxes, products
4. Restart `npm run dev`. The yellow "demo mode" banner in the navbar disappears when Supabase is detected.

To give a user admin access (so they can write via the admin UI):
```sql
update public.profiles set is_admin = true where id = '<your-user-id>';
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel — it detects Vite automatically.
3. Add the two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in Vercel's project settings.
4. Deploy. `vercel.json` already contains the SPA rewrite so React Router works.

## Tech

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (custom brand palette + Fraunces display font)
- **React Router 6** for routing
- **Supabase** for Postgres, Auth, RLS
- Mock data fallback keeps the app usable without any backend

## Structure

```
src/
  components/    Navbar, Footer, Layout, ProductCard, BoxCard, PlanCard, CountryCard
  context/       AuthContext, CartContext
  data/          Mock data (countries, boxes, products, plans)
  lib/           supabase client, api (Supabase or mock), format helpers
  pages/         Home, Subscribe, Shop, Cart, Checkout, SignIn/Up, Account, Orders, admin/
supabase/
  migrations/    0001_initial.sql (schema + RLS)
  seed.sql       Sample catalog data
```

## What's stubbed

- **Payments**: Checkout is a form that inserts an order row; plug in Stripe via a Vercel function to charge real money.
- **Images**: All product and box artwork is rendered as CSS-gradient tiles with flag emojis for visual appeal. Swap `image_url` into the cards once you upload real assets to Supabase Storage.
- **Subscriptions**: Plans insert a row into `subscriptions` — there's no recurring billing without Stripe.
