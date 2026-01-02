const API_HOST = import.meta.env.VITE_API_HOST || ''

async function request(path, options = {}) {
  const url = API_HOST ? `${API_HOST}${path}` : path

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || 'Wystąpił błąd podczas komunikacji z API'
    throw new Error(message)
  }

  return data
}

export function post(path, payload) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export { API_HOST }