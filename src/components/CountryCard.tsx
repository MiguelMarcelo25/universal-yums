import { Link } from 'react-router-dom'
import type { Country } from '../types'

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to={`/shop?country=${country.slug}`}
      className="group relative overflow-hidden rounded-3xl p-6 bg-white border-2 border-navy-100 hover:border-navy-400 transition-all hover:shadow-pop"
    >
      <div className="text-5xl mb-3 transform transition-transform group-hover:scale-110 group-hover:-rotate-6">
        {country.flag_emoji}
      </div>
      <h4 className="font-display font-bold text-xl text-navy-800">{country.name}</h4>
      <p className="text-xs text-navy-600 line-clamp-2 mt-1 font-semibold">{country.description}</p>
      <span className="absolute top-4 right-4 text-ketchup-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
        →
      </span>
    </Link>
  )
}
