import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from '@/pages/LoginPage'
import { NeedHelpPage } from '@/pages/NeedHelpPage'
import { WelcomeDashboard } from '@/pages/WelcomeDashboard'
import { CategoryView } from '@/pages/CategoryView'
import { CustomersPage } from '@/pages/CustomersPage'
import { ForgotPassword } from '@/pages/ForgotPassword'

const App = () => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-muted">Loading Pinnacle…</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/help" element={<NeedHelpPage />} />
        <Route path="/dashboard" element={<WelcomeDashboard />} />
        <Route path="/category/:id" element={<CategoryView />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
