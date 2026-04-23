import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBoxBySlug, getProducts } from '../lib/api'
import type { Box, Product } from '../types'
import { formatPrice } from '../lib/format'
import ProductCard from '../components/ProductCard'

export default function BoxDetail() {
  const { slug } = useParams()
  const [box, setBox] = useState<Box | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!slug) return
    getBoxBySlug(slug).then((b) => {
      setBox(b)
      if (b?.country?.slug) {
        getProducts({ countrySlug: b.country.slug }).then(setProducts)
      }
    })
  }, [slug])

  if (!box) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <section className="relative bg-navy-600 text-white overflow-hidden">
        <div className="absolute top-0 right-0 text-[18rem] opacity-10 leading-none translate-x-10">
          {box.country?.flag_emoji}
        </div>
        <div className="container-page py-16 md:py-24 relative">
          <Link to="/" className="text-sm text-white/80 hover:text-white">← All boxes</Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="chip !bg-white/20 !text-white">{box.month} {box.year}</span>
            <span className="chip !bg-white/20 !text-white">{box.country?.flag_emoji} {box.country?.name}</span>
          </div>
          <h1 className="mt-4 font-display font-black text-5xl md:text-7xl">{box.name}</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">{box.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-4xl font-black font-display">{formatPrice(box.price_cents)}</span>
            <Link to="/subscribe" className="btn bg-white text-navy-700 hover:bg-navy-50">
              Subscribe to get this →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display font-black text-3xl">What's inside</h2>
        <p className="text-gray-600 mt-2">A peek at snacks from {box.country?.name}.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
