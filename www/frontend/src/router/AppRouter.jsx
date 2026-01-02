import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'

function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default AppRouter