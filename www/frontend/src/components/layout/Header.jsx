import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Header() {
  const { isAuthenticated, logout, session } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="topbar">
      <Link className="logo" to="/">
        <span className="logo-mark">S</span>
        <span className="logo-text">StravaWitelon</span>
      </Link>
      <nav className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="welcome">Witaj, {session?.user?.first_name || 'sportowcu'}!</span>
            <button className="ghost" onClick={handleLogout}>
              Wyloguj
            </button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/auth')}>
            Zaloguj się
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
