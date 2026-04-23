-- Universal Yums clone — initial schema
-- Run in Supabase SQL editor, or with the Supabase CLI.

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  flag_emoji text,
  description text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.boxes (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete cascade,
  name text not null,
  slug text unique not null,
  description text,
  month text,
  year int,
  image_url text,
  price_cents int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  price_cents int not null,
  stock int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  snack_count int,
  price_cents int not null,
  badge text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan_id uuid references public.plans(id),
  status text not null default 'active',
  started_at timestamptz not null default now(),
  cancelled_at timestamptz
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending',
  total_cents int not null default 0,
  shipping_name text,
  shipping_address text,
  shipping_city text,
  shipping_state text,
  shipping_zip text,
  shipping_country text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text,
  quantity int not null default 1,
  price_cents int not null
);

-- Auto-create a profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.countries enable row level security;
alter table public.boxes enable row level security;
alter table public.products enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read policies for catalog
drop policy if exists "Public read countries" on public.countries;
create policy "Public read countries" on public.countries for select using (true);
drop policy if exists "Public read boxes" on public.boxes;
create policy "Public read boxes" on public.boxes for select using (true);
drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products for select using (true);
drop policy if exists "Public read plans" on public.plans;
create policy "Public read plans" on public.plans for select using (true);

-- Profiles: users can read & update their own profile
drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile" on public.profiles for update using (auth.uid() = id);

-- Subscriptions: users manage their own
drop policy if exists "Read own subs" on public.subscriptions;
create policy "Read own subs" on public.subscriptions for select using (auth.uid() = user_id);
drop policy if exists "Insert own subs" on public.subscriptions;
create policy "Insert own subs" on public.subscriptions for insert with check (auth.uid() = user_id);

-- Orders: users see & create their own
drop policy if exists "Read own orders" on public.orders;
create policy "Read own orders" on public.orders for select using (auth.uid() = user_id);
drop policy if exists "Insert own orders" on public.orders;
create policy "Insert own orders" on public.orders for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Read own order items" on public.order_items;
create policy "Read own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid()))
);
drop policy if exists "Insert own order items" on public.order_items;
create policy "Insert own order items" on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or o.user_id is null))
);

-- Admin can do everything (checks profiles.is_admin)
create or replace function public.is_admin() returns boolean language sql stable as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

drop policy if exists "Admin all countries" on public.countries;
create policy "Admin all countries" on public.countries for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin all boxes" on public.boxes;
create policy "Admin all boxes" on public.boxes for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin all products" on public.products;
create policy "Admin all products" on public.products for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin all plans" on public.plans;
create policy "Admin all plans" on public.plans for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin all orders" on public.orders;
create policy "Admin all orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
