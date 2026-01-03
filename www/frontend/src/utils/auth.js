export function isAdminSession(session) {
  if (!session) return false

  const role = session?.user?.role || session?.role
  if (typeof role === 'string' && role.trim().toLowerCase() === 'admin') {
    return true
  }

  const email = session?.user?.email || session?.email
  if (typeof email === 'string' && email.trim().toLowerCase() === 'admin@ministrava.dev') {
    return true
  }

  return [
    session?.user?.is_admin,
    session?.user?.isAdmin,
    session?.is_admin,
    session?.isAdmin,
  ].some(Boolean)
}
