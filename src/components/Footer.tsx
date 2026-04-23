import { Link } from 'react-router-dom'

function GlobeLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#fff" />
      <ellipse cx="32" cy="32" rx="20" ry="20" fill="none" stroke="#1f3a9e" strokeWidth="3" />
      <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#1f3a9e" strokeWidth="3" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="#1f3a9e" strokeWidth="3" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-100 mt-0">
      <div className="container-page py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 text-white mb-3">
            <GlobeLogo />
            <div className="font-display leading-none">
              <div className="text-lg -mb-0.5">universal</div>
              <div className="text-xl">yums</div>
            </div>
          </Link>
          <p className="text-sm text-navy-200 font-semibold">
            Take your tastebuds on a global journey.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-3">Shop</h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li><Link to="/subscribe" className="hover:text-white">Country Boxes</Link></li>
            <li><Link to="/shop" className="hover:text-white">The Shop</Link></li>
            <li><Link to="/gift" className="hover:text-white">Give a Gift</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-3">Account</h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li><Link to="/signin" className="hover:text-white">Sign in</Link></li>
            <li><Link to="/signup" className="hover:text-white">Create account</Link></li>
            <li><Link to="/orders" className="hover:text-white">Order history</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-3">Stay in touch</h4>
          <p className="text-sm text-navy-200 mb-3 font-semibold">Get snack news & box previews.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-full px-4 py-2 text-sm bg-navy-700 border border-navy-600 text-white placeholder:text-navy-300 focus:outline-none focus:border-sunny-300"
            />
            <button className="btn-primary !py-2 !px-4 text-sm">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-navy-700">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy-300 font-semibold">
          <p>© {new Date().getFullYear()} Universal Yums clone · React + Supabase demo</p>
          <p>For educational purposes only.</p>
        </div>
      </div>
    </footer>
  )
}
