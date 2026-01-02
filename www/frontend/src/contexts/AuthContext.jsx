import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../api/authApi'

const SESSION_KEY = 'strava-session'

const AuthContext = createContext()

function persistSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

function loadSession() {
  const saved = localStorage.getItem(SESSION_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved)
  } catch (error) {
    console.error('Nie można odczytać zapisanej sesji', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = loadSession()
    if (stored) {
      setSession(stored)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (session) {
      persistSession(session)
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [session])

  const authenticate = async (action) => {
    setError(null)
    try {
      const data = await action()
      setSession(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const login = (credentials) => authenticate(() => loginRequest(credentials))
  const register = (details) => authenticate(() => registerRequest(details))
  const logout = () => setSession(null)
  const clearError = () => setError(null)

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      register,
      logout,
      loading,
      error,
      clearError,
    }),
    [session, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth musi być użyte wewnątrz AuthProvider')
  }
  return ctx
}
