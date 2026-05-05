import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useCart } from '../context/CartContext'

const gradients = [
  'from-sunny-300 to-sunny-500',
  'from-navy-400 to-navy-600',
  'from-ketchup-400 to-ketchup-500',
  'from-sunny-400 to-ketchup-400',
  'from-navy-500 to-ketchup-500',
]

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const gradient = gradients[hash(product.id) % gradients.length]

  return (
    <motion.div
      className="card group"
      whileHover={{ y: -6, rotate: -0.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <Link to={`/shop/${product.slug}`} className="block">
        <div className={`aspect-square bg-gradient-to-br ${gradient} flag-bg grid place-items-center relative overflow-hidden`}>
          <motion.div
            className="text-7xl drop-shadow-lg"
            whileHover={{ scale: 1.18, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          >
            {product.country?.flag_emoji || '🍬'}
          </motion.div>
          {product.featured && (
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-navy-700 text-xs font-bold px-2.5 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-navy-500 font-bold uppercase tracking-wide">
          {product.country?.name || 'International'}
        </p>
        <Link
          to={`/shop/${product.slug}`}
          className="block mt-1 font-display font-bold text-lg leading-tight text-navy-800 hover:text-navy-600"
        >
          {product.name}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-navy-800">{formatPrice(product.price_cents)}</span>
          <motion.button
            onClick={() => addItem(product)}
            className="btn-primary !py-1.5 !px-4 text-sm"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
