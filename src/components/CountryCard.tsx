import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Country } from '../types'

export default function CountryCard({ country }: { country: Country }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      <Link
        to={`/shop?country=${country.slug}`}
        className="group relative overflow-hidden rounded-3xl p-6 bg-white border-2 border-navy-100 hover:border-navy-400 transition-all hover:shadow-pop block"
      >
        <motion.div
          className="text-5xl mb-3"
          whileHover={{ scale: 1.2, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 240, damping: 12 }}
        >
          {country.flag_emoji}
        </motion.div>
        <h4 className="font-display font-bold text-xl text-navy-800">{country.name}</h4>
        <p className="text-xs text-navy-600 line-clamp-2 mt-1 font-semibold">{country.description}</p>
        <span className="absolute top-4 right-4 text-ketchup-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 font-bold">
          →
        </span>
      </Link>
    </motion.div>
  )
}
