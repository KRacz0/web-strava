import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import RequireAdmin from '../components/auth/RequireAdmin'
import AdminDashboard from '../pages/admin/AdminDashboard'

function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/admin"
          element={(
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default AppRouter
