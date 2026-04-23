import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, signOut, loading } = useAuth()

  if (loading) return <div className="container-page py-20 text-center text-gray-500">Loading…</div>
  if (!user) return <Navigate to="/signin" replace />

  return (
    <div className="container-page py-12">
      <h1 className="font-display font-black text-4xl">My account</h1>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-navy-100">
          <h2 className="font-display font-bold text-xl">Profile</h2>
          <dl className="mt-4 divide-y divide-navy-100">
            <div className="py-3 flex justify-between">
              <dt className="text-gray-600">Name</dt>
              <dd className="font-semibold">{user.full_name || '—'}</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-gray-600">Email</dt>
              <dd className="font-semibold">{user.email}</dd>
            </div>
          </dl>
          <button onClick={signOut} className="btn-dark mt-4">Sign out</button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-navy-100">
          <h2 className="font-display font-bold text-xl">Quick links</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Link to="/orders" className="block p-3 rounded-xl hover:bg-navy-50 border border-navy-100">
              📦 My orders
            </Link>
            <Link to="/subscribe" className="block p-3 rounded-xl hover:bg-navy-50 border border-navy-100">
              🎁 Change my plan
            </Link>
            <Link to="/shop" className="block p-3 rounded-xl hover:bg-navy-50 border border-navy-100">
              🛍️ Keep shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
