import { useState } from 'react'

const INITIAL_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  locale: 'pl',
  timezone: 'Europe/Warsaw',
}

function RegisterForm({ onSubmit, loading }) {
  const [form, setForm] = useState(INITIAL_FORM)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="grid">
        <label>
          Imię
          <input
            type="text"
            required
            value={form.first_name}
            onChange={handleChange('first_name')}
            placeholder="Jan"
          />
        </label>
        <label>
          Nazwisko
          <input
            type="text"
            required
            value={form.last_name}
            onChange={handleChange('last_name')}
            placeholder="Kowalski"
          />
        </label>
      </div>
      <label>
        E-mail
        <input
          type="email"
          required
          value={form.email}
          onChange={handleChange('email')}
          placeholder="jan@example.com"
        />
      </label>
      <div className="grid">
        <label>
          Hasło
          <input
            type="password"
            required
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Pass123!"
          />
        </label>
        <label>
          Powtórz hasło
          <input
            type="password"
            required
            value={form.password_confirmation}
            onChange={handleChange('password_confirmation')}
            placeholder="Pass123!"
          />
        </label>
      </div>
      <div className="grid">
        <label>
          Język
          <input
            type="text"
            value={form.locale}
            onChange={handleChange('locale')}
          />
        </label>
        <label>
          Strefa czasowa
          <input
            type="text"
            value={form.timezone}
            onChange={handleChange('timezone')}
          />
        </label>
      </div>
      <button className="primary" type="submit" disabled={loading}>
        {loading ? 'Zakładanie konta...' : 'Stwórz konto'}
      </button>
    </form>
  )
}

export default RegisterForm
