-- Seed data for Universal Yums clone.
-- Run AFTER migrations/0001_initial.sql

insert into public.countries (name, slug, flag_emoji, description, featured) values
  ('Japan', 'japan', '🇯🇵', 'Umami, matcha, and mochi galore — Japan is a playground of flavors.', true),
  ('Brazil', 'brazil', '🇧🇷', 'Tropical fruits, guarana, and sweet dulce de leite treats from South America.', true),
  ('South Korea', 'south-korea', '🇰🇷', 'Spicy ramyeon, honey butter chips, and sweet-savory Korean classics.', true),
  ('Italy', 'italy', '🇮🇹', 'Crunchy biscotti, creamy gelato flavors, and irresistible hazelnut delights.', true),
  ('Mexico', 'mexico', '🇲🇽', 'Chili, lime, tamarind — bold and unforgettable flavors from Mexico.', false),
  ('Germany', 'germany', '🇩🇪', 'Gummy bears, rich chocolates, and crisp waffle classics.', false),
  ('India', 'india', '🇮🇳', 'Masala-dusted snacks, cardamom sweets, and crunchy namkeen mixes.', false),
  ('Turkey', 'turkey', '🇹🇷', 'Turkish delight, pistachio treats, and crispy simit-inspired snacks.', false),
  ('Thailand', 'thailand', '🇹🇭', 'Coconut chips, mango sticky flavors, and sweet chili crunchies.', false),
  ('Philippines', 'philippines', '🇵🇭', 'Ube, pandan, and calamansi — tropical treasures from the islands.', false)
on conflict (slug) do nothing;

insert into public.plans (name, slug, description, snack_count, price_cents, badge, featured) values
  ('Yum Box', 'yum', '5–7 snacks from a new country each month.', 6, 1800, null, true),
  ('Yum Yum Box', 'yum-yum', 'Everything in the Yum Box plus 5 more snacks.', 12, 2700, 'Most Popular', true),
  ('Super Yum Box', 'super-yum', '20+ snacks and a larger booklet.', 20, 4000, 'Best Value', true)
on conflict (slug) do nothing;

-- Boxes
insert into public.boxes (country_id, name, slug, description, month, year, price_cents, featured)
select c.id, 'Japan Box', 'japan-box', '12+ snacks straight from Tokyo including matcha KitKats, wasabi peas, and mochi.', 'October', 2025, 3900, true
from public.countries c where c.slug = 'japan'
on conflict (slug) do nothing;

insert into public.boxes (country_id, name, slug, description, month, year, price_cents, featured)
select c.id, 'Brazil Box', 'brazil-box', 'Brigadeiros, Paçoca, Guaraná gummies and more from the heart of Brazil.', 'September', 2025, 3900, true
from public.countries c where c.slug = 'brazil'
on conflict (slug) do nothing;

insert into public.boxes (country_id, name, slug, description, month, year, price_cents, featured)
select c.id, 'South Korea Box', 'south-korea-box', 'Honey butter chips, choco pies, and spicy ramyeon noodles from Seoul.', 'August', 2025, 3900, true
from public.countries c where c.slug = 'south-korea'
on conflict (slug) do nothing;

-- Products
insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Matcha KitKat', 'matcha-kitkat', 'Creamy white chocolate KitKat infused with premium Uji matcha.', 349, 120, true
from public.countries c where c.slug = 'japan'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Honey Butter Chips', 'honey-butter-chips', 'The viral sweet-and-savory potato chip that took Korea by storm.', 499, 80, true
from public.countries c where c.slug = 'south-korea'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Paçoca Rolls', 'pacoca-rolls', 'Crumbly Brazilian peanut candy — melts in your mouth.', 299, 200, true
from public.countries c where c.slug = 'brazil'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Baci Perugina', 'baci-perugina', 'Dark chocolate hazelnut "kisses" wrapped with a love note.', 599, 60, true
from public.countries c where c.slug = 'italy'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Pulparindo Tamarind Candy', 'pulparindo', 'Sweet, salty, spicy, and sour — a classic Mexican candy bar.', 129, 300, false
from public.countries c where c.slug = 'mexico'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Haribo Tropifrutti', 'haribo-tropifrutti', 'Tropical gummy bears straight from Bonn, Germany.', 399, 150, false
from public.countries c where c.slug = 'germany'
on conflict (slug) do nothing;

insert into public.products (country_id, name, slug, description, price_cents, stock, featured)
select c.id, 'Pistachio Turkish Delight', 'pistachio-turkish-delight', 'Soft rosewater lokum studded with whole Antep pistachios.', 899, 40, true
from public.countries c where c.slug = 'turkey'
on conflict (slug) do nothing;
