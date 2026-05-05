import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getOrdersForUser } from '../lib/api'
import type { Order } from '../types'
import { formatPrice } from '../lib/format'
import Confetti from '../components/motion/Confetti'

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams()
  const welcome = params.get('welcome') === '1'

  useEffect(() => {
    getOrdersForUser(user?.id ?? null)
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className="container-page py-12">
      {welcome && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="relative overflow-hidden mb-6 rounded-3xl p-6 bg-gradient-to-r from-navy-600 to-ketchup-500 text-white flex items-center gap-4"
        >
          <Confetti count={50} />
          <motion.div
            className="text-4xl relative"
            animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            🎉
          </motion.div>
          <div className="relative">
            <p className="font-display font-bold text-lg">Order placed!</p>
            <p className="text-white/90 text-sm">Thanks for your order — your box is on the way.</p>
          </div>
        </motion.div>
      )}
      <h1 className="font-display font-black text-4xl">Your orders</h1>

      {loading ? (
        <p className="text-gray-500 mt-8">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="mt-8 text-center bg-white rounded-3xl p-12 border border-navy-100">
          <div className="text-6xl mb-4">📭</div>
          <p className="font-semibold text-lg">No orders yet</p>
          <p className="text-gray-600 text-sm mt-1">Once you place an order it'll show up here.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">Browse snacks</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-navy-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Order</p>
                  <p className="font-mono text-sm">{order.id.slice(0, 12)}…</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Date</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Status</p>
                  <span className="chip">{order.status}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total</p>
                  <p className="font-bold">{formatPrice(order.total_cents)}</p>
                </div>
              </div>
              {order.items && order.items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-navy-100 text-sm text-gray-600">
                  {order.items.map((i) => (
                    <div key={i.id} className="flex justify-between py-1">
                      <span>{i.product_name} × {i.quantity}</span>
                      <span>{formatPrice(i.price_cents * i.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
