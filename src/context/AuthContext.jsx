import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (authUser) => {
    if (!authUser) {
      setUser(null)
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle()

    setUser({
      id: authUser.id,
      email: authUser.email,
      name: data?.name || authUser.email?.split('@')[0] || 'Cliente',
      phone: data?.phone || '',
      address: data?.address || '',
    })
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadProfile(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadProfile(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signup = async ({ name, email, phone, address, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { ok: false, error: error.message }

    if (data.user) {
      const { error: perr } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, name, phone, address })
      if (perr) return { ok: false, error: perr.message }
    }
    return { ok: true }
  }

  const login = async ({ identifier, password }) => {
    if (!identifier.includes('@')) {
      return { ok: false, error: 'Por favor usa o teu email para entrar.' }
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)