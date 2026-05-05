-- Seed data for Universal Yums clone.
-- Run AFTER migrations/0001_initial.sql and migrations/0002_product_emoji.sql

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
select c.id, 'Japan Box', 'japan-box', '12+ snacks straight from Tokyo including matcha KitKats, Pocky, mochi, and more.', 'October', 2025, 3900, true
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

-- ── JAPAN PRODUCTS ──────────────────────────────────────────────────
-- KitKats
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Matcha KitKat', 'matcha-kitkat', 'Creamy white chocolate KitKat infused with premium Uji matcha.', '🍵', 349, 120, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Sake KitKat', 'sake-kitkat', 'Limited-edition KitKat infused with Masuizumi Junmai sake powder.', '🍶', 549, 35, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hojicha KitKat', 'hojicha-kitkat', 'Roasted Japanese green tea wrapped in white chocolate.', '🍵', 449, 60, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Otonano Amasa Dark KitKat', 'otonano-amasa-dark-kitkat', 'Adult sweetness — a 56% dark chocolate KitKat.', '🍫', 399, 90, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Strawberry KitKat', 'strawberry-kitkat', 'Pink KitKats made with real Tochigi prefecture strawberries.', '🍓', 379, 80, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Pocky & Pretz
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pocky Chocolate', 'pocky-chocolate', 'The original biscuit stick dipped in rich Japanese milk chocolate.', '🍫', 329, 200, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pocky Strawberry', 'pocky-strawberry', 'Crunchy biscuit sticks coated in sweet, creamy strawberry.', '🍓', 329, 180, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pocky Matcha', 'pocky-matcha', 'Hojicha-roasted biscuits coated in Uji matcha green tea cream.', '🍵', 379, 110, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pocky Cookies & Cream', 'pocky-cookies-cream', 'Cocoa-speckled cream coats crispy pretzel sticks.', '🍪', 349, 130, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pretz Tomato', 'pretz-tomato', 'Glico savory pretzel sticks dusted in tangy sun-dried tomato.', '🍅', 299, 100, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pretz Salad', 'pretz-salad', 'Light, crisp pretzel sticks seasoned with vegetable and herb.', '🥨', 299, 100, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Toppo Chocolate', 'toppo-chocolate', 'Inverted Pocky — crunchy biscuit tubes filled with smooth chocolate.', '🍫', 339, 90, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Hi-Chew
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hi-Chew Strawberry', 'hi-chew-strawberry', 'Long-lasting chewy candy bursting with juicy strawberry flavor.', '🍓', 199, 250, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hi-Chew Grape', 'hi-chew-grape', 'Bursting with Kyoho grape flavor.', '🍇', 199, 240, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hi-Chew Green Apple', 'hi-chew-green-apple', 'Tart and crisp — chewy green apple candy.', '🍏', 199, 200, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hi-Chew Mango', 'hi-chew-mango', 'Tropical Okinawan mango locked into a satisfyingly chewy bite.', '🥭', 199, 180, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Cookies & biscuits
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hello Panda Chocolate', 'hello-panda-chocolate', 'Mini panda-shaped biscuits filled with smooth milk chocolate.', '🐼', 379, 140, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Hello Panda Strawberry', 'hello-panda-strawberry', 'Crunchy panda biscuits hugging a sweet strawberry-cream center.', '🐼', 379, 130, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Koalas March Chocolate', 'koalas-march-chocolate', 'Adorable koala-stamped cookies filled with rich chocolate.', '🐨', 349, 110, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Yan Yan', 'yan-yan', 'Crispy biscuit sticks with a tub of chocolate cream for dipping.', '🍫', 269, 160, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Country Maam Vanilla', 'country-maam-vanilla', 'Soft-baked vanilla cookies studded with chocolate chips.', '🍪', 459, 70, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Chocolate
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Meiji Apollo Strawberry', 'meiji-apollo-strawberry', 'Tiny cone-shaped chocolates with a strawberry layer on top.', '🍓', 269, 200, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Tirol Chocolate Mix', 'tirol-chocolate-mix', 'Bite-sized Japanese chocolates in 5 surprise flavors.', '🍫', 499, 100, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Glico Caplico Strawberry', 'glico-caplico-strawberry', 'Strawberry-cream chocolate piped into a crispy ice-cream-cone.', '🍦', 329, 120, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Crunky Chocolate Bar', 'crunky-chocolate-bar', 'Smooth Japanese milk chocolate packed with crunchy puffed-rice malt balls.', '🍫', 279, 150, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Black Thunder', 'black-thunder', 'Cocoa cookies and crispy rice cloaked in milk chocolate.', '⚡', 159, 300, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Rice & mochi
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Daifuku Mochi (Red Bean)', 'daifuku-mochi-red-bean', 'Pillowy rice cake stuffed with sweet azuki red bean paste.', '🍡', 599, 50, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Ichigo Daifuku', 'ichigo-daifuku', 'A whole strawberry hugged by red bean paste, wrapped in soft mochi.', '🍓', 749, 30, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Soy-Glaze Senbei', 'soy-glaze-senbei', 'Crispy rice crackers brushed with sweet soy.', '🍘', 399, 90, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Norimaki Senbei', 'norimaki-senbei', 'Rice crackers wrapped in toasted nori seaweed.', '🍙', 449, 80, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Takoyaki Crackers', 'takoyaki-crackers', 'Crunchy snack flavored like Osakas famous octopus balls.', '🐙', 379, 70, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Chips
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Calbee Jagariko Cheese', 'jagariko-cheese', 'Crunchy potato sticks with cheddar cheese.', '🧀', 329, 140, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Calbee Jagabee Salt', 'calbee-jagabee-salt', 'Crispy potato fries lightly dusted with sea salt.', '🍟', 299, 130, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Calbee Shrimp Chips', 'calbee-shrimp-chips', 'Light-as-air ebi senbei made with real Hokkaido shrimp.', '🍤', 359, 100, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Wasabi Peas', 'wasabi-peas', 'Crunchy roasted peas dusted with fiery wasabi.', '🫛', 329, 130, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- Candy & sweets
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Konpeito Sugar Candy', 'konpeito-sugar-candy', 'Tiny star-shaped sugar candies in pastel colors.', '⭐', 549, 60, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Ramune Soda Candy', 'ramune-soda-candy', 'Hard candies bursting with fizzy ramune soda flavor.', '🥤', 199, 220, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Botan Rice Candy', 'botan-rice-candy', 'Lemon-orange chewy candy wrapped in edible rice paper.', '🍋', 159, 280, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Yokan Red Bean Bar', 'yokan-red-bean-bar', 'A firm jellied dessert made from azuki beans.', '🥢', 499, 50, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Tokyo Banana', 'tokyo-banana', 'Soft sponge cake with a pillow of smooth banana custard inside.', '🍌', 699, 40, true from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Karinto Brown Sugar', 'karinto-brown-sugar', 'Crunchy fried-dough sticks coated in dark Okinawan brown sugar.', '🥖', 429, 80, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Meiji Choco Baby', 'meiji-choco-baby', 'Tiny milk-chocolate beads in a pocket-sized box.', '🍫', 219, 200, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Marukawa Marble Gum', 'marukawa-marble-gum', 'Marble-shaped chewing gum in fruit flavors.', '🟣', 129, 320, false from public.countries c where c.slug = 'japan' on conflict (slug) do nothing;

