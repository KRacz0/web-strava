import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAdminUserDetails, fetchAdminUsers } from '../../api/adminApi'
import AdminFilters from '../../components/admin/AdminFilters'
import AdminUsersTable from '../../components/admin/AdminUsersTable'
import AdminUserDetails from '../../components/admin/AdminUserDetails'
import { useAuth } from '../../contexts/AuthContext'

function AdminDashboard() {
  const { session } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ search: '', role: '', registered_from: '', registered_to: '' })
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedDetails, setSelectedDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const token = useMemo(
    () => session?.token || session?.access_token || session?.accessToken || session?.user?.token,
    [session],
  )

  const loadUsers = async (activeFilters = filters) => {
    if (!token) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetchAdminUsers(activeFilters, token)
      setUsers(response?.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadUserDetails = useCallback(
    async (userId) => {
      if (!token || !userId) return

      setDetailsLoading(true)
      setDetailsError(null)
      setIsDetailsOpen(true)
      try {
        const response = await fetchAdminUserDetails(userId, token)
        setSelectedDetails(response?.data || response)
      } catch (err) {
        setDetailsError(err.message)
      } finally {
        setDetailsLoading(false)
      }
    },
    [token],
  )

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    loadUsers(filters)
  }

  const handleUserSelect = useCallback(
    (user) => {
      setSelectedUserId(user.id)
      loadUserDetails(user.id)
    },
    [loadUserDetails],
  )

  useEffect(() => {
    if (!users.length || !token) {
      setSelectedDetails(null)
      setSelectedUserId(null)
      setIsDetailsOpen(false)
      return
    }

    if (!selectedUserId) return

    const stillSelected = users.find((user) => user.id === selectedUserId)
    if (!stillSelected) {
      setSelectedDetails(null)
      setSelectedUserId(null)
      setIsDetailsOpen(false)
    }
  }, [users, token, selectedUserId])

  const lastUpdatedLabel = useMemo(() => new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date()), [])

  return (
    <div className="page admin">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Panel administratora</p>
          <h1>Podgląd użytkowników</h1>
          <p className="muted">Zarządzaj społecznością, przeglądaj dane kont i monitoruj aktywność.</p>
        </div>
        <div className="admin-meta">
          <div className="meta-card">
            <p className="label">Ostatnia aktualizacja</p>
            <p className="value">{lastUpdatedLabel}</p>
          </div>
          <div className="meta-card highlighted">
            <p className="label">Łączna liczba</p>
            <p className="value large">{users.length}</p>
          </div>
        </div>
      </div>

      <div className="card admin-card">
        <AdminFilters filters={filters} loading={loading} onChange={handleFiltersChange} onSubmit={handleSearch} />

        {error && <div className="alert">{error}</div>}
      </div>

      <div className="admin-layout single-column">
        <div className="card admin-card">
          <AdminUsersTable
            loading={loading}
            users={users}
            onSelect={handleUserSelect}
            selectedUserId={selectedUserId}
          />
        </div>

        <AdminUserDetails
          key={selectedUserId || 'no-user'}
          details={selectedDetails}
          loading={detailsLoading}
          error={detailsError}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </div>
    </div>
  )
}

export default AdminDashboard
