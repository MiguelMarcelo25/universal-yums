import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCountries, getProducts } from '../lib/api'
import type { Country, Product } from '../types'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [search, setSearch] = useState('')

  const countrySlug = params.get('country') || ''

  useEffect(() => {
    getCountries().then(setCountries)
  }, [])

  useEffect(() => {
    getProducts({ countrySlug: countrySlug || undefined, search: search || undefined }).then(setProducts)
  }, [countrySlug, search])

  const activeCountryName = useMemo(
    () => countries.find((c) => c.slug === countrySlug)?.name,
    [countries, countrySlug],
  )

  return (
    <div className="container-page py-12">
      <div className="text-center">
        <span className="chip">The Shop</span>
        <h1 className="mt-3 font-display font-black text-5xl">
          {activeCountryName ? `Snacks from ${activeCountryName}` : 'Shop all snacks'}
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Grab individual favorites from around the world. No subscription required.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <input
          type="search"
          placeholder="Search snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-full px-5 py-3 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none bg-white"
        />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setParams({})}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              !countrySlug ? 'bg-ketchup-500 text-white' : 'bg-white border border-navy-100 text-gray-700'
            }`}
          >
            🌍 All
          </button>
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setParams({ country: c.slug })}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                countrySlug === c.slug ? 'bg-ketchup-500 text-white' : 'bg-white border border-navy-100 text-gray-700 hover:border-navy-300'
              }`}
            >
              {c.flag_emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-semibold text-lg">No snacks found</p>
            <p className="text-gray-600 text-sm mt-1">Try a different country or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
