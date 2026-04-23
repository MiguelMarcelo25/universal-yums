import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrdersForUser } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import type { Order } from '../../types'
import { formatPrice } from '../../lib/format'

export default function AdminOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getOrdersForUser(user?.id ?? null).then(setOrders)
  }, [user])

  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl">Admin — Orders</h1>
          <p className="text-sm text-gray-600 mt-1">
            Showing orders. In demo mode, this reads local orders you placed in this browser.
          </p>
        </div>
        <Link to="/admin/products" className="btn-outline-navy">Products →</Link>
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-navy-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No orders yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-navy-100 hover:bg-navy-50/30">
                  <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 12)}…</td>
                  <td className="px-4 py-3">{new Date(o.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{o.shipping_name || '—'}</td>
                  <td className="px-4 py-3"><span className="chip">{o.status}</span></td>
                  <td className="px-4 py-3 text-right font-bold">{formatPrice(o.total_cents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
