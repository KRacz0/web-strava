import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { API_HOST } from './api/client'
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

  const authenticate = async (endpoint, payload) => {
    setError(null)
    const response = await fetch(`${API_HOST}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const message = data?.message || 'Wystąpił błąd podczas uwierzytelniania'
      setError(message)
      throw new Error(message)
    }

    setSession(data)
    return data
  }

  const login = (credentials) => authenticate('/api/auth/login', credentials)
  const register = (details) => authenticate('/api/auth/register', details)
  const logout = () => setSession(null)

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      register,
      logout,
      loading,
      error,
      clearError: () => setError(null),
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
