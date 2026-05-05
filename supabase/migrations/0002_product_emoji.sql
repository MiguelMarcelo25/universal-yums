-- Add an optional per-product emoji.
-- Nullable so existing rows stay valid; the UI falls back to country.flag_emoji.

alter table public.products
  add column if not exists emoji text;
