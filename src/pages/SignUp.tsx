import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabaseEnabled } from '../lib/supabase'

export default function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signUp(email, password, fullName)
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-20">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-navy-100">
        <h1 className="font-display font-black text-3xl text-center">Create your account</h1>
        <p className="text-gray-600 text-sm text-center mt-2">Join the world of snacks.</p>

        {!supabaseEnabled && (
          <div className="mt-4 p-3 rounded-xl bg-navy-50 text-xs text-navy-700 border border-navy-200">
            Demo mode: accounts are stored locally in your browser.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-gray-600 uppercase">Full name</span>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-xl px-4 py-2.5 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none"
            />
          </label>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl px-4 py-2.5 border-2 border-navy-100 focus:border-ketchup-400 focus:outline-none"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-ketchup-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