-- ── KOREA ──────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Honey Butter Chips', 'honey-butter-chips', 'The viral sweet-and-savory potato chip that took Korea by storm.', '🍯', 499, 80, true from public.countries c where c.slug = 'south-korea' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Choco Pie', 'choco-pie', 'Marshmallow cookie sandwich dipped in chocolate.', '🥮', 259, 220, false from public.countries c where c.slug = 'south-korea' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Shin Ramyun Black', 'shin-ramyun-black', 'Premium spicy beef-bone broth ramyeon.', '🍜', 329, 180, false from public.countries c where c.slug = 'south-korea' on conflict (slug) do nothing;

-- ── BRAZIL ─────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Paçoca Rolls', 'pacoca-rolls', 'Crumbly Brazilian peanut candy — melts in your mouth.', '🥜', 299, 200, true from public.countries c where c.slug = 'brazil' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Brigadeiro Truffles', 'brigadeiro-truffles', 'Rich condensed-milk chocolate truffles rolled in sprinkles.', '🍫', 599, 70, false from public.countries c where c.slug = 'brazil' on conflict (slug) do nothing;

-- ── ITALY ──────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Baci Perugina', 'baci-perugina', 'Dark chocolate hazelnut kisses wrapped with a love note inside.', '💋', 599, 60, true from public.countries c where c.slug = 'italy' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Amaretti di Saronno', 'amaretti-di-saronno', 'Crisp almond cookies with that bittersweet amaretto perfume.', '🍪', 549, 80, false from public.countries c where c.slug = 'italy' on conflict (slug) do nothing;

-- ── MEXICO ─────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pulparindo Tamarind Candy', 'pulparindo', 'Sweet, salty, spicy, and sour all at once.', '🌶️', 129, 300, false from public.countries c where c.slug = 'mexico' on conflict (slug) do nothing;
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'De La Rosa Mazapán', 'mazapan', 'Crumbly peanut marzipan disc that melts the second it hits your tongue.', '🥜', 99, 400, false from public.countries c where c.slug = 'mexico' on conflict (slug) do nothing;

-- ── GERMANY ────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Haribo Tropifrutti', 'haribo-tropifrutti', 'Tropical gummy bears straight from Bonn, Germany.', '🐻', 399, 150, false from public.countries c where c.slug = 'germany' on conflict (slug) do nothing;

-- ── INDIA ──────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Masala Bhujia', 'masala-bhujia', 'Crispy spiced chickpea noodles — Indias favorite teatime snack.', '🌶️', 349, 100, false from public.countries c where c.slug = 'india' on conflict (slug) do nothing;

-- ── TURKEY ─────────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Pistachio Turkish Delight', 'pistachio-turkish-delight', 'Soft rosewater lokum studded with whole Antep pistachios.', '🌹', 899, 40, true from public.countries c where c.slug = 'turkey' on conflict (slug) do nothing;

-- ── THAILAND ───────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Coconut Crisp Rolls', 'coconut-crisp-rolls', 'Light Thai wafer rolls with sweet toasted coconut filling.', '🥥', 449, 90, false from public.countries c where c.slug = 'thailand' on conflict (slug) do nothing;

-- ── PHILIPPINES ────────────────────────────────────────────────────
insert into public.products (country_id, name, slug, description, emoji, price_cents, stock, featured)
select c.id, 'Ube Polvoron', 'ube-polvoron', 'Crumbly purple yam shortbread with a hint of vanilla.', '💜', 379, 70, false from public.countries c where c.slug = 'philippines' on conflict (slug) do nothing;
