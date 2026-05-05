import { supabase, supabaseEnabled } from './supabase'
import { mockBoxes, mockCountries, mockPlans, mockProducts } from '../data/mock'
import type { Box, Country, Plan, Product, Order } from '../types'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getCountries(): Promise<Country[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('countries').select('*').order('name')
    if (error) throw error
    return (data ?? []) as Country[]
  }
  await delay()
  return mockCountries
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('countries').select('*').eq('slug', slug).maybeSingle()
    if (error) throw error
    return (data as Country) ?? null
  }
  await delay()
  return mockCountries.find((c) => c.slug === slug) ?? null
}

export async function getBoxes(): Promise<Box[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('boxes').select('*, country:countries(*)').order('year', { ascending: false })
    if (error) throw error
    return (data ?? []) as Box[]
  }
  await delay()
  return mockBoxes
}

export async function getBoxBySlug(slug: string): Promise<Box | null> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('boxes').select('*, country:countries(*)').eq('slug', slug).maybeSingle()
    if (error) throw error
    return (data as Box) ?? null
  }
  await delay()
  return mockBoxes.find((b) => b.slug === slug) ?? null
}

export async function getProducts(opts?: { countrySlug?: string; search?: string }): Promise<Product[]> {
  if (supabaseEnabled && supabase) {
    let q = supabase.from('products').select('*, country:countries(*)').order('name')
    if (opts?.countrySlug) {
      const country = await getCountryBySlug(opts.countrySlug)
      if (country) q = q.eq('country_id', country.id)
    }
    if (opts?.search) q = q.ilike('name', `%${opts.search}%`)
    const { data, error } = await q
    if (error) throw error
    return (data ?? []) as Product[]
  }
  await delay()
  let list = mockProducts
  if (opts?.countrySlug) list = list.filter((p) => p.country?.slug === opts.countrySlug)
  if (opts?.search) {
    const s = opts.search.toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s),
    )
  }
  return list
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('products').select('*, country:countries(*)').eq('slug', slug).maybeSingle()
    if (error) throw error
    return (data as Product) ?? null
  }
  await delay()
  return mockProducts.find((p) => p.slug === slug) ?? null
}

export async function getPlans(): Promise<Plan[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase.from('plans').select('*').order('price_cents')
    if (error) throw error
    return (data ?? []) as Plan[]
  }
  await delay()
  return mockPlans
}

export async function createOrder(payload: {
  user_id: string | null
  total_cents: number
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  shipping_country: string
  items: { product_id: string; product_name: string; quantity: number; price_cents: number }[]
}): Promise<Order> {
  if (supabaseEnabled && supabase) {
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: payload.user_id,
        total_cents: payload.total_cents,
        shipping_name: payload.shipping_name,
        shipping_address: payload.shipping_address,
        shipping_city: payload.shipping_city,
        shipping_state: payload.shipping_state,
        shipping_zip: payload.shipping_zip,
        shipping_country: payload.shipping_country,
        status: 'paid',
      })
      .select()
      .single()
    if (error) throw error
    const items = payload.items.map((i) => ({ ...i, order_id: order.id }))
    const { error: itemErr } = await supabase.from('order_items').insert(items)
    if (itemErr) throw itemErr
    return order as Order
  }
  await delay()
  const fake: Order = {
    id: `ord_${Date.now()}`,
    user_id: payload.user_id,
    status: 'paid',
    total_cents: payload.total_cents,
    shipping_name: payload.shipping_name,
    shipping_address: payload.shipping_address,
    shipping_city: payload.shipping_city,
    shipping_state: payload.shipping_state,
    shipping_zip: payload.shipping_zip,
    shipping_country: payload.shipping_country,
    created_at: new Date().toISOString(),
    items: payload.items.map((i, idx) => ({
      id: `item_${idx}`,
      order_id: `ord_${Date.now()}`,
      product_id: i.product_id,
      product_name: i.product_name,
      quantity: i.quantity,
      price_cents: i.price_cents,
    })),
  }
  const existing = JSON.parse(localStorage.getItem('mock_orders') || '[]') as Order[]
  existing.unshift(fake)
  localStorage.setItem('mock_orders', JSON.stringify(existing))
  return fake
}

export async function getOrdersForUser(userId: string | null): Promise<Order[]> {
  if (supabaseEnabled && supabase && userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []) as Order[]
  }
  await delay()
  return JSON.parse(localStorage.getItem('mock_orders') || '[]') as Order[]
}
