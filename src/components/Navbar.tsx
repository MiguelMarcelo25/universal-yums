import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabaseEnabled } from '../lib/supabase'

function GlobeLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#1f3a9e" />
      <ellipse cx="32" cy="32" rx="20" ry="20" fill="none" stroke="#fff" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#fff" strokeWidth="2.5" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="#fff" strokeWidth="2.5" />
    </svg>
  )
}

export default function Navbar() {
  const { itemCount } = useCart()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-navy-100">
      <div className="bg-navy-600 text-white text-center py-2 text-sm font-bold">
        Free Mystery Gift + Free Shipping in Continental US
      </div>
      {!supabaseEnabled && (
        <div className="bg-sunny-300 text-navy-900 text-xs text-center py-1.5 font-bold">
          🧪 Demo mode — set VITE_SUPABASE_URL in .env to connect Supabase.
        </div>
      )}

      <div className="container-page grid grid-cols-3 items-center h-20">
        {/* Left: hamburger + Country Boxes */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-navy-50 text-navy-700"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <NavLink to="/shop" className="hidden md:inline text-navy-800 font-bold hover:text-navy-600">
            Country Boxes
          </NavLink>
        </div>

        {/* Center: logo */}
        <Link to="/" className="justify-self-center flex items-center gap-2 font-display font-bold">
          <GlobeLogo />
          <div className="leading-none">
            <div className="text-xl text-navy-700 -mb-0.5">universal</div>
            <div className="text-2xl text-navy-700">yums</div>
          </div>
        </Link>

        {/* Right: CTAs + profile */}
        <div className="justify-self-end flex items-center gap-2">
          <Link to="/join" className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            Get Started
          </Link>
          <Link to="/subscribe" className="hidden md:inline-flex btn-navy !py-2.5 !px-5 text-sm">
            Give A Gift
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-navy-50 text-navy-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-ketchup-500 text-white text-[10px] font-bold w-5 h-5 rounded-full grid place-items-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => (user ? navigate('/account') : navigate('/signin'))}
            className="p-2 rounded-full hover:bg-navy-50 text-navy-700"
            aria-label="Account"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white">
          <div className="container-page py-4 flex flex-col gap-1 text-navy-800 font-bold">
            <NavLink to="/subscribe" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Subscribe</NavLink>
            <NavLink to="/shop" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Country Boxes / Shop</NavLink>
            {user ? (
              <>
                <NavLink to="/orders" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Orders</NavLink>
                <NavLink to="/account" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Account</NavLink>
                <button onClick={() => { signOut(); setMobileOpen(false) }} className="text-left px-3 py-2 text-gray-600">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Sign in</NavLink>
                <NavLink to="/signup" className="px-3 py-2 rounded-lg hover:bg-navy-50" onClick={() => setMobileOpen(false)}>Sign up</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
