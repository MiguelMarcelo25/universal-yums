import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../lib/api'
import type { Product } from '../../types'
import { formatPrice } from '../../lib/format'
import { supabaseEnabled } from '../../lib/supabase'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl">Admin — Products</h1>
          <p className="text-sm text-gray-600 mt-1">
            {supabaseEnabled
              ? 'Connected to Supabase. Only admin users can write.'
              : 'Demo mode — writes are disabled. Use the seed SQL once connected.'}
          </p>
        </div>
        <Link to="/admin/orders" className="btn-outline-navy">View orders →</Link>
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-navy-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Country</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-navy-100 hover:bg-navy-50/30">
                <td className="px-4 py-3 font-semibold">{p.name}</td>
                <td className="px-4 py-3">
                  {p.country?.flag_emoji} {p.country?.name}
                </td>
                <td className="px-4 py-3">{formatPrice(p.price_cents)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.featured ? '⭐' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
