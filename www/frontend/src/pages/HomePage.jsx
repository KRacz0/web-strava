import { Link } from 'react-router-dom'
import FeatureCard from '../components/common/FeatureCard'
import { useAuth } from '../contexts/AuthContext'

function HomePage() {
  const { isAuthenticated, session } = useAuth()

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Motywacja płynąca ze społeczności</p>
          <h1>
            Biegaj, jeździj, <span className="highlight">rywalizuj</span> i dziel się swoimi trasami
          </h1>
          <p className="lead">
            Śledź swoje postępy i dopinguj innych. Dołącz do ponad 100 milionów aktywnych użytkowników serwisu StravaWitelon za darmo.
          </p>
          <div className="cta-row">
            <Link className="primary" to={isAuthenticated ? '/' : '/auth'}>
              {isAuthenticated ? 'Przejdź do panelu' : 'Załóż konto'}
            </Link>
            <Link className="ghost" to="#features">
              Dowiedz się więcej
            </Link>
          </div>
          {isAuthenticated && (
            <p className="session-pill">Zalogowany jako {session?.user?.email || 'użytkownik'}</p>
          )}
        </div>
        <div className="hero-card">
          <div className="stats">
            <div>
              <p className="label">Aktywności</p>
              <p className="value">1 248</p>
            </div>
            <div>
              <p className="label">Przebyty dystans</p>
              <p className="value">18 430 km</p>
            </div>
            <div>
              <p className="label">Czas na rowerze</p>
              <p className="value">932 h</p>
            </div>
          </div>
          <div className="map-preview">Mapa tras społeczności</div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="section-header">
          <p className="eyebrow">Dlaczego StravaWitelon ?</p>
          <h2>Najważniejsze funkcje</h2>
        </div>
        <div className="feature-grid">
          <FeatureCard
            title="Rejestracja tras"
            description="Zapisuj swoje aktywności biegowe, kolarskie i outdoorowe z bogatymi statystykami."
          />
          <FeatureCard
            title="Wyzwania"
            description="Dołączaj do wyzwań społeczności i sprawdzaj swoje miejsce w rankingach."
          />
          <FeatureCard
            title="Społeczność"
            description="Śledź znajomych, komentuj ich treningi i motywuj się nawzajem."
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
