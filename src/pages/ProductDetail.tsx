import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug, getProducts } from '../lib/api'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    if (!slug) return
    getProductBySlug(slug).then((p) => {
      setProduct(p)
      if (p?.country?.slug) {
        getProducts({ countrySlug: p.country.slug }).then((list) =>
          setRelated(list.filter((x) => x.id !== p.id).slice(0, 4)),
        )
      }
    })
  }, [slug])

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="container-page py-12">
      <Link to="/shop" className="text-sm text-gray-600 hover:text-ketchup-600">← Back to shop</Link>

      <div className="mt-6 grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-sunny-300 to-sunny-500 flag-bg grid place-items-center text-[12rem] shadow-pop">
          {product.country?.flag_emoji || '🍬'}
        </div>

        <div className="flex flex-col">
          {product.country && (
            <Link
              to={`/shop?country=${product.country.slug}`}
              className="text-sm font-semibold text-ketchup-600 hover:underline"
            >
              {product.country.flag_emoji} {product.country.name}
            </Link>
          )}
          <h1 className="mt-2 font-display font-black text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-gray-700 text-lg">{product.description}</p>

          <div className="mt-6 text-4xl font-black font-display text-ketchup-600">
            {formatPrice(product.price_cents)}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border-2 border-navy-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 grid place-items-center text-xl font-bold hover:text-ketchup-600"
              >
                −
              </button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 grid place-items-center text-xl font-bold hover:text-ketchup-600"
              >
                +
              </button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1 md:flex-none">
              {added ? '✓ Added to cart' : 'Add to cart'}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-2xl p-4 border border-navy-100">
              <div className="font-semibold">🌍 Imported</div>
              <div className="text-gray-600 text-xs mt-1">Straight from the source</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-navy-100">
              <div className="font-semibold">📅 Fresh</div>
              <div className="text-gray-600 text-xs mt-1">Hand-checked in-date</div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display font-black text-3xl mb-6">More from {product.country?.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
