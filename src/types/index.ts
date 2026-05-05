export type Country = {
  id: string
  name: string
  slug: string
  flag_emoji: string
  description: string
  featured: boolean
}

export type Box = {
  id: string
  country_id: string
  country?: Country
  name: string
  slug: string
  description: string
  month: string
  year: number
  image_url: string
  price_cents: number
  featured: boolean
}

export type Product = {
  id: string
  country_id: string | null
  country?: Country
  name: string
  slug: string
  description: string
  image_url: string
  /** Optional per-product emoji (e.g. 🍵 for matcha). Falls back to the country flag when absent. */
  emoji?: string
  price_cents: number
  stock: number
  featured: boolean
}

export type Plan = {
  id: string
  name: string
  slug: string
  description: string
  snack_count: number
  price_cents: number
  badge: string | null
  featured: boolean
}

export type CartItem = {
  product_id: string
  name: string
  price_cents: number
  image_url: string
  quantity: number
}

export type Order = {
  id: string
  user_id: string | null
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total_cents: number
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  shipping_country: string
  created_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  price_cents: number
}
