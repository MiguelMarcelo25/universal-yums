import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, supabaseEnabled } from '../lib/supabase'

type MockUser = { id: string; email: string; full_name?: string }

type AuthContextType = {
  user: MockUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LS_KEY = 'mock_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      if (supabaseEnabled && supabase) {
        const { data } = await supabase.auth.getSession()
        if (active && data.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email ?? '',
            full_name: data.session.user.user_metadata?.full_name,
          })
        }
        supabase.auth.onAuthStateChange((_evt, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email ?? '',
              full_name: session.user.user_metadata?.full_name,
            })
          } else {
            setUser(null)
          }
        })
      } else {
        const stored = localStorage.getItem(LS_KEY)
        if (stored) setUser(JSON.parse(stored))
      }
      if (active) setLoading(false)
    })()
    return () => {
      active = false
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (supabaseEnabled && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } else {
      const u: MockUser = { id: `mock_${email}`, email }
      localStorage.setItem(LS_KEY, JSON.stringify(u))
      setUser(u)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (supabaseEnabled && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) throw error
    } else {
      const u: MockUser = { id: `mock_${email}`, email, full_name: fullName }
      localStorage.setItem(LS_KEY, JSON.stringify(u))
      setUser(u)
    }
  }

  const signOut = async () => {
    if (supabaseEnabled && supabase) {
      await supabase.auth.signOut()
    } else {
      localStorage.removeItem(LS_KEY)
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
