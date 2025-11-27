import { ReactNode, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@components/common/Navbar'
import { Sidebar } from '@components/common/Sidebar'
import { BottomNav } from '@components/common/BottomNav'
import { useUIStore } from '@store/ui.store'

interface DashboardLayoutProps {
  children?: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { theme, setTheme } = useUIStore()

  useEffect(() => {
    // Apply theme on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || theme
    setTheme(initialTheme)
  }, [setTheme, theme])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="lg:pl-64 pt-16 pb-20 lg:pb-0">
        <div className="p-4 sm:p-6 lg:p-8">{children || <Outlet />}</div>
      </main>
      <BottomNav />
    </div>
  )
}

