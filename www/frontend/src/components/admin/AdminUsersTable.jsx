function formatInitials(user) {
  const name = user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
  if (!name) return ''

  const [first, second] = name.split(' ')
  return `${first?.[0] || ''}${second?.[0] || ''}`.toUpperCase()
}

function AdminUsersTable({ loading, users, onSelect, selectedUserId }) {
  if (loading) {
    return <p className="muted">Ładujemy użytkowników...</p>
  }

  if (!users?.length) {
    return <p className="muted">Brak wyników dla wybranych filtrów.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię i nazwisko</th>
            <th>Email</th>
            <th>Rola</th>
            <th>Data rejestracji</th>
            <th>Zweryfikowano</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`clickable-row ${selectedUserId === user.id ? 'active' : ''}`}
              onClick={() => onSelect?.(user)}
            >
              <td>{user.id}</td>
              <td>
                <div className="user-cell">
                  {user.avatar_url ? (
                    <img alt={user.name} className="avatar" src={user.avatar_url} />
                  ) : (
                    <div className="avatar placeholder">{formatInitials(user)}</div>
                  )}
                  <div>
                    <div className="strong">{user.name || `${user.first_name} ${user.last_name}`}</div>
                    <div className="muted small">{user.birth_date}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`pill ${user.role || 'user'}`}>{user.role || 'user'}</span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString('pl-PL')}</td>
              <td>{user.email_verified_at ? 'Tak' : 'Nie'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsersTable
