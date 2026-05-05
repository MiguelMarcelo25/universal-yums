import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Box } from '../types'
import { formatPrice } from '../lib/format'

export default function BoxCard({ box }: { box: Box }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
    >
      <Link to={`/boxes/${box.slug}`} className="card group block">
        <div className="aspect-[4/3] bg-gradient-to-br from-sunny-300 to-sunny-500 flag-bg grid place-items-center relative overflow-hidden">
          <motion.div
            className="text-8xl drop-shadow-lg"
            whileHover={{ scale: 1.15, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          >
            {box.country?.flag_emoji || '📦'}
          </motion.div>
          <span className="absolute top-4 left-4 chip !bg-navy-600 !text-white">
            {box.month} {box.year}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-2xl leading-tight text-navy-800">{box.name}</h3>
          <p className="text-sm text-navy-700 mt-2 line-clamp-2 font-semibold">{box.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-bold text-navy-700 text-lg">{formatPrice(box.price_cents)}</span>
            <span className="text-sm font-bold text-ketchup-500 group-hover:text-ketchup-600 transition-transform group-hover:translate-x-1">
              View box →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
