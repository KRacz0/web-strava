import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { useAuth } from '../contexts/AuthContext'

function AuthPage() {
  const { login, register, error, clearError } = useAuth()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleModeChange = (nextMode) => {
    setMode(nextMode)
    clearError()
  }

  const handleLogin = async (payload) => {
    setLoading(true)
    clearError()
    try {
      await login(payload)
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (payload) => {
    setLoading(true)
    clearError()
    try {
      await register(payload)
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page narrow">
      <div className="card auth-card">
        <div className="tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => handleModeChange('login')} type="button">
            Logowanie
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => handleModeChange('register')}
            type="button"
          >
            Rejestracja
          </button>
        </div>
        {error && <div className="alert">{error}</div>}
        {mode === 'login' ? (
          <LoginForm loading={loading} onSubmit={handleLogin} />
        ) : (
          <RegisterForm loading={loading} onSubmit={handleRegister} />
        )}
      </div>
    </div>
  )
}

export default AuthPage
