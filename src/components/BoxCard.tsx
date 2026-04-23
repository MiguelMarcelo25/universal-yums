import { Link } from 'react-router-dom'
import type { Box } from '../types'
import { formatPrice } from '../lib/format'

export default function BoxCard({ box }: { box: Box }) {
  return (
    <Link to={`/boxes/${box.slug}`} className="card group">
      <div className="aspect-[4/3] bg-gradient-to-br from-sunny-300 to-sunny-500 flag-bg grid place-items-center relative overflow-hidden">
        <div className="text-8xl drop-shadow-lg transform transition-transform group-hover:scale-110">
          {box.country?.flag_emoji || '📦'}
        </div>
        <span className="absolute top-4 left-4 chip !bg-navy-600 !text-white">
          {box.month} {box.year}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-2xl leading-tight text-navy-800">{box.name}</h3>
        <p className="text-sm text-navy-700 mt-2 line-clamp-2 font-semibold">{box.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-navy-700 text-lg">{formatPrice(box.price_cents)}</span>
          <span className="text-sm font-bold text-ketchup-500 group-hover:text-ketchup-600">
            View box →
          </span>
        </div>
      </div>
    </Link>
  )
}
