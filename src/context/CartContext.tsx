import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import type { CartItem, Product } from '../types'

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  subtotalCents: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const LS_KEY = 'cart_v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price_cents: product.price_cents,
          image_url: product.image_url,
          quantity,
        },
      ]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId)
    setItems((prev) => prev.map((i) => (i.product_id === productId ? { ...i, quantity } : i)))
  }

  const clear = () => setItems([])

  const subtotalCents = useMemo(() => items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, subtotalCents, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
