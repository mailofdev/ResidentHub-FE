import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/auth.store'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Loader } from '@components/common'
import { PrivateRoute } from './PrivateRoute'
import { RoleRoute } from './RoleRoute'
import { DashboardLayout } from '@layouts/DashboardLayout'
import { UserRole } from '@types'
import { LoginPage } from '@pages/auth/LoginPage'
import { SignupPage } from '@pages/auth/SignupPage'
import { DashboardPage } from '@pages/dashboard/DashboardPage'
import { SocietyPage } from '@pages/society/SocietyPage'
import { ResidentsPage } from '@pages/residents/ResidentsPage'
import { MaintenancePage } from '@pages/maintenance/MaintenancePage'
import { ComplaintsPage } from '@pages/complaints/ComplaintsPage'
import { NoticesPage } from '@pages/notices/NoticesPage'
import { ProfilePage } from '@pages/profile/ProfilePage'
import { AuditLogPage } from '@pages/audit/AuditLogPage'

const ProtectedLayout = () => (
  <PrivateRoute>
    <DashboardLayout />
  </PrivateRoute>
)

export const AppRouter = () => {
  const { checkAuth, isLoading, user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <Loader fullScreen />
  }

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login'
    return '/dashboard'
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin Only Routes */}
            <Route
              path="/society"
              element={
                <RoleRoute allowedRoles={[UserRole.ADMIN]}>
                  <SocietyPage />
                </RoleRoute>
              }
            />
            <Route
              path="/residents"
              element={
                <RoleRoute allowedRoles={[UserRole.ADMIN]}>
                  <ResidentsPage />
                </RoleRoute>
              }
            />
            <Route
              path="/audit"
              element={
                <RoleRoute allowedRoles={[UserRole.ADMIN]}>
                  <AuditLogPage />
                </RoleRoute>
              }
            />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
          <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

