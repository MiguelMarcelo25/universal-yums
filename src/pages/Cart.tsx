import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotalCents } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="font-display font-black text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-gray-600">Time to find some snacks from around the world.</p>
        <Link to="/shop" className="btn-primary mt-8 inline-flex">Start shopping →</Link>
      </div>
    )
  }

  const shipping = subtotalCents >= 2500 ? 0 : 499
  const total = subtotalCents + shipping

  return (
    <div className="container-page py-12">
      <h1 className="font-display font-black text-5xl">Your cart</h1>

      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.product_id} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-navy-100">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-300 to-ketchup-400 flag-bg grid place-items-center text-3xl flex-shrink-0">
                🍬
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-sm text-gray-500">{formatPrice(item.price_cents)} each</p>
              </div>
              <div className="flex items-center rounded-full border border-navy-100">
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  className="w-8 h-8 grid place-items-center hover:text-ketchup-600"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  className="w-8 h-8 grid place-items-center hover:text-ketchup-600"
                >
                  +
                </button>
              </div>
              <div className="w-20 text-right font-bold">{formatPrice(item.price_cents * item.quantity)}</div>
              <button
                onClick={() => removeItem(item.product_id)}
                className="text-gray-400 hover:text-ketchup-600"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 border border-navy-100 h-fit sticky top-24">
          <h2 className="font-display font-bold text-xl">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500">Spend {formatPrice(2500 - subtotalCents)} more for free shipping.</p>
            )}
          </div>
          <hr className="my-4 border-navy-100" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-6">
            Checkout →
          </Link>
          <Link to="/shop" className="block text-center text-sm text-gray-600 hover:text-ketchup-600 mt-3">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
