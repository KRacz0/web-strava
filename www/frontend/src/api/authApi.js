import { post } from './client'

export function login(credentials) {
  return post('/api/auth/login', credentials)
}

export function register(payload) {
  return post('/api/auth/register', payload)
}
