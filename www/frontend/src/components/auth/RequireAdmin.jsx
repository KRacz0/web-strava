import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { isAdminSession } from '../../utils/auth'

function RequireAdmin({ children }) {
  const { isAuthenticated, loading, session } = useAuth()
  const isAdmin = isAdminSession(session)

  if (loading) {
    return (
      <div className="page">
        <div className="card padded">
          <p>Ładowanie sesji...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default RequireAdmin
