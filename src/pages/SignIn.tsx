import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabaseEnabled } from '../lib/supabase'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-20">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-navy-100">
        <h1 className="font-display font-black text-3xl text-center">Welcome back</h1>
        <p className="text-gray-600 text-sm text-center mt-2">Sign in to track orders and manage your box.</p>

        {!supabaseEnabled && (
          <div className="mt-4 p-3 rounded-xl bg-navy-50 text-xs text-navy-700 border border-navy-200">
            Demo mode: any email + password works. Your session is stored locally.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-gray-600 uppercase">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl px-4 py-2.5 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-600 uppercase">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl px-4 py-2.5 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-ketchup-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
