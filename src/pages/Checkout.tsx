import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, getPlans } from '../lib/api'
import { formatPrice } from '../lib/format'
import type { Plan } from '../types'

export default function Checkout() {
  const { items, subtotalCents, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [plan, setPlan] = useState<Plan | null>(null)

  const [form, setForm] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const planSlug = params.get('plan')
  useEffect(() => {
    if (!planSlug) return
    getPlans().then((plans) => {
      const p = plans.find((x) => x.slug === planSlug)
      if (p) setPlan(p)
    })
  }, [planSlug])

  const shipping = subtotalCents >= 2500 ? 0 : items.length > 0 ? 499 : 0
  const planCents = plan?.price_cents ?? 0
  const total = subtotalCents + shipping + planCents

  if (items.length === 0 && !plan) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display font-black text-4xl">Nothing to checkout</h1>
        <p className="mt-3 text-gray-600">Add items to your cart or pick a subscription plan.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/shop" className="btn-primary">Shop</Link>
          <Link to="/subscribe" className="btn-outline-navy">Subscribe</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const orderItems = items.map((i) => ({
        product_id: i.product_id,
        product_name: i.name,
        quantity: i.quantity,
        price_cents: i.price_cents,
      }))
      if (plan) {
        orderItems.push({
          product_id: plan.id,
          product_name: `${plan.name} (subscription)`,
          quantity: 1,
          price_cents: plan.price_cents,
        })
      }
      await createOrder({
        user_id: user?.id ?? null,
        total_cents: total,
        shipping_name: form.name,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_zip: form.zip,
        shipping_country: form.country,
        items: orderItems,
      })
      clear()
      navigate('/orders?welcome=1')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display font-black text-4xl">Checkout</h1>
      <p className="text-gray-600 text-sm mt-1">
        This is a demo checkout — no real payment is processed. Swap in Stripe for production.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-navy-100">
            <h2 className="font-display font-bold text-xl">Shipping</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <div className="md:col-span-2">
                <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
              </div>
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
              <Field label="ZIP" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} required />
              <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} required />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-navy-100">
            <h2 className="font-display font-bold text-xl">Payment</h2>
            <div className="mt-4 p-6 rounded-2xl bg-navy-50 border border-dashed border-navy-200 text-center">
              <div className="text-4xl mb-2">💳</div>
              <p className="font-semibold">Demo mode — no card required</p>
              <p className="text-sm text-gray-600 mt-1">
                In production, this would be a Stripe Elements card form.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-navy-100 h-fit sticky top-24">
          <h2 className="font-display font-bold text-xl">Order</h2>
          <div className="mt-4 space-y-2 text-sm">
            {plan && (
              <div className="flex justify-between">
                <span>{plan.name}</span>
                <span>{formatPrice(plan.price_cents)}</span>
              </div>
            )}
            {items.map((i) => (
              <div key={i.product_id} className="flex justify-between">
                <span className="truncate">
                  {i.name} <span className="text-gray-400">× {i.quantity}</span>
                </span>
                <span>{formatPrice(i.price_cents * i.quantity)}</span>
              </div>
            ))}
            <hr className="my-2 border-navy-100" />
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
          </div>
          <hr className="my-4 border-navy-100" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <button disabled={submitting} className="btn-primary w-full mt-6">
            {submitting ? 'Placing order...' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-xl px-4 py-2.5 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none"
      />
    </label>
  )
}
