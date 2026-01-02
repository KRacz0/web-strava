import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'

import { AuthProvider, useAuth } from './authContext'

const originalFetch = global.fetch

const createFetchResponse = (ok, data) =>
  Promise.resolve({
    ok,
    json: vi.fn().mockResolvedValue(data),
  })

describe('AuthContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    global.fetch = vi.fn()
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    global.fetch = originalFetch
  })

  it('loguje użytkownika i zapisuje dane sesji', async () => {
    const credentials = { email: 'ala@ministrava.dev', password: 'Sample123!' }
    const sessionData = { token: 'abc123' }

    global.fetch.mockImplementation(() => createFetchResponse(true, sessionData))

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    await act(async () => {
      await result.current.login(credentials)
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    expect(result.current.session).toEqual(sessionData)
    expect(localStorage.getItem('strava-session')).toEqual(JSON.stringify(sessionData))
    expect(result.current.error).toBeNull()
  })

  it('ustawia błąd, gdy rejestracja zakończy sie errorem', async () => {
    const details = { email: 'bartek@ministrava.dev', password: 'Sample123!', name: 'Bartek' }
    const apiError = { message: 'Email zajęty' }
    global.fetch.mockImplementation(() => createFetchResponse(false, apiError))

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    let caughtError
    await act(async () => {
      try {
        await result.current.register(details)
      } catch (error) {
        caughtError = error
      }
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    })
    expect(caughtError).toBeInstanceOf(Error)
    expect(caughtError.message).toBe('Email zajęty')
    expect(result.current.session).toBeNull()
    expect(result.current.error).toBe('Email zajęty')
  })
})