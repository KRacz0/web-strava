import { useState } from 'react'

function LoginForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        E-mail
        <input
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          placeholder="user@example.com"
        />
      </label>
      <label>
        Hasło
        <input
          type="password"
          required
          value={form.password}
          onChange={handleChange('password')}
          placeholder="********"
        />
      </label>
      <button className="primary" type="submit" disabled={loading}>
        {loading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
    </form>
  )
}

export default LoginForm
